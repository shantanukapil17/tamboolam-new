import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
//   styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  
 
  categoryList=[];
  constructor(public api:ApiService,private router:Router, private http:HttpClient){}

  ngOnInit() {
   this.api.getCategory().subscribe((res:any)=>{
    this.categoryList = res.response.result;
   })
  }
  
  edit(id){
    // this.api.getCategoryById(id).subscribe(res=>{
    //   console.log(res);
      this.router.navigate(['category-addition',id,'edit']);
    // })
  }

  delete(id:any){
    this.api.deleteCategory(id).subscribe(res=>{console.log(res); this.ngOnInit();});
  }

}
