import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit{
    
  list=[];
  categoryList:any=[];
  
  constructor(public api:ApiService,private router:Router, private http:HttpClient){}

  ngOnInit() {
   this.api.getFaq().subscribe(res=>{
    this.list = res['response'];
    console.log(this.list);
   });

   this.api.getFaqCat().subscribe((res:{code,status,response})=>{
    console.log(res);
    this.categoryList=res.response;
  });

  }
  
  edit(id){
    this.api.getFaqById(id).subscribe(res=>{
      console.log(res);
      this.router.navigate(['faq/edit',id]);
    })
  }

  delete(id){
    this.api.removeFaq(id).subscribe(res=>{console.log(res);
      this.ngOnInit();});
  }

  setList(id){
    this.api.getFaq().subscribe(res=>{
      this.list = res['response'];
      console.log(this.list); 
      let list=[];
      for(let items of this.list){
        if(items.faq_cat_id==id){
          list.push(items);
        }
      }
      this.list=[];
      this.list=list;
     });
   
  }
  

}