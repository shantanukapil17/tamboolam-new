import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';



@Component({
  selector: 'app-delivery-person-list',
  templateUrl: './delivery-person-list.component.html',
  styleUrls: ['./delivery-person-list.component.css']
})

export class DeliveryPersonListComponent implements OnInit {
 
  deliveryPersonList:any=[];
  optionsList:any; 
  constructor(public api:ApiService,private router:Router, private http:HttpClient){}
 
   ngOnInit() {
    this.api.getDeliveryPersonData(
      {
        params: {
          user_type:'driver'
        } 
      }).subscribe((res:any)=>{
      this.deliveryPersonList = res.response.result;
     })
    // this.api.getDriversDetails().subscribe(res=>{
    //  this.deliveryPersonList = res['response'];
    //  this.optionsList=this.deliveryPersonList;
    //  console.log(res);
    // })
   }
   
   edit(id){
    //  this.api.getDriversDetailsById(id).subscribe(res=>{
    //    console.log(res);
    //    console.log(id);
       this.router.navigate(['add-delivery-person',id,'edit']);
    //  })
    }
 
  
   delete(id){
      this.api.removedeliveryPersonDetails(id).subscribe(res=>{console.log(res)},err=>console.log(err));
      this.ngOnInit();
   }
 
   setList(id){
    this.api.getDriversDetailsById(id).subscribe((res:{code,status,response})=>this.deliveryPersonList=res.response);
   }
}
