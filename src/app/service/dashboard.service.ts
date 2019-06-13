import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept':'application/json'
      })
    };

    GetItemList(optiProDashboardAPIURL:string,CompanyDBID:string,PrcrmntMtd:string): Observable<any>{
      let jObject:any={ ItemList: JSON.stringify([{ 
       CompanyDBID: CompanyDBID,
       PrcrmntMtd: PrcrmntMtd
      }])};
      return this.httpClient.post(optiProDashboardAPIURL +"/Dashboard/GetItemList",jObject,this.httpOptions);
    }

    GetWarehouseList(optiProDashboardAPIURL:string,CompanyDBID:string): Observable<any>{
      let jObject:any={ ItemList: JSON.stringify([{ 
       CompanyDBID: CompanyDBID
      }])};
      return this.httpClient.post(optiProDashboardAPIURL +"/Dashboard/GetWarehouseList",jObject,this.httpOptions);
    }

    GetLotNumber(optiProDashboardAPIURL:string,CompanyDBID:string,ItemKey:string,TrackName:string): Observable<any>{
      let jObject:any={ ItemList: JSON.stringify([{ 
       CompanyDBID: CompanyDBID,
       ItemKey: ItemKey,
       TrackName: TrackName
      }])};
      return this.httpClient.post(optiProDashboardAPIURL +"/Dashboard/GetLotNumber",jObject,this.httpOptions);
    }

    GetTransaction(optiProDashboardAPIURL:string,CompanyDBID:string,ItemKey:string,Warehouse:string,SelectionCriteria:string,ExplosionType:string): Observable<any>{
      let jObject:any={ ItemList: JSON.stringify([{ 
       CompanyDBID: CompanyDBID,
       ItemKey: ItemKey,
       Warehouse:Warehouse,
       SelectionCriteria : SelectionCriteria,
       ExplosionType: ExplosionType
      }])};
      return this.httpClient.post(optiProDashboardAPIURL +"/Dashboard/GetTransaction",jObject,this.httpOptions);
    }

    GetTransactionDetails(optiProDashboardAPIURL:string,CompanyDBID:string,DocEntry:string,ObjType:string,ItemKey:string,Warehouse:string): Observable<any>{
      let jObject:any={ ItemList: JSON.stringify([{ 
       CompanyDBID: CompanyDBID,
       DocEntry: DocEntry,
       ObjType: ObjType,
       ItemKey: ItemKey,
       Warehouse: Warehouse
      }])};
      return this.httpClient.post(optiProDashboardAPIURL +"/Dashboard/GetTransactionDetails",jObject,this.httpOptions);
    }


    GetLotExplosionData(optiProDashboardAPIURL:string,CompanyDBID:string,ItemKey:string,Warehouse:string,LotFrom:string,LotTo:string,Mode:string,SelectionCriteria:string,TrackName:string,ExplosionBasedOn:string):Observable<any>{
      let jObject:any={ GetData: JSON.stringify([{ 
        CompanyDBID: CompanyDBID,
        ItemKey: ItemKey,
        Warehouse: Warehouse,
        LotFrom: LotFrom,
        LotTo: LotTo,
        Mode: Mode,
        SelectionCriteria: SelectionCriteria  ,
        TrackName:TrackName,
        ExplosionBasedOn: ExplosionBasedOn    
    }]) };
    return this.httpClient.post(optiProDashboardAPIURL +"/Dashboard/GetLotExplosionData",jObject,this.httpOptions);
    }       
}