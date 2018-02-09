import Controller from '@ember/controller';
import { get } from '@ember/object';

export default Controller.extend({
  actions: {
    submit() {
      let newShoppingListName = get(this, 'newShoppingListName');
      this.store.addRecord({
        type: 'shoppingList',
        name: newShoppingListName
      }).then((shoppingList) => {
        this.transitionToRoute('shopping-list', get(shoppingList, 'id'));
      });
    }
  }
});
