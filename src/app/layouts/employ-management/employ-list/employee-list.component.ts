import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
//   styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
 
  employeeList:any;
  constructor(public api:ApiService,private router:Router, private http:HttpClient){}

  ngOnInit() {
   this.api.getPeopleDetails().subscribe(res=>{
    this.employeeList = res['response'][0].manager;
    console.log(res['response'][0]);
   })
  }
  
  edit(id){
    this.api.getPeopleDetailsById(id).subscribe(res=>{
      console.log(res);
      console.log(id);
      this.router.navigate(['add-employee',id,'edit']);
    })}

 
  delete(id){
    console.log(id);
     this.api.removePeopleDetails(id).subscribe(res=>{console.log(res)},err=>console.log(err));
     this.ngOnInit();
  }

}
