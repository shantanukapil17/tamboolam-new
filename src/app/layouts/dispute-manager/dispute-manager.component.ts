import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-dispute-manager',
  templateUrl: './dispute-manager.component.html',
//   styleUrls: ['./dispute-manager.component.css']
})
export class DisputeManagerComponent implements OnInit {
  
  cancelledOrderList;

  showSelectedOrderIndex:number;
  
  selectedOrderIndex:number;
  selectedOrder;
  
  orderList;
  restaurant_name;
  driver_name;
  constructor(public api:ApiService,private router:Router, private http:HttpClient){}

  ngOnInit() {

    this.api.getCancelOrders().subscribe((res:{code,status,response})=>{
      console.log(res.response);
      this.cancelledOrderList=res.response;
      this.orderList=this.cancelledOrderList;
     
    });

  }

  private selectOrder(index){
    this.selectedOrderIndex=index;
    console.log(this.selectedOrderIndex);
    this.selectedOrder=this.cancelledOrderList[index];
    console.log(this.selectedOrder);
    
    this.api.getRestaurantById(this.selectedOrder.restaurant_id).subscribe((res:{code,status,response})=>{
      console.log(res);
      this.restaurant_name=res.response[0].restaurant_name;
    })

    this.api.getPeopleDetailsById(this.selectedOrder.driver_id).subscribe((res:{code,status,response})=>{
      console.log(res);
      this.driver_name=res.response[0].user_name;      
    })
  }

  private showSelectedOrder(index){
    console.log(index,this.orderList);
    let order=this.cancelledOrderList[index];
    this.orderList=[];
    this.orderList.push(order);
    console.log(this.orderList);
  }
}
