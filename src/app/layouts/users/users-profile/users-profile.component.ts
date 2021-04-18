import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {
  
  total_purchase:number=0;
  orders=[];
  id:number;
  constructor(private fb:FormBuilder,private api:ApiService, private route:ActivatedRoute , private router: Router){}

  ngOnInit(){
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.inItForm();
      })

  }

  private inItForm(){

    let name,address,email,phone;
    
    this.api.getDeliveredOrders().subscribe((res:{code,status,response})=>{
    if(res.response[0].appuser_id==this.id)
    {let Odate=res.response[0].order_date;
     let OItemId=res.response[0].items;
     let Oitem=this.getItem(OItemId);
     console.log(Oitem);
     let Ovalue:number=+res.response[0].payment; 
     this.total_purchase+=Ovalue;
     
        this.orders.push({date:Odate,item:Oitem,value:Ovalue});
        
      }
      console.log(this.orders);
      console.log(res);
    });      
    
    
    this.api.getUsersById(this.id).subscribe((res:{code,status,response})=>{
        name=res.response[0].userdata[0].user_name;
        console.log(res);
        address=res.response[0].address_collection[0].address;
        email=res.response[0].userdata[0].email;
        phone=res.response[0].userdata[0].phone; 
         document.getElementById('name').innerText=name;
         document.getElementById('email').innerText=email;
         document.getElementById('address').innerText=address;
         document.getElementById('phone').innerText=phone;
         document.getElementById('total_purchase').innerText=this.total_purchase.toString();
        });
  
  
  }

  getItem(id){
    let ids:[]=id.split(",");
    let itemsName=[];
    for(let itemId of ids)
    {this.api.getFoodById(itemId).subscribe((res:{code,status,response})=>{
      let name=res.response[0].food_name;
      itemsName.push(name);
    });}
    console.log(itemsName);
    return itemsName;
  }
}
