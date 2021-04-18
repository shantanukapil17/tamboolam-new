
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';

import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-restaurant-addition',
  templateUrl: './restaurant-addition.component.html',
  // styleUrls: ['./restaurant-addition.component.css']
})

export class RestaurantAdditionComponent implements OnInit {
 
  restaurantForm:FormGroup;
  editMode:boolean=false;
  changeLogo:boolean=true;
  id:number;
  logo:any;
  employees:any;
  constructor(private fb:FormBuilder,private api:ApiService, private route:ActivatedRoute , private router: Router){}

  ngOnInit(){
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode= params['id']!=null;
        this.changeLogo=!this.editMode;
        this.inItForm();
      })
      this.api.getRestaurant().subscribe(res=>console.log(res));
      this.api.getPeopleDetails().subscribe((res:{code,status,response})=>
        {
         this.employees=res.response[0].manager;
         console.log(this.employees);});

  }

  private inItForm(){

    let name=null,location=null,email=null,cuisine=null,time=null,rating=null,phone=null;
    let status=null,desc=null , add=null , available=null,closed=null , employ_id:number;
     
    if(this.editMode)
    { console.log(this.id);
      this.api.getRestaurantById(this.id).subscribe((res:{code,status,response})=>{
          status=res.response[0].active_status;
          available=res.response[0].available_for_delivery;
          closed=res.response[0].closed;
          this.logo=res.response[0].image;
          location=res.response[0].location;
          phone=res.response[0].phone;
          rating=res.response[0].rating;
          add=res.response[0].restaurant_address;
          desc=res.response[0].restaurant_decription;
          name=res.response[0].restaurant_name;
          employ_id=res.response[0].user_id;
          console.log(res.response[0]);

          this.restaurantForm = this.fb.group({
            "restaurant_name":[name, [Validators.required]],
            "location":[location,[Validators.required]],
            "employ_id":[employ_id,[Validators.required]],
            "restaurant_desc": [desc,[Validators.required]],
            "rating":[rating,[Validators.required]],
            "phone":[phone,[Validators.required]],
            "status":[status,[Validators.required]],
            "available_delivery":[available,[Validators.required]],
            // "restaurant_logo":[],
            "restaurant_address":[add,[Validators.required]]
          })
            console.log(this.restaurantForm);
        });
    }    

 
    this.restaurantForm = this.fb.group({
      "restaurant_name":[name, [Validators.required]],
      "location":[location,[Validators.required]],
      "employ_id":[employ_id,[Validators.required]],
      "restaurant_desc": [desc,[Validators.required]],
      "rating":[rating,[Validators.required]],
      "phone":[phone,[Validators.required]],
      "status":[status,[Validators.required]],
      "available_delivery":[available,[Validators.required]],
      "restaurant_logo":[this.logo,[Validators.required]],
      "restaurant_address":[add,[Validators.required]]
    })
    console.log(this.restaurantForm);
  }

  
  addIt()
  {console.log(this.restaurantForm); if(this.restaurantForm.valid)
    {this.api.invokeRestaurant(this.getData())
    .subscribe(res=>{
        console.log(res);
        this.router.navigate(['restaurant-list']);
      })}
      
  }	

  saveIt(){
   if(this.restaurantForm.valid) 
  {
    this.api.updateRestaurant(
      this.getData())
    .subscribe(res=>{
        console.log(res);
        this.router.navigate(['restaurant-list']);
        })}
    
  }
  
  getData(){
    
    let data={ 
      active_status:this.restaurantForm.value.status.toString(),
      available_for_delivery:this.restaurantForm.value.available_delivery.toString(),
      closed:this.restaurantForm.value.status=='0'?'1':'0',
      id:this.id,
      image:this.logo,
      join_date:"",
      location:this.restaurantForm.value.location,
      phone:this.restaurantForm.value.phone,
      rating:+this.restaurantForm.value.rating,
      removed_date:"",
      restaurant_address:this.restaurantForm.value.restaurant_address,
      restaurant_decription:this.restaurantForm.value.restaurant_desc,
      restaurant_name: this.restaurantForm.value.restaurant_name,
      user_id:this.restaurantForm.value.employ_id};
      console.log(data);
      return data;
  }

  selectImage(event){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.logo = file;
    }
    const formData = new FormData();
    formData.append('image',this.logo);
    console.log(formData);
    //this.api.uploadImage() is a API function which need to define in ApiService
    this.api.uploadImage(formData).subscribe((res:{response})=>{
      console.log(res);
      this.logo=res.response.Location;
      console.log(this.logo);
    },err=>console.log(err));
  }

  clearIt(){
    this.restaurantForm.reset()
  }

}
