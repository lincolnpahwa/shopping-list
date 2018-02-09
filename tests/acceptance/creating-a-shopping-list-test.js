import { test } from 'qunit';
import moduleForAcceptance from 'smart-shopping-list/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | The Shopping Lists Page');

test('Creating a shopping list', function(assert) {
  assert.expect(2);
  visit('/new');

  fillIn('[data-test-new-shopping-list-name]', 'My new shopping list');
  click('[data-test-new-shopping-list-create]');

  andThen(() => {
    assert.ok(currentURL().match(/^\/shopping-list\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/));
    assert.dom('[data-test-shopping-list-name]').hasText('My new shopping list');
  });
});
