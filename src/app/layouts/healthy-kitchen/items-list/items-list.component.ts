import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
//   styleUrls: ['./items-list.component.css']
})
export class HealthyItemsListComponent implements OnInit {

  itemsList:any;
  constructor(public api:ApiService,private router:Router, private http:HttpClient){}

  ngOnInit() {
   this.api.getHealthyKitchenItems().subscribe(res=>{
    this.itemsList = res['response'];
    console.log(this.itemsList);
   })
  }
  
  edit(id){
    this.api.getHealthyKitchenItemsById(id).subscribe(res=>{
      console.log(res);
      this.router.navigate(['healthy-kitchen/add-items',id,'edit']);
    })
  }

  navigate(){
    this.router.navigate(['healthy-kitchen/add-items']);
  }

  
  delete(id){
    this.api.removeHealthyKitchenItems(id).subscribe(res=>console.log(res));
    this.ngOnInit();
  }



}
