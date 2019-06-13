import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbSidebarModule, NbLayoutModule, NbSpinnerModule, NbDatepickerModule, NbTabsetModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DefaultComponent } from './default/default.component';
import { GridModule } from '@progress/kendo-angular-grid';

import { IntlModule } from '@progress/kendo-angular-intl';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  declarations: [PagesComponent, DefaultComponent,],
  imports: [
    CommonModule,
    GridModule,
    PagesRoutingModule,
    NbLayoutModule,
    ThemeModule,
    NbSidebarModule,
    NbSpinnerModule,
    NbDatepickerModule,
    FormsModule,
    NbTabsetModule,
    IntlModule, 
  ],
  providers: [...PAGES_COMPONENTS,]
})
export class PagesModule { }
