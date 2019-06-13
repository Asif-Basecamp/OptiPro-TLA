import { HttpClient } from '@angular/common/http';



export interface ColumnSetting {

    field: string;

    title: string;

    format?: string;

    type: 'text' | 'numeric' | 'boolean' | 'date';

    width?: string;

    headerClass?: string;

    class?: string;

}

export class CommonData {
    public href: any = window.location.href;
    public adminDBName: string = "OPTIPROADMIN";
    public productCode: string = "DSB";

    //This will get the path of app
    public get_current_url() {
        let temp: any = this.href.substring(0, this.href.lastIndexOf('/'));
        if (temp.lastIndexOf('#') != '-1') {
            temp = temp.substring(0, temp.lastIndexOf('#'));
        }
        return temp;
    }


}