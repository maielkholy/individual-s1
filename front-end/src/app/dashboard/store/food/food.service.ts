import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class FoodService {

  constructor(private httpClient: HttpClient) { }

  createmai(name:string, price:number,seller:string , component: string) {
    return this.httpClient.post(environment.apiUrl + 'mai/createmai', {'name':name, 'price':price,'seller':seller,'component':component});
  }

  getmais(){
    return this.httpClient.get(environment.apiUrl + 'mai/getmais');
  }

  updatemai(pid: object,name:string, price:number,seller:string, component: string ) {
    return this.httpClient.patch(environment.apiUrl + 'mai/updatemai/'+pid, {'name':name,'price':price,'seller':seller,'component':component});
  }

deletemai(pid:object){
  return this.httpClient.delete(environment.apiUrl +'mai/deletemai/' +pid );
}
}
