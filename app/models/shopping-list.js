import {
  Model,
  attr,
  key,
  hasMany
} from 'ember-orbit';

export default Model.extend({
  remoteId: key(),
  name: attr('string'),
  items: hasMany('shoppingListItem', { inverse: 'shoppingList' })
});
