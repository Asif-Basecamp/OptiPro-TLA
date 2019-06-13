import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CommonData } from "src/app/Data/CommonData";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  private commonData = new CommonData();
  public language: any = [];
  public fileURL = this.commonData.get_current_url();
  public psURL: string = "";
  public adminDBName = this.commonData.adminDBName;
  public arrConfigData: any[];
  public loginId: string;
  public password: string;
  public modelSource: any = [];
  public assignedCompanies: any = [];
  public clickSignIn: boolean = true;
  public defaultCompnyComboValue: any = [];
  public listItems: any = [] = this.defaultCompnyComboValue;
  public selectedValue: any = [];
  public InvalidActiveUser: boolean = false;
  public loading: boolean = false;
  public  selectedItemNgModel: any ;

  constructor(private auth:AuthenticationService,private httpClientSer: HttpClient,private router: Router,private toastrService: NbToastrService) {}
  
  ngOnInit() {
     if (window.localStorage.getItem('Username') != null || window.localStorage.getItem('Username') != undefined) {
        this.router.navigateByUrl('/pages');
     }

    const element = document.getElementsByTagName("body")[0];
    element.classList.add("opti_body-login");
    element.classList.add("opti_account-module");   

    this.httpClientSer.get(this.fileURL + '/assets/configuration.json').subscribe(
      data => {
        this.arrConfigData = data as string[];
        window.localStorage.setItem('arrConfigData', JSON.stringify(this.arrConfigData[0]));
        this.loadLanguage(this.arrConfigData[0].language);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  public loadLanguage(langParam) {
    this.httpClientSer.get(this.fileURL + '/assets/i18n/' + langParam + '.json').subscribe(
      data => {
        window.localStorage.setItem('language', JSON.stringify(data));
        this.language = JSON.parse(window.localStorage.getItem('language'));
        this.getPSURL();
      },
      error => {
        this.toastrService.danger(this.language.error_reading_file);
      }
    );
  }
  
  getPSURL() {
    this.auth.getPSURL(this.arrConfigData[0].optiProDashboardAPIURL,this.adminDBName).subscribe(
      data => {
        if (data != null) {
         // this.psURL = data;
         this.psURL = 'http://172.16.6.140/OptiADMINHANA';
        }
      },
      error => {
        this.toastrService.danger(this.language.error_some_error);
      }
    )
  }


  onPasswordBlur(){
      if (this.loginId == "" ||  this.loginId == undefined || this.password == "" || this.password == undefined) {
        return;
      }
      
      else{

      this.auth.login(this.loginId, this.password, this.psURL).subscribe(
        data => {
          this.modelSource = data;

          if (this.modelSource != null && this.modelSource.Table.length > 0 && this.modelSource.Table[0].OPTM_ACTIVE == 1) {
            this.getCompanies();
            
          }
          else{
            this.listItems = this.defaultCompnyComboValue;
            this.selectedValue = this.listItems[0];
            this.toastrService.danger(this.language.password_incorrect);
          }       
        },
        error => {
        }       
      );   
      }
    }

    getCompanies(){
      this.auth.getCompany(this.loginId, this.psURL).subscribe(
        data =>
        {
          this.modelSource = data;
          if (this.modelSource != undefined && this.modelSource != null && this.modelSource.Table.length > 0)
          {
            this.assignedCompanies = data.Table; 
            this.clickSignIn = false; 
            this.listItems = this.assignedCompanies;
           this.selectedValue = this.listItems[0];
           this.InvalidActiveUser = false;
          }
          else {
            this.toastrService.danger(this.language.error_no_company_assigned);
            this.InvalidActiveUser = true;
          }           
        }
      )
    }  

    OnSignIn(){
      this.router.navigateByUrl('/pages');
      this.loading = true;
      window.localStorage.setItem('CompanyDB', JSON.stringify(this.selectedItemNgModel));
      window.localStorage.setItem('Username', JSON.stringify(this.loginId));
      window.localStorage.setItem('Userpwd', JSON.stringify(this.password));
    }
   
}
