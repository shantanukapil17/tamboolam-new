import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
//   styleUrls: ['./restaurant-list.component.css']
})

export class RestaurantListComponent implements OnInit {
 
  restaurantList:any = [];
  constructor(public api:ApiService,private router:Router, private http:HttpClient){}

  ngOnInit() {
   this.api.getAllRestaurants().subscribe(res=>{
    this.restaurantList = res;
   })
  }
  
  edit(id){
    this.api.getRestaurantById(id).subscribe(res=>{
      console.log(res);
      this.router.navigate(['restaurant-addition',id,'edit']);
    })
  }

  delete(id:any){
    this.api.deleteRestaurant(id).subscribe((res:any)=> {
      this.api.getAllRestaurants().subscribe(res=>{
        this.restaurantList = res;
       })
    })
  }

}
