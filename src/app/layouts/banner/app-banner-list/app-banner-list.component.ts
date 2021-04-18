import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-app-banner-list',
  templateUrl: './app-banner-list.component.html',
//   styleUrls: ['./app-banner-list.component.css']
})

export class AppBannerListComponent implements OnInit {
 
   bannersList=[];
   constructor(public api:ApiService,private router:Router, private http:HttpClient){}
 
   ngOnInit() {
    this.api.getBanners().subscribe(res=>{
     this.bannersList = res['response'];
     console.log(this.bannersList);
    })
   }
   
   edit(id){
   //   this.api.getBannersById(id).subscribe(res=>{
   //     console.log(res);
       this.router.navigate(['create-banner',id,'edit']);
   //   })
   }
 
   delete(id){
      this.api.removeBanners(id).subscribe(res=>{console.log(res); this.ngOnInit();});
     
   }

   getStatus(data){
      if(data==0)
         return "Active";
      else
         return "Not Active";
   }
}
