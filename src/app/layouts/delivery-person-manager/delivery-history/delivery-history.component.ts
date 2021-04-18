import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';



@Component({
  selector: 'app-delivery-history',
  templateUrl: './delivery-history.component.html',
  styleUrls: ['./delivery-history.component.css']
})

export class DeliveryHistoryComponent implements OnInit {
 
   deliveryPersonList=[];
   deliveryList=[];
   restaurantList=[];
   constructor(public api:ApiService,private router:Router, private http:HttpClient){}
 
   ngOnInit() {
    this.api.getDriversDetails().subscribe(res=>{
     console.log(res['response'][0]);
    this.deliveryPersonList=res['response'];
     console.log(this.deliveryPersonList);
    
    });

    this.api.getDeliveredOrders().subscribe((res:{code,status,response})=>{
      console.log(res);
      this.deliveryList=res.response;
      this.getName();
    });


   }

   getName(){
    for (let item of this.deliveryList)
    { console.log(item.restaurant_id);
      this.api.getRestaurantById(item.restaurant_id).subscribe((res:{code,status,response})=>{
        console.log(res);
        this.restaurantList.push(res.response[0].restaurant_name);
      console.log(this.restaurantList);

      },err=>console.log(err))
    }
  }
    
  setList(id){
    console.log(id);
    this.api.getDeliveredOrders().subscribe((res:{code,status,response})=>{
      console.log(res);
      this.deliveryList=res.response;
      this.getName();
      let list=[];
      for(let items of this.deliveryList)
      {
        items.driver_id;
        if(id==items.driver_id){
          list.push(items);
        }
      }
      this.deliveryList=[];
      this.deliveryList=list;  
    
    });
    
    
  }
}
