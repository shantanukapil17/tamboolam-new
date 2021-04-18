import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-meal-packages',
  templateUrl: './meal-packages.component.html',
//   styleUrls: ['./meal-packages.component.css']
})
export class HealthyMealPackagesComponent implements OnInit {

  mealList:any;
  constructor(public api:ApiService,private router:Router, private http:HttpClient){}

  ngOnInit() {
   this.api.getHealthyKitchenMealItems().subscribe(res=>{
    this.mealList = res['response'];
    console.log(res);
   },err=>console.log(err))
  }
  
  edit(id){
    this.api.getHealthyKitchenMealItemsById(id).subscribe(res=>{
      console.log(res);
      this.router.navigate(['healthy-kitchen/add-meal-packages',id,'edit']);
    })
  }

  
  delete(id){
    
  }

  navigate(){
    this.router.navigate(['healthy-kitchen/add-meal-packages']);
  }
}
