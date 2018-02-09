import { get } from '@ember/object';
import { camelize } from '@ember/string';
import OrbitStore from '@orbit/store';
import Coordinator from '@orbit/coordinator';
import {
  Schema,
  KeyMap
} from '@orbit/data';
import modulesOfType from 'ember-orbit/-private/system/modules-of-type';
import { Store } from 'ember-orbit';

function findModulesOfType(application, type) {
  return modulesOfType(application.modulePrefix, type).map(camelize);
}

function createSchema(application) {
  let modelSchemas = {};
  let modelNames = findModulesOfType(application, 'models');

  modelNames.forEach(name => {
    let model = application.resolveRegistration(`model:${name}`);
    modelSchemas[name] = {
      id: get(model, 'id'),
      keys: get(model, 'keys'),
      attributes: get(model, 'attributes'),
      relationships: get(model, 'relationships')
    };
  });

  return new Schema({ models: modelSchemas });
}

function createSources(application, injections) {
  return findModulesOfType(application, 'data-sources').map((name) => {
    let sourceFactory = application.resolveRegistration(`data-source:${name}`);
    return sourceFactory.create(injections);
  });
}

function createStrategies(application) {
  return findModulesOfType(application, 'data-strategies').map((name) => {
    let strategyFactory = application.resolveRegistration(`data-strategy:${name}`);
    return strategyFactory.create();
  });
}

export default function createOrbitStore(application) {
  let schema = createSchema(application);
  let orbitStore = new OrbitStore({ schema });
  let keyMap = new KeyMap();
  let sources = createSources(application, { schema, keyMap });
  let strategies = createStrategies(application);
  let coordinator = new Coordinator({ sources: [orbitStore, ...sources], strategies });
  let store = Store.create({ source: orbitStore });

  return coordinator.activate()
    .then(() => [store, coordinator]);
}
