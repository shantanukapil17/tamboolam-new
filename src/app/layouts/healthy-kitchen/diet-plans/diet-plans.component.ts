import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-diet-plans',
  templateUrl: './diet-plans.component.html',
//   styleUrls: ['./diet-plans.component.css']
})
export class HealthyDietPlansComponent implements OnInit {
  itemsList:any;
  constructor(public api:ApiService,private router:Router, private http:HttpClient){}

  ngOnInit() {
   this.api.getHealthyKitchenDietPlan().subscribe(res=>{
    this.itemsList = res['response'];
    console.log(res);
   })
  }
  
  edit(id){
    this.api.getHealthyKitchenDietPlanById(id).subscribe(res=>{
      console.log(res);
      this.router.navigate(['healthy-kitchen/add-diet-plans',id,'edit']);
    })
  }

  delete(id){
    this.api.removeHealthyKitchenDietPlan(id).subscribe(res=>console.log(res));
    this.ngOnInit();
  }


  navigate(){
    this.router.navigate(['healthy-kitchen/add-diet-plans']);
  }
}
