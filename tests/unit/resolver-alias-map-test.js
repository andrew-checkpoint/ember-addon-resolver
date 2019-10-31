import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';


module('Unit | Service | some thing', function(hooks) {
  setupTest(hooks);

  test('Should resolve alias via path', function(assert) {

    let logger = this.owner.lookup('service:logger');

    let loggerAlias = this.owner.lookup('service:console');

    assert.equal(logger.constructor, loggerAlias.constructor);
    
  });


});