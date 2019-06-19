import { Component, OnDestroy, Input, EventEmitter, Output, Injectable, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { delay, withLatestFrom, takeWhile } from 'rxjs/operators';
import { DefaultComponent } from '../../../pages/default/default.component';


import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService

} from '@nebular/theme';

import { StateService } from '../../../@core/utils';
import { SharedServiceService } from 'src/app/shared-service.service';

// TODO: move layouts into the framework
@Component({ 
  selector: 'ngx-sample-layout',
  styleUrls: ['./sample.layout.scss'],
  template: `
    <nb-layout [center]="layout.id === 'center-column'" windowMode>
      <nb-layout-header fixed>
        <opti-header [position]="sidebar.id === 'start' ? 'normal': 'inverse'"></opti-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive [end]="sidebar.id === 'end'">
        <input [(ngModel)]="searchText" type="text" name="search" class="form-control mt-3" nbInput fieldSize="small" placeholder="Search Tenant" autocomplete="off">
        <div class="menu-items-list">
          <ul class="menu-items">
            <li class="menu-item" *ngFor="let item of MenuData | filter : searchText; index as i; trackBy: trackByFn ">
              <a (click)="onClickData(item)"><i class="menu-icon optipro-icon-tenant"></i><span class="menu-title">{{item}}</span></a>
            </li>
          </ul>
        </div>
      </nb-sidebar>

      <nb-layout-column class="main-content">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-column start class="small" *ngIf="layout.id === 'two-column' || layout.id === 'three-column'">
        <nb-menu [items]="subMenu"></nb-menu>
      </nb-layout-column>

      <nb-layout-column class="small" *ngIf="layout.id === 'three-column'">
        // <nb-menu [items]="subMenu"></nb-menu>
        // <nb-menu class="cursor-pointer" (click)="Onclick($event)" [items]="TenantItems">
        // </nb-menu>
        <nb-menu>
        <button>test data from </button> 
        </nb-menu>
      </nb-layout-column>
      
    </nb-layout>
  `,
})
export class SampleLayoutComponent implements OnDestroy {
  
  public MenuData: any = [];
  subMenu: NbMenuItem[] = [
    {
      title: 'PAGE LEVEL MENU',
    },
  ];
  layout: any = {};
  sidebar: any = {};

  private alive = true;

  currentTheme: string;

  constructor(protected stateService: StateService,
    protected menuService: NbMenuService,
    protected themeService: NbThemeService,
    protected bpService: NbMediaBreakpointsService,
    protected sidebarService: NbSidebarService,
    private sharedService: SharedServiceService) {

      this.sharedService.commonDataTo$.subscribe(data => {
        if(data != null && data != undefined){
          this.MenuData = data;
        }
        
      })

    this.stateService.onLayoutState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((layout: string) => this.layout = layout);

    this.stateService.onSidebarState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });

    const isBp = this.bpService.getByName('is');
    this.menuService.onItemSelect()
      .pipe(
        takeWhile(() => this.alive),
        withLatestFrom(this.themeService.onMediaQueryChange()),
        delay(20),
      )
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  onClickData(data:string){
    this.sharedService.ShareDataFrom(data);    
  }

  ngOnInit() {
  
  }

  ngOnChange(){
 
  }

}
