import Resolver from 'addon-checkpoint-resolver/resolver';

export default Resolver.extend({
	init() {
		this.moduleMap = {
			'service:console': 'dummy/services/logger',
		};
		this.additionalPaths = [
			{ type: 'component', path: 'components/ui/buttons/', pod: true },
			{ type: 'template', path: 'components/ui/buttons/', pod: true }
		];
		return this._super(...arguments);
	}
});
