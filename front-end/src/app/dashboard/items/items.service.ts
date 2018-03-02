import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ItemsService {

  constructor(private httpClient: HttpClient) { }

  createmai(name:string, price:number) {
    return this.httpClient.post(environment.apiUrl + 'mai/createmai', {'name':name, 'price':price});
  }

  // getmais(){
  //   return this.httpClient.get(environment.apiUrl + 'mai/getmais');
  // }

}
