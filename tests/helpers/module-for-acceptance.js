import { module } from 'qunit';
import { resolve } from 'rsvp';
import startApp from '../helpers/start-app';
import destroyObject from '../helpers/destroy-app';
import createOrbitStore from './create-orbit-store';

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      return createOrbitStore(this.application)
        .then(([store, coordinator]) => {
          this.store = store;
          this.coordinator = coordinator;
        })
        .then(() => options.beforeEach && options.beforeEach.apply(this, arguments));
    },

    afterEach() {
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
      return resolve(afterEach)
        .then(() => destroyObject(this.application))
        .then(() => this.coordinator.getSource('backup').reset())
        .then(() => this.coordinator.deactivate())
        .then(() => destroyObject(this.store));
    }
  });
}
