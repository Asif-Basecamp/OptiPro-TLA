import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  constructor(private httpClient : HttpClient) {
  }

  httpOptions = {
   headers: new HttpHeaders({
   'Content-Type':  'application/json',
   'Accept':'application/json'
     })
 };

GetCompanyList(optiProTLAURL:string):Observable<any>{
   
  let jObject:any={ ItemList: JSON.stringify([{ 
    CompanyDBID: '',
  }]) };
return this.httpClient.post(optiProTLAURL +"LicenseAssignment/GetCompanyList",jObject,this.httpOptions);
} 

GetProductsList(optiProTLAURL:string):Observable<any>{
   
  let jObject:any={ ItemList: JSON.stringify([{ 
    CompanyDBId: ''
  }]) };
return this.httpClient.post(optiProTLAURL +"LicenseAssignment/GetProductsList",jObject,this.httpOptions);
}

GetUserList(optiProTLAURL:string,TenantKey:string):Observable<any>{
   
  let jObject:any={ ItemList: JSON.stringify([{ 
    TenantKey: TenantKey
  }]) };
return this.httpClient.post(optiProTLAURL +"LicenseAssignment/GetUserList",jObject,this.httpOptions);
}

GetUserbyProductList(optiProTLAURL:string,CompanyDBID:string):Observable<any>{
   
  let jObject:any={ ItemList: JSON.stringify([{ 
    CompanyId: CompanyDBID,
    Products: 'CNF'
  }]) };
return this.httpClient.post(optiProTLAURL +"LicenseAssignment/GetUserbyProductList",jObject,this.httpOptions);
}

GetTenantList(optiProTLAURL:string):Observable<any>{
   
  let jObject:any={ ItemList: JSON.stringify([{ 
    CompanyId: ''
  }]) };
return this.httpClient.post(optiProTLAURL +"LicenseAssignment/GetTenantList",jObject,this.httpOptions);
}


GetTenantListByName(optiProTLAURL:string,Tenant:string):Observable<any>{
   
  let jObject:any={ ItemList: JSON.stringify([{ 
    Tenant:Tenant
    }]) };
return this.httpClient.post(optiProTLAURL +"LicenseAssignment/GetTenantListByName",jObject,this.httpOptions);
}


SaveTenant(optiProTLAURL:string,ProductArr:any[],UserArr:any[]):Observable<any>{
   
  // let jObject:any={ ItemList: JSON.stringify([{ 
  //   ProductArray: ProductArr
  // }]),

  // GetData: JSON.stringify([{ 
  //   UserArray: UserArr   
  // }]) };

  let jObject:any={ ItemList: JSON.stringify(ProductArr),

  GetData: JSON.stringify(UserArr)};


return this.httpClient.post(optiProTLAURL +"LicenseAssignment/SaveTenantList",jObject,this.httpOptions);
}

}
