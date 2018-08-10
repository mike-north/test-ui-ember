import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('red');
  this.route('green');
  this.route('blue');
  this.route('yellow');
  this.route('orange');
  this.route('purple');
  this.route('grey');
  this.route('black');
  this.route('white');
});

export default Router;
