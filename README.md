addon-checkpoint-resolver
==============================================================================

Adds rules for better resolving controls including pod like structures for models/adapters
Custom alias for components / directories


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install addon-checkpoint-resolver
```


Usage
------------------------------------------------------------------------------

### Model

Add pod style directories for models without mixing them with routes.


```
app
│
└───models
│   │
│   └───animals
│       │   model.js
│       │   adapter.js
│       │   
│       media
│       │	model.js   
│       │	adapter.js
│       │	serializer.js
│       │	
│       └───video
│       │   │	model.js
│       │
│       └───image 
│       │   │	model.js
│   	│
...   	...
```


### Alias
Allow mapping of a fullName to exact path.

Reopen/Extend the resolver with moduleMap.

```
init(){
	this.moduleMap = {
		'service:console': 'dummy/services/logger',
	};
	return this._super(...arguments);
}
```



### Root paths
Allows adding paths as a root lookups for a particular set of types.

```
init(){
	this.additionalPaths: [
		{ type: 'template', path: 'ui/buttons', pod: true },
		{ type: 'component', path: 'ui/buttons', pod: true },
	]
	return this._super(...arguments);
}
```

Example: 
Structure/Group components in sub-folder pods but reference them in templates at the root.

Instead of having to reference the whole structure path.
```
	{{ui/buttons/action-button action=...}}
```
Can be accessed as
```
	{{action-button action=...}}
```


### ?? podDasherisedErrorModuleName


### aliasModuleName

Simple fullname -> path lookup

{
	'service:finder': 'module/path/to/target'
}
```

```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
