import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import Component from '@ember/component';

module('Unit | Service | some thing', function(hooks) {
  setupTest(hooks);

  test('Should resolve regular & pod component styles', function(assert) {

    let xElComponent = this.owner.lookup('component:x-el');

    assert.ok(xElComponent instanceof Component);

    let xCComponent = this.owner.lookup('component:x-comp');

    assert.ok(xCComponent instanceof Component);

  });


  test('Should resolve pod alias component', function(assert) {
    let xElComponent = this.owner.lookup('component:ui/buttons/button-x');

    assert.ok(xElComponent instanceof Component);

    let xCComponent = this.owner.lookup('component:button-x');

    assert.ok(xCComponent instanceof Component);
  });

});