import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit{

  menu = MENU_ITEMS;

  ngOnInit(){  
    // Remove account related class from body
    const element = document.getElementsByTagName("body")[0];
    element.classList.remove("opti_body-login");
    element.classList.remove("opti_account-module");
  }
}
