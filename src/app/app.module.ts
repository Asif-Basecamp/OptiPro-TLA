import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from './@theme/theme.module';
import { CoreModule } from './@core/core.module';
import { GridModule } from '@progress/kendo-angular-grid';
//import { ItemLookupComponent } from './lookup/item-lookup/item-lookup.component';
//import { WarehouseLookupComponent } from './lookup/warehouse-lookup/warehouse-lookup.component';
//import { LotNumberLookupComponent } from './lookup/lot-number-lookup/lot-number-lookup.component';
import { NbOverlayModule, NbToastrModule, NbDatepickerModule } from '@nebular/theme';


@NgModule({
  declarations: [
    AppComponent,
   // ItemLookupComponent,
   // WarehouseLookupComponent,
  //  LotNumberLookupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    GridModule,
    NbOverlayModule,
    NbDatepickerModule.forRoot(),
    NbToastrModule.forRoot(),
     
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ]
  
})
export class AppModule { }
