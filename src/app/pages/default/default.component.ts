import { Component, OnInit } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { GridComponent } from '@progress/kendo-angular-grid';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { LicenseService } from 'src/app/service/license.service';
import {NbToastrService} from '@nebular/theme';
import { CommonData } from "src/app/Data/CommonData";
import { RowArgs } from '@progress/kendo-angular-grid';
import { ThemeSwitcherListComponent } from 'src/app/@theme/components';
//import { DefaultComponent } from 'src/app/pages/default/default.component';
import { SampleLayoutComponent } from 'src/app/@theme/layouts/sample/sample.layout';
import { SharedServiceService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  private commonData = new CommonData();
  public fileURL = this.commonData.get_current_url();
  public TenantId:any = '';
  public selectedValue: any = [];
  public listItems: any = [];
  public gridViewData: any = [];
  public gridProductsData: any = [];
  public gridUsersData: any = [];
  public TenantList: any = [];
  public TenantItems: any = [];
  public LicenseCount:any = '';
  public arrConfigData: any[];
  public checkProducts: any[];
  public checkUsers:any[];
  public selectalluser: boolean = false;
  public selectallprod: boolean = false;
  public ProductArr: any = [];
  public UserArr: any = [];
  public ProductRowSelected: any;
  loading = false;
  public showNewBtn:boolean = false;
  public showForm: boolean = false;
  loadingGrid = false;
  public showsaveBtn: boolean = false;

  constructor(private httpClientSer: HttpClient,private licAsgnmt: LicenseService, private toastrService: NbToastrService,private sharedService:SharedServiceService) { }

  ngOnInit() {
    // if(document.body.contains(document.querySelector(".menu-item > a.active"))){
    //   document.querySelector(".menu-item > a.active").classList.remove('active');
    // }

    this.sharedService.commonDataFrom$.subscribe(data=>{
      if(data != null && data != undefined){
      console.log("Asif Data",data);
      this.OnclickMenu(data);
      }
    });

    this.httpClientSer.get(this.fileURL + '/assets/configuration.json').subscribe(
      data => {
        this.arrConfigData = data as string[];
        window.localStorage.setItem('arrConfigData', JSON.stringify(this.arrConfigData[0]));
        this.getProductsList();
        this.getUsersList('');
        this.getTenantList();
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  setUncheckCheckbox(){
    for(let i=0; i<this.gridViewData.length;i++){
      let checkId = document.getElementsByClassName('checkboxFN')[i] as HTMLInputElement;
      checkId.checked = false;
    }

    for(let i=0; i<this.gridUsersData.length;i++){
      let checkId = document.getElementsByClassName('checkboxUN')[i] as HTMLInputElement;
      checkId.checked = false;
    }
  }

  getProductsList(){
    //this.loading = true;
    this.licAsgnmt.GetProductsList(this.arrConfigData[0].optiProTLAURL).subscribe(
      data => {
        this.gridViewData = data;
        this.gridProductsData = data;
        for(var i=0; i<this.gridViewData.length; i++){
          this.gridViewData[i].rowcheck = false;
        }                
      //  this.loading = false;
      });
  }

  getUsersList(paramTenant){
    //this.loading = true;
    this.licAsgnmt.GetUserList(this.arrConfigData[0].optiProTLAURL,paramTenant).subscribe(
      data => {
        this.gridUsersData = data;

        for(var i=0; i<this.gridUsersData.length; i++){
          this.gridUsersData[i].rowcheck = false;
        }

        if(paramTenant != ''){
          for(let i=0; i<this.gridUsersData.length; i++){
            if(this.gridUsersData[i].TENANTKEY == paramTenant){
              this.gridUsersData[i].rowcheck = true;
            }
          }
        }
       // this.loading = false;
      });
  }

  getTenantList(){
    this.loading = true;
    this.licAsgnmt.GetTenantList(this.arrConfigData[0].optiProTLAURL).subscribe(
      data => {
        this.TenantList = data;
        if(this.TenantList !=null && this.TenantList != undefined){
          for(let i=0; i<this.TenantList.length;i++){
            let map ={};
            map['title'] = this.TenantList[i].TENANTKEY;
            map['icon'] = 'optipro-icon-list';
            this.TenantItems.push(this.TenantList[i].TENANTKEY);
          }
          this.sharedService.ShareDataTo(this.TenantItems);
        }
        else{
          this.toastrService.danger("No Tenant found");
        }
        this.loading = false;
      });
  }

  OnclickMenu(evt){

   // let Tenant = evt.srcElement.innerText;
   let Tenant = evt;
    if(Tenant == undefined || Tenant == null || Tenant == ''){
      return false;
    }

    this.showForm = true;
    this.showsaveBtn = false;
    this.loading = true;
    //let select = [];

    this.TenantId = Tenant;
    this.getProductsList();
    this.getUsersList(this.TenantId);
    //this.setUncheckCheckbox();
   // this.loadingGrid = true;
    
    this.licAsgnmt.GetTenantListByName(this.arrConfigData[0].optiProTLAURL,this.TenantId).subscribe(
      data => {

       for(let i =0; i<this.gridViewData.length; i++){
        for(let j =0; j<data.length; j++){
          //select.push(data[j].PRODUCTKEY);
          //this.ProductRowSelected = (e: RowArgs) => select.indexOf(e.dataItem.OPTM_PRODCODE) >=0 ;
          if(data[j].PRODUCTKEY == this.gridViewData[i].OPTM_PRODCODE && data[j].EXTNCODE > 0){
            this.gridViewData[i].EXTNCODE = data[j].EXTNCODE;
            this.gridViewData[i].rowcheck = true;
            // let checkId = document.getElementsByClassName('checkboxFN')[i] as HTMLInputElement;
            // checkId.checked = true;
          }          
        }
        this.loading = false;
       }
      // this.loadingGrid = false;
      
       // Pass subscriber Data
       this.sharedService.ShareDataTo(this.gridViewData);

    });
  }

  NewRecord(){
    
   this.showForm = true;
   this.showsaveBtn = true;

   for(var i=0; i<this.gridViewData.length; i++){
    this.gridViewData[i].EXTNCODE = 0;
    this.gridViewData[i].rowcheck = false;
   }
    this.TenantId = '';
    this.getUsersList('');
  }

  onLicenseCountChange(value,rowindex){
    // for (let i = 0; i < this.gridViewData.length; ++i) {
    //   if (i === rowindex) {
    //   this.gridViewData[i].EXTNCODE = value;
    //   this.gridViewData[i].rowcheck = true;
    //   }
    // }
    this.gridViewData[rowindex].EXTNCODE = value;
    this.gridViewData[rowindex].rowcheck = true;    
  }

  selectProduct(checkvalue,rowdata,index){
    if(checkvalue == true)
        this.gridViewData[index].rowcheck = true;        
    else
      this.gridViewData[index].rowcheck = false;        
  }

  selectUser(checkvalue,rowdata,index){   
    if(checkvalue == true)
      this.gridUsersData[index].rowcheck = true;        
    else
      this.gridUsersData[index].rowcheck = false;     
  }

  on_Selectall_checkbox_checked(checkall){

    // this.ProductArr = [];
    // if(checkall == true){
    //   this.selectallprod = true;
    //   for(let i=0; i<this.gridViewData.length; i++){
    //     this.ProductArr.push(this.gridViewData.OPTM_USERCODE);
    //   }
    // }
    // else{
    // this.selectallprod = false;
    // }

    if(checkall == true){
      for(let i=0; i<this.gridViewData.length;i++){
        this.gridViewData[i].rowcheck = true;
      }
    }
    else{
      for(let i=0; i<this.gridViewData.length;i++){
        this.gridViewData[i].rowcheck = false;
      }
    }

  }

  user_Selectall_checkbox_checked(checkall){
    // this.UserArr = [];
    // if(checkall == true){
    //   this.selectalluser = true;
    //   for(let i=0; i<this.gridUsersData.length; i++){
    //     this.UserArr.push(this.gridUsersData.OPTM_USERCODE);
    //   }
    // }
    // else{
    // this.selectalluser = false;
    // }

    if(checkall == true){
      for(let i=0; i<this.gridUsersData.length;i++){
        this.gridUsersData[i].rowcheck = true;
      }
    }
    else{
      for(let i=0; i<this.gridUsersData.length;i++){
        this.gridUsersData[i].rowcheck = false;
      }
    }

  }

  GridViewSelected(){

  }

  gridRowSelectionChange(evt){
    //let code = evt.selectedRows[0].dataItem.OPTM_PRODCODE;
    // this.licAsgnmt.GetUserList(this.arrConfigData[0].optiProTLAURL,this.selectedValue.dbName).subscribe(
    //   data => {
    //     this.gridUsersData = data;
    // });

  }

  SaveRecord(operation){

    this.loading = true;
    let ProductData = [];
    let UserData = [];
    let tenant = this.TenantId;
    let flagProduct = false;
    let flagUser = false;

    for(let i=0; i< this.gridViewData.length; i++){
      if(this.gridViewData[i].rowcheck == true){
        flagProduct = true;
        let map = {};
        map['Product'] = this.gridViewData[i].OPTM_PRODCODE;
        map['License'] = this.gridViewData[i].EXTNCODE;
        map['Tenant'] = tenant;
        map['Operation'] = operation;
        ProductData.push(map);
      }
    }

    for(let i=0; i< this.gridUsersData.length; i++){
      if(this.gridUsersData[i].rowcheck == true){
        flagUser = true;
        let map = {};
        map['User'] = this.gridUsersData[i].OPTM_USERCODE;
        map['TenantKey'] = tenant;
        UserData.push(map);
      }
    }

    if(flagProduct == false){
      this.toastrService.danger("Please select atleast one product");
      this.loading = false;
      return;
    }

    else if(flagUser == false){
      this.toastrService.danger("Please select atleast one user");
      this.loading = false;
      return;
    }

    this.licAsgnmt.SaveTenant(this.arrConfigData[0].optiProTLAURL,ProductData,UserData).subscribe(
      data => {
        
        if(operation == 'New'){
          if(data.length > 0){
            for(let i=0; i<data.length; i++){
              this.toastrService.danger(data[i].Message + ' in ' + data[i].Product);
              }
            }
            else{
              this.toastrService.success("Record saved succesfully");
            } 
          }
        else {
          if(data.length > 0){
            for(let i=0; i<data.length; i++){
              this.toastrService.danger(data[i].Message + ' in ' + data[i].Tenant);
              }
            }
            else{
              this.toastrService.success("Record updated succesfully");
            } 
        }  
        
        this.showForm = false;
        this.loading = false;
    },
    error => {
      this.loading = false;
      this.toastrService.danger("Insufficient License");
    });
  }

  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }
  clearFilter(grid: GridComponent) {
    this.clearFilters()
  }
  public state: State = {
    skip: 0,
    take: 5,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: []
    }
  };
  public clearFilters() {
    this.state.filter = {
      logic: 'and',
      filters: []
    };
  }

  CancelRecord(){
    this.showForm = false;
  }

  numberOnly(event){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
