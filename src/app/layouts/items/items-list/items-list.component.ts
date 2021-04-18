import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
//   styleUrls: ['./items-list.component.css']
})

export class ItemsListComponent implements OnInit {
   restaurantList;
   itemsList:any;
   alItemsList:any;
   constructor(public api:ApiService,private router:Router, private http:HttpClient){}
 
   ngOnInit() {
    this.api.getItems().subscribe((res:any)=>{
     this.itemsList = res.response.result;
      console.log(this.itemsList);
     })

    this.api.getFoods().subscribe(res=>{
     this.itemsList = res['response'];
     this.alItemsList=this.itemsList;
     console.log(this.itemsList);
    })

    this.api.getRestaurant().subscribe(res=>
      this.restaurantList=res['response'])
   }
   
   edit(id){
    //  this.api.getFoodById(id).subscribe(res=>{
    //    console.log(res);
       this.router.navigate(['items-addition',id,'edit']);
    //  })
   }
 
   delete(id){
    this.api.deleteItem(id).subscribe(res=>{console.log(res);this.ngOnInit();});
    
   }

   setList(id){
     this.itemsList=this.alItemsList;
    console.log(id);
     let list=[];
   for(let items of this.itemsList)
    {console.log(items.restaurant_name);
     console.log(id);
      if(id==items.restaurant_name){
        list.push(items);
        console.log(list);
      }
    }
    this.itemsList=[];
    this.itemsList=list;
    console.log(this.itemsList);
  }
 
}
