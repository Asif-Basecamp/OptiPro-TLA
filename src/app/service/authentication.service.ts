import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept':'application/json'
      })
    };


  //Get psURL
  getPSURL(optiProDashboardAPIURL:string,CompanyDBID:string):Observable<any>{
    //JSON Obeject Prepared to be send as a param to API
    let jObject: any = { PSURL: JSON.stringify([{ CompanyDBID: CompanyDBID }]) };
    //Return the response form the API  
    return this.httpClient.post(optiProDashboardAPIURL + "/Login/GetPSURL", jObject, this.httpOptions);  
  }

  login(loginId:string,password:string,psURL:string):Observable<any>{
    //JSON Obeject Prepared to be send as a param to API
    let jObject:any={ Login: JSON.stringify([{ User: loginId, Password: password, IsAdmin: false }]) };
  //Return the response form the API  
  return this.httpClient.post(psURL+"/api/login/ValidateUserLogin",jObject,this.httpOptions);
  }

  //This function will get Company acc. to User
  getCompany(loginId:string,psURL:string):Observable<any>{
    //JSON Obeject Prepared to be send as a param to API
    let jObject:any={ Username: JSON.stringify([{ Username: loginId ,Product: "DSB"}]) };
    //Return the response form the API  
    return this.httpClient.post(psURL+"/api/login/GetCompaniesAndLanguages",jObject,this.httpOptions)
  }

}
