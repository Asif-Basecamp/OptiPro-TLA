import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() { }
// Declaration
private commonDataFrom = new Subject<any>();
commonDataFrom$ = this.commonDataFrom.asObservable();

// Methods
public ShareDataFrom(data: any) {
  this.commonDataFrom.next(data);
}

// Declaration
private commonDataTo = new BehaviorSubject<any>(null);
commonDataTo$ = this.commonDataTo.asObservable();

// Methods
public ShareDataTo(data: any) {
  this.commonDataTo.next(data);
}

}
