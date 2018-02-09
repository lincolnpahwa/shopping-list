import {
  Model,
  attr,
  key,
  hasOne
} from 'ember-orbit';

export default Model.extend({
  remoteId: key(),
  name: attr('string'),
  complete: attr('boolean'),
  shoppingList: hasOne('shoppingList', { inverse: 'items' })
});
