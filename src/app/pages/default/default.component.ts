import { Component, OnInit } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { GridComponent } from '@progress/kendo-angular-grid';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { LicenseService } from 'src/app/service/license.service';
import {NbToastrService} from '@nebular/theme';
import { CommonData } from "src/app/Data/CommonData";
import { RowArgs } from '@progress/kendo-angular-grid';
import { ThemeSwitcherListComponent } from 'src/app/@theme/components';

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
  loadingGrid = false;

  constructor(private httpClientSer: HttpClient,private licAsgnmt: LicenseService, private toastrService: NbToastrService) { }

  ngOnInit() {
    // if(document.body.contains(document.querySelector(".menu-item > a.active"))){
    //   document.querySelector(".menu-item > a.active").classList.remove('active');
    // }

    this.httpClientSer.get(this.fileURL + '/assets/configuration.json').subscribe(
      data => {
        this.arrConfigData = data as string[];
        window.localStorage.setItem('arrConfigData', JSON.stringify(this.arrConfigData[0]));
        //this.getItemList();
        this.getProductsList();
        this.getUsersList('');
        this.getTenantList();
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  // getItemList(){
  //   this.licAsgnmt.GetCompanyList(this.arrConfigData[0].optiProTLAURL).subscribe(
  //     data => {
  //       this.listItems = data;
  //       if(this.listItems != null && this.listItems != undefined)
  //       this.selectedValue = this.listItems[0];
  //   });
  // }
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
        //this.setProductUncheckCheckbox();
       // this.loading = false;
      });
  }

  getUsersList(paramTenant){
    this.loading = true;
    this.licAsgnmt.GetUserList(this.arrConfigData[0].optiProTLAURL,paramTenant).subscribe(
      data => {
        this.gridUsersData = data;
        if(paramTenant != ''){
          for(let i=0; i<this.gridUsersData.length; i++){
            if(this.gridUsersData[i].TENANTKEY == paramTenant){
              let checkId = document.getElementsByClassName('checkboxUN')[i] as HTMLInputElement;
              if(checkId !=undefined)
              checkId.checked = true;
            }
          }
        }
        this.loading = false;
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
            this.TenantItems.push(map);
          }
        }

        this.loading = false;
      });
  }

  OnclickMenu(evt){
    this.showNewBtn = false;
    let select = [];
    let Tenant = evt.srcElement.innerText;
    this.TenantId = Tenant;
    this.getProductsList();
    this.getUsersList(this.TenantId);
    this.setUncheckCheckbox();
    //this.loadingGrid = true;
    this.gridViewData = this.gridProductsData;

    this.licAsgnmt.GetTenantListByName(this.arrConfigData[0].optiProTLAURL,this.TenantId).subscribe(
      data => {

       for(let i =0; i<this.gridViewData.length; i++){
        for(let j =0; j<data.length; j++){
          select.push(data[j].PRODUCTKEY);
          this.ProductRowSelected = (e: RowArgs) => select.indexOf(e.dataItem.OPTM_PRODCODE) >=0 ;
          if(data[j].PRODUCTKEY == this.gridViewData[i].OPTM_PRODCODE){
            this.gridViewData[i].EXTNCODE = data[j].EXTNCODE;
            let checkId = document.getElementsByClassName('checkboxFN')[i] as HTMLInputElement;
            checkId.checked = true;
          }
          // else{
          //   let checkId = document.getElementsByClassName('checkboxFN')[i] as HTMLInputElement;
          //   checkId.checked = false;
          // }
        }
       }
      // this.loadingGrid = false;
    });
  }

  NewRecord(){
    this.showNewBtn = true;
    this.getProductsList();
    this.setUncheckCheckbox();
    //this.gridViewData = this.gridProductsData;

    this.TenantId = '';
    this.getUsersList('');
  }

  OnDropDownBlur(event){
    // if(this.selectedValue == null || this.selectedValue == undefined || this.selectedValue == ''){
    //   alert("Please select Company");
    //   return;
    // }
    // else{
    //   this.getUsersList();
    // }
  }

  onLicenseCountChange(value,rowindex){
    for (let i = 0; i < this.gridViewData.length; ++i) {
      if (i === rowindex) {
      this.gridViewData[i].EXTNCODE = value;
      }
    }
  }

  selectProduct(checkvalue,rowdata){

    if(checkvalue == true){
      this.ProductArr.push({
        Product:rowdata.OPTM_PRODCODE,
        License:rowdata.LicenseCount,
        TenantKey: this.TenantId});
    }
    else{
      for(let i=0; i<this.ProductArr.length; i++){
        if(this.ProductArr[i].Product == rowdata.OPTM_PRODCODE)
          this.ProductArr.splice(i,1);
      }
    }

  }

  selectUser(checkvalue,rowdata){
    console.log(rowdata.OPTM_USERCODE);
    if(checkvalue == true){
      this.UserArr.push({
        User: rowdata.OPTM_USERCODE,
        TenantKey: this.TenantId});
    }
    else{
      for(let i=0; i<this.ProductArr.length; i++){
        if(this.UserArr[i].User == rowdata.OPTM_USERCODE)
          this.UserArr.splice(i,1);
      }
    }
  }

  on_Selectall_checkbox_checked(checkall){

    this.ProductArr = [];
    if(checkall == true){
      this.selectallprod = true;
      for(let i=0; i<this.gridViewData.length; i++){
        this.ProductArr.push(this.gridViewData.OPTM_USERCODE);
      }
    }
    else{
    this.selectallprod = false;
    }

  }

  user_Selectall_checkbox_checked(checkall){
    this.UserArr = [];
    if(checkall == true){
      this.selectalluser = true;
      for(let i=0; i<this.gridUsersData.length; i++){
        this.UserArr.push(this.gridUsersData.OPTM_USERCODE);
      }
    }
    else{
    this.selectalluser = false;
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

  SaveRecord(){

    this.loading = true;
    let gridView = this.gridViewData;
    let finalData = [];
    let tenant = this.TenantId;

    for(let i=0; i< gridView.length; i++){

      this.ProductArr.filter(function(data){
        if(data.Product == gridView[i].OPTM_PRODCODE){
          let map = {};
          map['Product'] = gridView[i].OPTM_PRODCODE;
          map['License'] = gridView[i].EXTNCODE;
          map['Tenant'] = tenant;
          

          finalData.push(map);
        }
      })

    }

    this.licAsgnmt.SaveTenant(this.arrConfigData[0].optiProTLAURL,finalData, this.UserArr).subscribe(
      data => {
        if(data.length > 0){
            for(let i=0; i<data.length; i++){
              this.toastrService.danger(data[i].Message + ' in ' + data[i].Product);
            }
        }
          else{
            this.toastrService.success("Record saved succesfully");
          }
        
       
        this.gridViewData = this.gridProductsData;
        this.TenantId = '';
        this.getProductsList();
        this.getUsersList('');
        this.setUncheckCheckbox();
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

}
