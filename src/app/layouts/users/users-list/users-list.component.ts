import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
//   styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  
  userList:any;
  List:any;
  constructor(public api:ApiService,private router:Router, private http:HttpClient){}

  ngOnInit() {
   this.api.getUsers().subscribe(res=>{
    this.List = res['response'];
    console.log(res['response']);
   })
  }
  
  view(id){
    this.api.getUsersById(id).subscribe(res=>{
      console.log(res);
      console.log(id);
      this.router.navigate(['users-profile',id,'view']);
    })}



}
