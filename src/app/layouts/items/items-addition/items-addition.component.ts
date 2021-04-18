import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-items-addition',
  templateUrl: './items-addition.component.html',
  styleUrls: ['./items-addition.component.css']
})
export class ItemsAdditionComponent implements OnInit {

  itemsForm: FormGroup;
  categoryList=[];
  cuisineList=[];
  restaurantList=[];
  editMode:boolean=false;
  changeLogo:boolean=true;
  id:number;
  image:any;
  updateId:any;
  constructor(private fb:FormBuilder,private api:ApiService, private route:ActivatedRoute , private router: Router){}

  ngOnInit(){
    this.api.getAllRestaurants({
    }).subscribe((res:any) => {
      this.restaurantList = res.response.result
    }, err => {
    })

    this.api.getCategory().subscribe((res:any)=>{
      this.categoryList = res.response.result;
     })

     this.api.getCuisine().subscribe((res:any)=>{
      this.cuisineList = res.response.result;
     })

    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.updateId = params.id
        this.editMode= params['id']!=null;
        this.changeLogo=!this.editMode;
        this.getList();
        this.inItForm();
      })

  }

  private inItForm(){

    let name,restaurant,price,category,cuisine,feature,discount,type;
    
    if(this.editMode)
    { console.log(this.id);
      this.api.getFoodById(this.id).subscribe((res:{code,status,response})=>{
          name=res.response[0].food_name;
          price=res.response[0].price;
          restaurant=res.response[0].restaurant_id;
          type=res.response[0].food_type
          category=res.response[0].category_id;
          cuisine=res.response[0].cuisine_id;
          feature=res.response[0].featured_item;
          discount=res.response[0].disc_price;
          this.image=res.response[0].image;

          console.log(restaurant);
          this.itemsForm = this.fb.group({
            "name":[name, [Validators.required]],
            "price":[price,[Validators.required]],
            "restaurant": [restaurant,[Validators.required]],
            "type":[type,[Validators.required]],
            "category":[category,[Validators.required]],
            "cuisine":[cuisine,[Validators.required]],
            "feature":[feature,[Validators.required]],
            // "item_image":[null,[Validators.required]]
          })
        });
    }    
    
    this.itemsForm = this.fb.group({
      "name":[name, [Validators.required]],
      "price":[price,[Validators.required]],
      "restaurant": [restaurant,[Validators.required]],
      "type":[type,[Validators.required]],
      "category":[category,[Validators.required]],
      "cuisine":[cuisine,[Validators.required]],
      "feature":[feature,[Validators.required]],
      "item_image":[null,[Validators.required]]     
    })
     
  }

  clearIt(){
    this.itemsForm.reset();
    this.image="";
  }  
  
  addIt()
  {  
    // if(this.itemsForm.valid)
    // { 
      this.api.addItem(this.getData())
     .subscribe(res=>{
         console.log(res);
         this.router.navigate(['items-list']);
       },err=>console.log(err))
      }
  // }	

  saveIt(){
    // if(this.itemsForm.valid)
      //  { 
         this.api.updateItemById(this.updateId,this.getData())
        .subscribe(res=>{
            console.log(res);
            this.router.navigate(['items-list']);
          },err=>console.log(err))
        // }
          console.log(this.itemsForm);
        
  }

  selectImage(event){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.image = file;
    }
    const formData = new FormData();
    formData.append('image',this.image);
    console.log(formData);
    //this.api.uploadImage() is a API function which need to define in ApiService
    this.api.uploadImage(formData).subscribe((res:{response})=>{
      console.log(res);
      this.image=res.response.Location;
      console.log(this.image);
    },err=>console.log(err));
  }


  getList(){
    this.api.getfoodOptions().subscribe((res:{code,status,response})=>
    {
    this.cuisineList=res.response.cuisines;
    this.categoryList=res.response.categories;
    console.log(this.cuisineList);
    console.log(this.categoryList);
  });

  this.api.getRestaurant().subscribe((res:{code,status,response})=>{
    this.restaurantList=res.response;
    console.log(this.restaurantList);
  })
    
  }


  getData(){
    const restaurantName= this.restaurantList.filter((ele:any) => {
      return ele._id === this.itemsForm.value.restaurant
    })
    console.log('restaurantName',restaurantName);
    let data={
      name:this.itemsForm.value.name,
      price:Number(this.itemsForm.value.price),
      is_veg: this.itemsForm.value.type === 'veg' ? true : false,
      restaurant_name:restaurantName[0].name,
      category:this.itemsForm.value.category,
      cuisine:this.itemsForm.value.cuisine,
      is_featured: this.itemsForm.value.feature === 'Yes' ? true : false,
      restaurant_id: this.itemsForm.value.restaurant
      // category_id:this.itemsForm.value.category,
      // cuisine_id:this.itemsForm.value.cuisine,
      // featured_item:this.itemsForm.value.feature==0,
      // food_name:this.itemsForm.value.name,
      // food_type:this.itemsForm.value.type,
      // image:this.image,
      // price:this.itemsForm.value.price,
      // restaurant_id:this.itemsForm.value.restaurant
    };
    console.log(data);
    return data;
  }
}
