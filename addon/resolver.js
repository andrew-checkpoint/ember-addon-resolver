import Resolver from 'ember-resolver/resolver';
import { computed } from '@ember/object';

function trimChar(str, ch, replace, flag) {
    if (ch === undefined) {
        ch = "\\s";
    }
    if (replace === undefined) {
        replace = "";
    }
    if (ch === "/") {
        ch = "\\/";
    }
    var flags = ["^" + ch, ch + "$"].slice(flag).slice(0, flag === undefined ? 2 : 1);
    var regex = "(" + flags.join("|") + "){1,}";
    return str.replace(new RegExp(regex, "g"), replace);
}

function insertAt(arr, value, pos) {
    arr.splice( pos, 0, value);
}

export default Resolver.extend({

    modelPodRoot: 'models', 
    additionalPaths: null,
    moduleMap: null,
    init: function(){
        if(this.additionalPaths === null) {
            this.additionalPaths = [];
        }
        if (this.moduleMap === null) {
            this.moduleMap = {};
        } else {
            this.validateModuleMap();
        }
        return this._super(...arguments);
    },

    validateModuleMap() {
        let moduleKeys = Object.keys(this.moduleMap);
        for (var i = 0; i < moduleKeys.length; i++) {
            let alias = this.moduleMap[moduleKeys[i]];
            if(alias.split(':').length === 2) {
                throw new Error('moduleMap fullName alias not yet supported, ');
            }
        }
        
    },
    registerLookupFolder: function registerLookupFolder(type, path) {
        this.additionalPaths.push({ type: type, path: path });
    },
    moduleNameLookupPatterns: computed(function () {
        let _this = this;

        let defaults = this._super.apply(this, arguments);
        let registeredFolders = this.get('additionalPaths');
        registeredFolders.forEach(function (folder) {
            defaults.push(_this.registerFolder(folder.path, folder.type, folder));
        });
        /* Ignore pods and replace for common repo components */
        defaults.push(_this.registerFolder('pods', 'component', { pod: true, moduleReplace: (mName) => mName.replace('/pods', '/components') }));
        if(this.modelPodRoot) {
            insertAt(defaults, this.podModelModuleName, 1);
        }
        insertAt(defaults, this.podDasherisedErrorModuleName, 1);
        insertAt(defaults, this.aliasModuleName, 1);
        return defaults;
    }),

    /*  Allow for "pod" style files for models
     *  app/models/users/model.js
     *  app/models/users/adapter.js
     *  app/models/users/serializer.js
     */
    podModelModuleName: function podModelModuleName(parsedName) {
        var fullNameWithoutType = parsedName.fullNameWithoutType;
                     
        fullNameWithoutType = fullNameWithoutType.replace(/\./g, '/');
        if ( !['model', 'adapter', 'serializer'].includes(parsedName.type) ) {
            return;
        }
        /* Needs testing that dummy will not overwrite */
        let namespace = this.namespace.name ? this.namespace.name : 'dummy';
        let path = `${namespace}/models/${fullNameWithoutType}/${parsedName.type}`;

        return path;
    },


    podDasherisedErrorLookupWithPrefix: function podDasherisedErrorLookupWithPrefix(podPrefix, parsedName) {
        var fullNameWithoutType = parsedName.fullNameWithoutType;

        if (fullNameWithoutType.slice(-5) !== "error") {
            return;
        }
        fullNameWithoutType = fullNameWithoutType.replace(/-/g, '/');
        if (parsedName.type === 'template') {
            fullNameWithoutType = fullNameWithoutType.replace(/^components\//, '');
        }

        return podPrefix + '/' + fullNameWithoutType + '/' + parsedName.type;
    },
    
    /* Allows alias deep paths into a root */
    registerFolder: function registerFolder(path, type, options) {
        path = trimChar(path, '/');
        return function (parsedName) {
            var modulePrefix = options.module || parsedName.prefix;
            if (parsedName.type === type) {
                var _name = parsedName.fullNameWithoutType;
                if (options.nameReplace) {
                    _name = _name.replace(options.nameReplace, "");
                }
                let moduleName = null;
                if (options.pod) {
                    var ext = type === "template" ? ".hbs" : ".js";
                    ext = "";
                    moduleName = modulePrefix + "/" + path + "/" + _name + "/" + type + ext;
                } else {
                    moduleName = modulePrefix + "/" + path + "/" + _name;
                }
                if (options.moduleReplace) {
                    moduleName = options.moduleReplace(moduleName);
                }
                return moduleName;
            }
        };
    },
    podDasherisedErrorModuleName: function podDasherisedErrorModuleName(parsedName) {
        var podPrefix = this.namespace.podModulePrefix || this.namespace.modulePrefix;

        return this.podDasherisedErrorLookupWithPrefix(podPrefix, parsedName);
    },
    aliasModuleName(parsedName) {
        if(typeof this.moduleMap[parsedName.fullName] === 'string') {
            let aliasResult = this.moduleMap[parsedName.fullName];
            return aliasResult;
        }
        return false;
    },

});

