import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
  <nb-layout class="p-0">
    <nb-layout-column class="p-0">
    <router-outlet>
    </router-outlet>
    </nb-layout-column>
  </nb-layout>
  `,
  
})
export class AuthComponent implements OnInit {

  constructor() { 

  }

  ngOnInit() {
  }

}
