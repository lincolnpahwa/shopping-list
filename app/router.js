import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('new');
  this.route('shopping-list', { path: 'shopping-list/:id' });
  this.route('app-shell');
});

export default Router;
