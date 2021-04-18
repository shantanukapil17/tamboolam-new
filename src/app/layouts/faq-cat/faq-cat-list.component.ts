import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-faq-cat',
  templateUrl: './faq-cat-list.component.html',
//   styleUrls: ['./faq-cat.component.css']
})

export class FaqCatComponent implements OnInit {
   List=[];
   constructor(public api:ApiService,private router:Router, private http:HttpClient, public route:ActivatedRoute){}
 
   ngOnInit() {
    this.api.getFaqCat().subscribe(res=>{
        this.List = res['response'];
        console.log(res);
    }); 

   
   }
   
   edit(id){
     this.api.getFaqCatById(id).subscribe(res=>{
       console.log(res);
       this.router.navigate(['edit',id],{relativeTo:this.route});
     })
   }
 
   delete(id){
    // this.api.removeFaqCat(id).subscribe(res=>{console.log(res);this.ngOnInit();});
    
   }

   
 
}
