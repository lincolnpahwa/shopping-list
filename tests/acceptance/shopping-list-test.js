import { test } from 'qunit';
import moduleForAcceptance from 'smart-shopping-list/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Shopping List');

test('It displays a shopping list with items', function(assert) {
  let shoppingListId = 'd76bb76e-7e66-4fb6-b69f-f02cc9f74681';

  waitFor(() => {
      return this.store.update((t) => [
        t.addRecord({
          id: shoppingListId,
          type: 'shoppingList',
          attributes: { name: 'Shopping List 1' }
        }),
        t.addRecord({
          type: 'shoppingListItem',
          attributes: { name: 'Milk' },
          relationships: {
            shoppingList: {
              data: { id: shoppingListId, type: 'shoppingList' }
            }
          }
        }),
        t.addRecord({
          type: 'shoppingListItem',
          attributes: { name: 'Sugar' },
          relationships: {
            shoppingList: {
              data: { id: shoppingListId, type: 'shoppingList' }
            }
          }
        })
      ]);
  });

  visit(`/shopping-list/${shoppingListId}`);

  andThen(() => {
    assert.dom('[data-test-shopping-list-item]').exists({ count: 2 });
  });
});

test('I can add an item', function(assert) {
  let shoppingListId = 'd76bb76e-7e66-4fb6-b69f-f02cc9f74681';

  waitFor(() => {
      return this.store.update((t) => [
        t.addRecord({
          id: shoppingListId,
          type: 'shoppingList',
          attributes: { name: 'Shopping List 1' }
        })
      ]);
  });

  visit(`/shopping-list/${shoppingListId}`);

  fillIn('[data-test-shopping-list-new-item]', 'Bread');
  click('[data-test-shopping-list-add-item]');

  andThen(() => {
    assert.dom('[data-test-shopping-list-item]').exists({ count: 1 });
  });
});

test('I can check an item', function(assert) {
  let shoppingListId = 'd76bb76e-7e66-4fb6-b69f-f02cc9f74681';

  waitFor(() => {
      return this.store.update((t) => [
        t.addRecord({
          id: shoppingListId,
          type: 'shoppingList',
          attributes: { name: 'Shopping List 1' }
        }),
        t.addRecord({
          type: 'shoppingListItem',
          attributes: { name: 'Milk' },
          relationships: {
            shoppingList: {
              data: { id: shoppingListId, type: 'shoppingList' }
            }
          }
        })
      ]);
  });

  visit(`/shopping-list/${shoppingListId}`);
  click('[data-test-shopping-list-check-item="0"]');

  andThen(() => {
    assert.ok(find('[data-test-shopping-list-check-item="0"]')[0].checked);
  });
});

test('I can delete an item', function(assert) {
  let shoppingListId = 'd76bb76e-7e66-4fb6-b69f-f02cc9f74681';

  waitFor(() => {
      return this.store.update((t) => [
        t.addRecord({
          id: shoppingListId,
          type: 'shoppingList',
          attributes: { name: 'Shopping List 1' }
        }),
        t.addRecord({
          type: 'shoppingListItem',
          attributes: { name: 'Milk' },
          relationships: {
            shoppingList: {
              data: { id: shoppingListId, type: 'shoppingList' }
            }
          }
        })
      ]);
  });

  visit(`/shopping-list/${shoppingListId}`);
  click('[data-test-shopping-list-delete-item="0"]');

  andThen(() => {
    assert.dom('[data-test-shopping-list-item]').doesNotExist();
  });
});
