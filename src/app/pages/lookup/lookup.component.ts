import { Component, OnInit, setTestabilityGetter, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { GridComponent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { ColumnSetting } from 'src/app/Data/CommonData';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss']
})
export class LookupComponent implements OnInit {
  @ViewChild("lookupsearch") _el: ElementRef;
  @Input() serviceData: any;
  @Input() lookupfor: any;
  @Input() fillLookupArray: any;
  @Input() selectedImage: any
  @Output() lookupvalue = new EventEmitter();
  @Output() lookupkey = new EventEmitter();
  @Input() ruleselected: any;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  public table_head: ColumnSetting[] = [];
  dialogOpened: boolean = true;
  lookupTitle: string;
  pagable: boolean = false;
  pagesize: number;
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  grid: any;
  showSelection: boolean = false;
  selectedValues: Array<any> = [];
  public mySelection: number[] = [];

  constructor(private router: Router) {}

  close_dialog() {
    this.dialogOpened = false;
  }

  public state: State = {
    skip: 0,
    take: 5,
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
  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }
  clearFilter(grid: GridComponent) {
    this.clearFilters()
  }
  ngOnInit() {
  }


  async ngOnChanges(): Promise<void> {

    if (this.lookupfor == "showCompleteLookup") {
      this.showCompleteLookup();
    } else if (this.lookupfor == "showIssuedLookup") {
       this.showIssuedLookup();
    } else if (this.lookupfor == "showOnOrderLookup") {
      this.showOnOrderLookup();
    } 
    else if(this.lookupfor == "showInStockLookup"){
      this.showInStockLookup();
    }
    this.clearFilters();
    this.isColumnFilter = false
  }

  showCompleteLookup() {
    this.table_head = [
      {
        field: 'SNO',
        title: '#',
        type: 'text',
        width: '20'
      },
      {
        field: 'OPTM_BTCHSERNO',
        title: 'Serial/Batch No.',
        type: 'text',
        width: '100'
      },
      {
        field: 'OPTM_QUANTITY',
        title: 'Quantity Accepted',
        type: 'text',
        width: '100',
        class: 'text-right'
      },
      {
        field: 'REJECTEDQTY',
        title: 'Quantity Rejected',
        type: 'text',
        width: '100',
        class: 'text-right'
      }
      
    ];
    this.lookupTitle = 'Quantity Complete';
    if (this.serviceData !== undefined) {
      if (this.serviceData.length > 0) {
        this.dialogOpened = true;
      }
    }
  }

  showInStockLookup(){
    this.table_head = [
      {
        field: 'SNO',
        title: '#',
        type: 'text',
        width: '20'
      },
      {
        field: 'BATCHSERNO',
        title: 'Serial/Batch No.',
        type: 'text',
        width: '100'
      },
      {
        field: 'WhsCode',
        title: 'Issue Warehouse',
        type: 'text',
        width: '100'
      },
      
      {
        field: 'QUANTITY',
        title: 'Quantity',
        type: 'text',
        width: '100',
        class: 'text-right'
      }
      
    ];
    this.lookupTitle = 'In Stock';
    if (this.serviceData !== undefined) {
      if (this.serviceData.length > 0) {
        this.dialogOpened = true;
      }
    }
  }


  showIssuedLookup() {
    this.table_head = [
      {
        field: 'SNO',
        title: '#',
        type: 'text',
        width: '20'
      },
      {
        field: 'DistNumber',
        title: 'Serial/Batch No.',
        type: 'text',
        width: '100'
      },
      {
        field: 'Warehouse',
        title: 'Issue Warehouse',
        type: 'text',
        width: '100'
      },
      {
        field: 'BinCode',
        title: 'Issue Bin',
        type: 'text',
        width: '100'
      },
      {
        field: 'Quantity',
        title: 'Issue Quantity',
        type: 'text',
        width: '100',
        class: 'text-right'
      }
      
    ];
    this.lookupTitle = 'Quantity Issued';
    if (this.serviceData !== undefined) {
      if (this.serviceData.length > 0) {
        this.dialogOpened = true;
      }
    }
  }

  showOnOrderLookup() {
    this.table_head = [
      {
        field: 'DOCNUM',
        title: 'PO#',
        type: 'text',
        width: '100'
      },
      {
        field: 'VENDOR',
        title: 'Vendor',
        type: 'text',
        width: '100'
      },
      {
        field: 'WHCODE',
        title: 'Warehouse',
        type: 'text',
        width: '100'
      },
      {
        field: 'UOM',
        title: 'UOM',
        type: 'text',
        width: '100'
      },
      {
        field: 'ORDERED_QTY',
        title: 'Quantity Ordered',
        type: 'text',
        width: '100',
        class: 'text-right'
      },
      {
        field: 'RECEIVE_QTY',
        title: 'Quantity Received',
        type: 'text',
        width: '100',
        class: 'text-right'
      },
      {
        field: 'RECV_DATE',
        title: 'Receive Date',
        type: 'text',
        width: '100'
        //format: '{0: MM/dd/yyyy}'
      }
      
    ];
    this.lookupTitle = 'Quantity On Order';
    if (this.serviceData !== undefined) {
      if (this.serviceData.length > 0) {
        this.dialogOpened = true;
      }
    }
  }

  
  on_item_select(selection) {
    if (!this.showSelection) {
      const lookup_key = selection.selectedRows[0].dataItem;
      //console.log("lookup_key - " + lookup_key);
      // console.log(lookup_key);
      this.lookupkey.emit(lookup_key);
      this.lookupvalue.emit(Object.values(lookup_key));
      //  console.log(selection);
      selection.selectedRows = [];
      selection.index = 0;
      selection.selected = false;
      this.serviceData = [];
      this.dialogOpened = false;
    }
  }



  onCheckboxClick(checked: any, index: number) {

    let servivceItem: any = this.serviceData[index];
    if (checked) {
      this.selectedValues.push(servivceItem);
    }
    else {
      // let rixd: number= this.selectedValues.findIndex(i => i.LOTNO == servivceItem.LOTNO && i.LOTNO == servivceItem.BINNO)
      this.selectedValues = this.selectedValues.splice(index, 1);
    }
  }




  Done() {
    this.lookupkey.emit(this.selectedValues);
    this.dialogOpened = false;
  }


}
