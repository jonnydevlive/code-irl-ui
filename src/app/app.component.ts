/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import { AppState } from './app.service';
import { Home } from './home';
import { RouterActive } from './router-active';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.css')
  ],
  template: `
    <md-content>
      <md-toolbar color="primary">
          <span>{{ name }}</span>
          <span class="fill"></span>
          <button md-button router-active [routerLink]=" ['Index'] ">
            Index
          </button>
          <button md-button router-active [routerLink]=" ['Home'] ">
            Home
          </button>
      </md-toolbar>

      <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>

      <router-outlet></router-outlet>

      <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

      <footer>
        <img [src]="angularclassLogo" width="6%">
        <span id="footerText">WebPack Angular 2 Starter by <a [href]="url">@AngularClass</a></span>
      </footer>
      </md-content>
  `
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home }
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  // { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') }
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}