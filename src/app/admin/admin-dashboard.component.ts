import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Observable }           from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import {AppModule} from '../app.module';

import { SelectivePreloadingStrategy } from '../selective-preloading-strategy';

import 'rxjs/add/operator/map';
import { Input } from '@angular/core/src/metadata/directives';

@Component({
  template:  `
    <p>Dashboard</p>

    <p>Session ID: {{ sessionId | async }}</p>
    <a id="anchor"></a>
    <p>Token: {{ token | async }}</p>

    Preloaded Modules
    <ul>
      <li *ngFor="let module of modules">{{ module }}</li>
    </ul>
  `
})
export class AdminDashboardComponent implements OnInit {
  sessionId: Observable<string>;
  token: Observable<string>;
  modules: string[];
  data: object;

  constructor(
    private route: ActivatedRoute,
    private preloadStrategy: SelectivePreloadingStrategy,
    private http: HttpClient
  
  ) {
    this.modules = preloadStrategy.preloadedModules;
  }

  ngOnInit() {

    // Capture the session ID if available
    this.sessionId = this.route
      .queryParamMap
      .map(params => params.get('session_id') || 'None');

    // Capture the fragment if available
    this.token = this.route
      .fragment
      .map(fragment => fragment || 'None');
  }
}
