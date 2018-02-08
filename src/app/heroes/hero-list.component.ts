// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Hero, HeroService }  from './hero.service';
import { HttpClient } from '@angular/common/http';

@Component({
  template: `
    <h2>HEROES</h2>
    <ul class="items">
      <li *ngFor="let hero of heroes$ | async"
        [class.selected]="hero.id === selectedId">
        <a [routerLink]="['/hero', hero.id]">
          <span class="badge">{{ hero.id }}</span>{{ hero.name }}
        </a>
      </li>
    </ul>

    <button routerLink="/sidekicks">Go to sidekicks</button>
  `
})
export class HeroListComponent implements OnInit {
  heroes$: Observable<Hero[]>;


  private selectedId: number;
  data: object;

  constructor(
    private service: HeroService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log('111111');
    this.getData();
    this.heroes$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.service.getHeroes();
      });
  }

  getData(){
    this.http.get('api/One/index').subscribe(data => {
      // Read the result field from the JSON response.
      this.data = data;
      console.log(data);
    });
  }
}
