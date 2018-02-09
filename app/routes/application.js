import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject } from '@ember/service';

export default Route.extend({
  dataCoordinator: inject(),

  beforeModel() {
    let coordinator = get(this, 'dataCoordinator');
    let backup = coordinator.getSource('backup');

    return backup.pull(q => q.findRecords())
      .then(transform => this.store.sync(transform))
      .then(() => coordinator.activate());
  }
});
