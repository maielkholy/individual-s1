import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FoodService } from './food.service'
@Component({
  selector: 'app-food',
  template: '<ng2-smart-table [settings]="settings" [source]="data" (createConfirm)="onCreateCall($event)" (editConfirm)="onEditCall($event)" (deleteConfirm)= onDeleteCall($event) ></ng2-smart-table>',
  providers: [FoodService]
})

export class FoodComponent implements OnInit {
  settings = {

    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    delete:{
      confirmDelete:true,
    },
    columns: {

      name: {
        title: 'mai Name'
      },
      price: {
        title: 'Price'
      },
      createdAt: {
        title: 'Created At'
      },
      seller: {
        title: 'Seller'
      },
      component: {
        title: 'Component'
      },
      _id: {
        title: 'id',
        show: false
      },
    }
  };

  data = [];
  constructor(private foodService:FoodService){

  }
  onCreateCall(event){
       event.confirm.resolve(event.newData);
       this.foodService.createmai(event.newData.name, event.newData.price,event.newData.seller,event.newData.component).subscribe();
  }
  onEditCall(event){
       event.confirm.resolve(event.newData);
       this.foodService.updatemai(event.newData._id ,event.newData.name, event.newData.price,event.newData.seller,event.newData.component).subscribe();
  }
  onDeleteCall(event){
    event.confirm.resolve(event.data);
    this.foodService.deletemai(event.data._id).subscribe();
    
  }
  ngOnInit() {
    this.foodService.getmais().subscribe(
      (res: any) => {
        console.log(res)
        if(res.hasOwnProperty('data'))
        this.data = res.data;
      }
    );
   }


}
