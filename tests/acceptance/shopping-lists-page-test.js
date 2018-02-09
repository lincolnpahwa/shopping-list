import { test } from 'qunit';
import moduleForAcceptance from 'smart-shopping-list/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | The Shopping Lists Page');

test('Is empty by default', function(assert) {
  visit('/');

  andThen(() => {
    assert.dom('[data-test-shopping-list-entry]').doesNotExist();
  });
});

test('It displays existing shopping lists', function(assert) {
  waitFor(() => {
    return this.store.update((t) => [
      t.addRecord({ type: 'shoppingList', attributes: { name: 'List 1'} }),
      t.addRecord({ type: 'shoppingList', attributes: { name: 'List 2'} })
    ]);
  });

  visit('/');

  andThen(() => {
    assert.dom('[data-test-shopping-list-entry]').exists({ count: 2 });
  });
});

test('It navigates to the shopping list page after clicking on a shopping list', function(assert) {
  assert.expect(1);

  waitFor(() => {
    return this.store.update((t) => [
      t.addRecord({ type: 'shoppingList', attributes: { name: 'List 1'} })
    ]);
  });

  visit('/');
  click('[data-test-shopping-list-entry]:eq(0) a');

  andThen(() => {
    assert.ok(currentURL().match(/^\/shopping-list\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/));
  })
});

test('It navigates to the create shopping list page after clicking on the create button', function(assert) {
  visit('/');
  click('[data-test-button-create-shopping-list]');

  andThen(() => {
    assert.equal(currentURL(), '/new');
  })
});
