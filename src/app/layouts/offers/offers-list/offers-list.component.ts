import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
//   styleUrls: ['./offers-list.component.css']
})

export class OffersListComponent implements OnInit {
 
 
  offersList:any;
  constructor(public api:ApiService,private router:Router, private http:HttpClient){}

  ngOnInit() {
   this.api.getCoupons().subscribe(res=>{
    this.offersList = res['response'];
    console.log(this.offersList);
   })
  }
  
  edit(id){
    this.api.getCouponById(id).subscribe(res=>{
      console.log(res);
      this.router.navigate(['create-offers',id,'edit']);
    })
  }

  delete(id){
    this.api.removeCoupon(id).subscribe(res=>console.log(res));
    this.ngOnInit();
  }




}
