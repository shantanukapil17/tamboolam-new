import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl, FormArray} from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';

import { ApiService } from '../../../../services/api.service';  

@Component({
  selector: 'app-add-meal-packages',
  templateUrl: './add-meal-packages.component.html',
//   styleUrls: ['./add-meal-packages.component.css']
})
export class HealthyAddMealPackagesComponent implements OnInit {

  mealForm:FormGroup;
  editMode:boolean=false;
  id:number;
  itemsList;
  noOfItems;
  img;
  changeImage:boolean=true;

  selectedDays=[];
  daysList: any = [ 
  {name: "Monday",value: "monday",selected: false},
  {name: "Tuesday",value: "tuesday",selected: false},
  {name: "Wednesday",value: "wednesday",selected: false},
  {name: "Thursday",value: "thursday",selected: false},
  {name: "Friday",value: "friday",selected: false},
  {name: "Saturday",value: "saturday",selected: false},
  {name: "Sunday",value: "sunday",selected: false}];


  constructor(private fb:FormBuilder,private api:ApiService, private route:ActivatedRoute , private router: Router){}

  ngOnInit() {
    
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode= params['id']!=null;
        this.changeImage=!this.editMode;
        this.inItForm();
      });  
    
    this.api.getHealthyKitchenItems().subscribe(res=>
      {this.itemsList=res['response'];console.log(this.itemsList)})

  }

  private inItForm(){

    let name,mprice,sprice,desc,days,no;
    let items=new FormArray([new FormGroup({'itemId': new FormControl(null, Validators.required)})]);
    
    if(this.editMode)
    { console.log(this.id);
      this.api.getHealthyKitchenMealItemsById(this.id).subscribe((res:{code,status,response})=>{
        console.log(res);
        name=res.response[0].meal_package_name;
        desc=res.response[0].meal_package_desc;
        mprice=res.response[0].meal_package_price;
        sprice=res.response[0].single_meal_price;
        no=res.response[0].no_of_items_pw;
        days=res.response[0].delivery_available_on;
        this.img=res.response[0].image;
        days=days.split(",");

        if(res.response[0].items)
        { 
          let item:[]=res.response[0].items.split(",");
          items=new FormArray([]);
          for(let x of item)
          {console.log(items);items.push(new FormGroup({'itemId': new FormControl(+x, Validators.required)}));}
          
        }

        console.log(items);
        for (let x =0; x<this.daysList.length ; x++ )
        { for(let d of days)
          { 
            if(this.daysList[x].name==d)
            this.daysList[x].selected=true;
          }
        }
      
          this.mealForm = this.fb.group({
            "name":[name, [Validators.required]],
            "meal_price":[mprice,[Validators.required]],
            "no_of_item":[no,[Validators.required]],
            "single_price":[sprice,[Validators.required]],
            "desc":[desc,[Validators.required]],
            "items":items,
            "days": this.createOptions(this.daysList),
          })
          this.noOfItems=this.mealForm.value.items;
          console.log(this.mealForm);
        });
    }    
 
    this.mealForm = this.fb.group({
      "name":[name, [Validators.required]],
      "meal_price":[mprice,[Validators.required]],
      "no_of_item":[no,[Validators.required]],
      "single_price":[sprice,[Validators.required]],
      "desc":[desc,[Validators.required]],
      "items":items,
      "days": this.createOptions(this.daysList),
      "image":[this.img,[Validators.required]],
      });
      this.noOfItems=this.mealForm.value.items;
      console.log(this.mealForm);
      console.log(this.mealForm.value.items);
  }

  createOptions(Input) {
    const arr = Input.map(x => {
      return new FormControl(x.selected || false);
    });
    return new FormArray(arr);
  }

  getSelectedOptions() {
  for(let x=0; x<this.mealForm.value.days.length; x++)
   { let item=this.mealForm.value.days[x];
     if(item)
      this.selectedDays.push(this.daysList[x].name);
   }

    console.log(this.selectedDays);

  }

  selectImage(event){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.img = file;
    }
    const formData = new FormData();
    formData.append('image',this.img);
    console.log(formData);
    //this.api.uploadImage() is a API function which need to define in ApiService
    this.api.uploadImage(formData).subscribe((res:{response})=>{
      console.log(res);
      this.img=res.response.Location;
      console.log(this.img);
    },err=>console.log(err));
  }

  addIt(){
    if(this.mealForm.valid)
    {this.api.addHealthyKitchenMealItems(this.getData()).subscribe((res:{code,status,response})=>console.log(res.response));
    // this.router.navigate(['healthy-kitchen/meal-packages']);
    }
  }

  
  clearIt(){
    this.mealForm.reset();
  }

  saveIt(){
    if(this.mealForm.valid)
    {this.api.updateHealthyKitchenMealItems(this.getUpdatedData(this.id)).subscribe((res:{code,status,response})=>console.log(res.response));
    this.router.navigate(['healthy-kitchen/meal-packages']);
  }
  }

  addItem(){
    console.log('x');
  	(<FormArray>this.mealForm.get('items')).push(
  		new FormGroup({
  			'itemId': new FormControl(null, Validators.required)
  }));	
  this.noOfItems=this.mealForm.value.items;
  console.log(this.mealForm);
  }

  returnItem(){
    let x=this.mealForm.value.items;
    console.log(x);
    let idString='';
    for(let item of x)
    { 
      if(item.itemId) 
     {if(x.length>1)
        {idString=idString.concat(item.itemId.toString(),",");}
      else
      idString=idString.concat(item.itemId.toString());
     }
     
    console.log(idString);
    return idString;}
  }

  getData(){
    this.getSelectedOptions();
    let data={
      meal_package_name:this.mealForm.value.name,
      meal_package_desc:this.mealForm.value.desc,
      meal_package_price:this.mealForm.value.meal_price,
      single_meal_price:this.mealForm.value.single_price,
      no_of_items_pw:this.mealForm.value.no_of_item,
      delivery_available_on:this.selectedDays,
      image:this.img,
      items:this.returnItem()
   
    };

    console.log(data);
    return data;
  }

  getUpdatedData(id){
    this.getSelectedOptions();
    console.log(this.img);
    let data={
      meal_package_name:this.mealForm.value.name,
      meal_package_desc:this.mealForm.value.desc,
      meal_package_price:this.mealForm.value.meal_price,
      single_meal_price:this.mealForm.value.single_price,
      no_of_items_pw:this.mealForm.value.no_of_item,
      delivery_available_on:this.selectedDays,
      image:this.img,
      items:this.returnItem(),
      id:id
   
    };

    console.log(data);
    return data;
  }


}
