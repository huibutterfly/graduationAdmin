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
    <ul *ngFor="let item of lists">
      <li>{{item.id}}</li>
    <ul>
  
  `
})
export class HeroListComponent implements OnInit {
  heroes$: Observable<Hero[]>;


  private selectedId: number;
  private lists: object;
  


  constructor(
    private service: HeroService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getData();
    this.heroes$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.service.getHeroes();
      });
  }

  getData(){
    interface ItemsResponse {
      msg: string,
      result: boolean,
      data: One,
      count: number
    }
    interface One {
      FK_product_id: number,
      price: number,
      product_name: string
    }
    class HeroService {

    }
    this.http.get<ItemsResponse>('api/One/index').subscribe(res => {
      // Read the result field from the JSON response.
      this.lists = res.data;
    });
  }
}
