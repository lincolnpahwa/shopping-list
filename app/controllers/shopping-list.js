import Controller from '@ember/controller';
import { get, set } from '@ember/object';

export default Controller.extend({
  actions: {
    addItem() {
      let shoppingList = get(this, 'model');
      let newItemName = get(this, 'newItemName');

      this.store.addRecord({
        type: 'shoppingListItem',
        name: newItemName,
        shoppingList: shoppingList
      });

      set(this, 'newItemName', undefined);
    },

    deleteItem(item) {
      this.store.removeRecord({ type: 'shoppingListItem', id: get(item, 'id') });
    }
  }
});
