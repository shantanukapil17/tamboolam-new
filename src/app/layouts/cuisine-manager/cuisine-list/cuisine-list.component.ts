import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-cuisine-list',
  templateUrl: './cuisine-list.component.html',
//   styleUrls: ['./cuisine-list.component.css']
})
export class CuisineListComponent implements OnInit {
  
  cuisineList=[];
  constructor(public api:ApiService,private router:Router, private http:HttpClient){}

  ngOnInit() {
   this.api.getCuisine().subscribe((res:any)=>{
    this.cuisineList = res.response.result;
    console.log(res.response.result);
   })
  }
  
  edit(id){
    // this.api.updateCuisineById(id).subscribe(res=>{
    //   console.log(res);
      this.router.navigate(['cuisine-addition',id,'edit']);
    // })
  }

  delete(id){
    this.api.removeCuisine(id).subscribe(res=>{console.log(res); this.ngOnInit();});
  }
   

}
