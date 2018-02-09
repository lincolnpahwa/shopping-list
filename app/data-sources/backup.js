import IndexedDBSource from '@orbit/indexeddb';

export default {
  create(injections = {}) {
    injections.name = 'backup';
    injections.namespace = 'smart-shopping-list';

    let source = new IndexedDBSource(injections);

    source.destroy = function() {
      return this.closeDB();
    };

    return source;
  }
};
