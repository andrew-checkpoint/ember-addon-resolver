import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import AnimalModel from '../../models/animal/model';
import AnimalAdapter from '../../models/animal/adapter';
import AnimalSerializer from '../../models/animal/serializer';

import DogModel from '../../models/animal/dog/model';
import DogAdapter from '../../models/animal/dog/adapter';
import DogSerializer from '../../models/animal/dog/serializer';


import FruitModel from '../../models/fruit';
import FruitAdapter from '../../adapters/fruit';
import FruitSerializer from '../../serializers/fruit';


import PhoneModel from '../../phone/model';
import PhoneAdapter from '../../phone/adapter';
import PhoneSerializer from '../../phone/serializer';

import AndroidModel from '../../phone/android/model';
import AndroidAdapter from '../../phone/android/adapter';
import AndroidSerializer from '../../phone/android/serializer';



module('Unit | Service | some thing', function(hooks) {
  setupTest(hooks);

  test('Should resolve model-pod models', function(assert) {

    let store = this.owner.lookup('service:store');

    const animalModel = store.createRecord('animal');
    const animalAdapter = store.adapterFor('animal');
    const animalSerializer = store.serializerFor('animal');

    assert.ok(animalModel instanceof AnimalModel);
    assert.ok(animalAdapter instanceof AnimalAdapter);
    assert.ok(animalSerializer instanceof AnimalSerializer);
    
  });

  test('Should resolve deep model-pod models with . lookup ', function(assert) {

    let store = this.owner.lookup('service:store');

    const dogModel = store.createRecord('animal.dog');
    const dogAdapter = store.adapterFor('animal.dog');
    const dogSerializer = store.serializerFor('animal.dog');

    assert.ok(dogModel instanceof AnimalModel);
    assert.ok(dogAdapter instanceof AnimalAdapter);
    assert.ok(dogSerializer instanceof AnimalSerializer);

    assert.ok(dogModel instanceof DogModel);
    assert.ok(dogAdapter instanceof DogAdapter);
    assert.ok(dogSerializer instanceof DogSerializer);

  });

  test('Should resolve deep model-pod models with / lookup ', function(assert) {

    let store = this.owner.lookup('service:store');

    const dogModel = store.createRecord('animal.dog');
    const dogAdapter = store.adapterFor('animal.dog');
    const dogSerializer = store.serializerFor('animal.dog');

    assert.ok(dogModel instanceof AnimalModel);
    assert.ok(dogAdapter instanceof AnimalAdapter);
    assert.ok(dogSerializer instanceof AnimalSerializer);

    assert.ok(dogModel instanceof DogModel);
    assert.ok(dogAdapter instanceof DogAdapter);
    assert.ok(dogSerializer instanceof DogSerializer);

  });

  test('Should resolve non-pod models', function(assert) {

    let store = this.owner.lookup('service:store');

    const fruitModel = store.createRecord('fruit');
    const fruitAdapter = store.adapterFor('fruit');
    const fruitSerializer = store.serializerFor('fruit');

    assert.ok(fruitModel instanceof FruitModel);
    assert.ok(fruitAdapter instanceof FruitAdapter);
    assert.ok(fruitSerializer instanceof FruitSerializer);

  });

  test('Should resolve regular pod models', function(assert) {

    let store = this.owner.lookup('service:store');

    const phoneModel = store.createRecord('phone');
    const phoneAdapter = store.adapterFor('phone');
    const phoneSerializer = store.serializerFor('phone');

    assert.ok(phoneModel instanceof PhoneModel);
    assert.ok(phoneAdapter instanceof PhoneAdapter);
    assert.ok(phoneSerializer instanceof PhoneSerializer);

  });

  test('Should resolve regular pod deep models', function(assert) {

    let store = this.owner.lookup('service:store');

    const phoneModel = store.createRecord('phone.android');
    const phoneAdapter = store.adapterFor('phone.android');
    const phoneSerializer = store.serializerFor('phone.android');

    assert.ok(phoneModel instanceof PhoneModel);
    assert.ok(phoneAdapter instanceof PhoneAdapter);
    assert.ok(phoneSerializer instanceof PhoneSerializer);

    assert.ok(phoneModel instanceof AndroidModel);
    assert.ok(phoneAdapter instanceof AndroidAdapter);
    assert.ok(phoneSerializer instanceof AndroidSerializer);

  });

});