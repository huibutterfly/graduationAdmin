import { Component } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';



@Component({
  selector: 'app-root',
  template: `
    <h1 class="title">Angular Router</h1>
    <ckeditor [(ngModel)]="ckeditorContent" debounce="500"  [config]="config">
    </ckeditor>
    {{ckeditorContent}}
    <div> {{ckeditorContent}}</div>
    <nav>
      <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
      <a routerLink="/superheroes" routerLinkActive="active">Heroes</a>
      <a routerLink="/admin" routerLinkActive="active">Admin</a>
      <a routerLink="/login" routerLinkActive="active">Login</a>
      <a [routerLink]="[{ outlets: { popup: ['compose'] } }]">Contact</a>
    </nav>
    <router-outlet></router-outlet>
    <router-outlet name="popup"></router-outlet>
  `
})
export class AppComponent {
  data : string;
  
}
