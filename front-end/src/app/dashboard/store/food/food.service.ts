import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class FoodService {

  constructor(private httpClient: HttpClient) { }

  createmai(name:string, price:number,sellerName:string , comp: string) {
    return this.httpClient.post(environment.apiUrl + 'mai/createmai', {'name':name, 'price':price,'sellerName':sellerName,'comp':comp});
  }

  getmais(){
    return this.httpClient.get(environment.apiUrl + 'mai/getmais');
  }

  updatemai(pid: object,name:string, price:number,sellerName:string, comp: string ) {
    return this.httpClient.patch(environment.apiUrl + 'mai/updatemai/'+pid, {'name':name,'price':price,'sellerName':sellerName,'comp':comp});
  }

deletemai(pid:object){
  return this.httpClient.delete(environment.apiUrl +'mai/deletemai/' +pid );
}
}
