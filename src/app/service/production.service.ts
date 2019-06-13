import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  constructor(private httpClient : HttpClient) {
   }

   httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept':'application/json'
      })
  };

  GetItemExplosionData(optiProDashboardAPIURL:string,CompanyDBID:string,ItemFrom:string,ItemTo:string,SelectionCriteria:string,
    FromDate:Date, ToDate:Date):Observable<any>{
     
    let jObject:any={ GetData: JSON.stringify([{ 
      CompanyDBID: CompanyDBID,
      ItemFrom: ItemFrom,
      ItemTo: ItemTo,
      SelectionCriteria: SelectionCriteria  ,
      FromDate: FromDate,
      ToDate: ToDate      
  }]) };
  return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetFinishedGoodsList",jObject,this.httpOptions);
 } 
 
 GetWorkOrderFG(optiProDashboardAPIURL:string,CompanyDBID:string,Item:string,SelectionCriteria:string,WOStatus:string,FromDate:Date, ToDate:Date):Observable<any>{

  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    ItemCode: Item,
    SelectionCriteria: SelectionCriteria,
    WOStatus: WOStatus,
    FromDate: FromDate,
    ToDate: ToDate
}]) };
return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetWorkOrderofFinishedGoods",jObject,this.httpOptions);
} 

GetMaterialData(optiProDashboardAPIURL:string,CompanyDBID:string,DocEntry:string,SelectionCriteria:string,ItemCode:string, FromDate:Date, ToDate:Date,WOStatus:string):Observable<any>{
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    DocEntry: DocEntry,
    SelectionCriteria: SelectionCriteria,
    ItemCode: ItemCode,   
    FromDate: FromDate,
    ToDate: ToDate,
    WOStatus: WOStatus 
}]) };
return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetMaterialData",jObject,this.httpOptions);
} 

GetOperationData(optiProDashboardAPIURL:string,CompanyDBID:string,DocEntry:string):Observable<any>{
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    DocEntry: DocEntry
    
}]) };
return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetOperationData",jObject,this.httpOptions);
} 

GetResourceData(optiProDashboardAPIURL:string,CompanyDBID:string,DocEntry:string):Observable<any>{
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    DocEntry: DocEntry
    
}]) };
return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetResourceData",jObject,this.httpOptions);
} 


GetCompletedQtyDetails(optiProDashboardAPIURL:string,CompanyDBID:string,WONumber:string):Observable<any>{
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    WONumber: WONumber
    
}]) };
return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetCompletedQtyDetails",jObject,this.httpOptions);
} 

GetIssuedQtyDetails(optiProDashboardAPIURL:string,CompanyDBID:string,ItemCode:string,DocEntry:string):Observable<any>{
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    ItemCode: ItemCode,
    DocEntry:DocEntry
    
}]) };
return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetIssuedQtyDetails",jObject,this.httpOptions);
} 

GetOnOrderQtyDetails(optiProDashboardAPIURL:string,CompanyDBID:string,ItemCode:string):Observable<any>{
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    ItemCode: ItemCode
    
}]) };
return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetOnOrderQtyDetails",jObject,this.httpOptions);
} 

GetWarehouseWiseOnOrderQtyDetails(optiProDashboardAPIURL:string,CompanyDBID:string,ItemCode:string,Warehouse:string):Observable<any>{
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    ItemCode: ItemCode,
    Warehouse: Warehouse    
}]) };
return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetWarehouseWiseOnOrderQtyDetails",jObject,this.httpOptions);
}

GetWarehouseWiseInStockQtyDetails(optiProDashboardAPIURL:string,CompanyDBID:string,ItemCode:string,Warehouse:string,ItemType:string):Observable<any>{
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    ItemCode: ItemCode,
    Warehouse: Warehouse,
    ItemType:ItemType    
}]) };
return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetWarehouseWiseInStockQtyDetails",jObject,this.httpOptions);
}

GetInStockQtyDetails(optiProDashboardAPIURL:string,CompanyDBID:string,ItemCode:string,ItemType:string):Observable<any>{
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    ItemCode: ItemCode,    
    ItemType: ItemType    
}]) };
return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetInStockQtyDetails",jObject,this.httpOptions);
}

}
