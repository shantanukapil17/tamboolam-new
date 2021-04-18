import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl, FormArray} from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';

import { ApiService } from '../../../../services/api.service';  


@Component({
  selector: 'app-add-diet-plans',
  templateUrl: './add-diet-plans.component.html',
//   styleUrls: ['./add-diet-plans.component.css']
})
export class HealthyAddDietPlansComponent implements OnInit {

  dietPlanForm:FormGroup;
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

    let name,price,desc,days;
    let items=new FormArray([new FormGroup({'itemId': new FormControl(null, Validators.required)})]);
    
    if(this.editMode)
    { console.log(this.id);
      this.api.getHealthyKitchenDietPlanById(this.id).subscribe((res:{code,status,response})=>{
        name=res.response[0].dite_plan_name;
        desc=res.response[0].dite_plan_desc;
        price=res.response[0].dite_meal_price;
        days=res.response[0].delivery_available_on;
        this.img=res.response[0].image;
        days=days.split(",");

        if(res.response[0].items)
        { 
          let item:[]=res.response[0].items.split(",");
          items=new FormArray([]);
          for(let x of item)
          {items.push(new FormGroup({'itemId': new FormControl(+x, Validators.required)}));}
          
        }

        console.log(items);
        for (let x =0; x<this.daysList.length ; x++ )
        { for(let d of days)
          { 
            if(this.daysList[x].name==d)
            this.daysList[x].selected=true;
          }
        }
      
          this.dietPlanForm = this.fb.group({
            "name":[name, [Validators.required]],
            "price":[price,[Validators.required]],
            "desc":[desc,[Validators.required]],
            "days":this.createOptions(this.daysList),
            "items":items,
          })
          this.noOfItems=this.dietPlanForm.value.items;
          console.log(this.dietPlanForm);
        });
    }    
 
    this.dietPlanForm = this.fb.group({
      "name":[name, [Validators.required]],
      "price":[price,[Validators.required]],
      "desc":[desc,[Validators.required]],
      "items":items,
      "days": this.createOptions(this.daysList),
      "image":[this.img,[Validators.required]],
      });
      this.noOfItems=this.dietPlanForm.value.items;
      console.log(this.dietPlanForm);
      console.log(this.dietPlanForm.value.items);
  }

  createOptions(Input) {
    const arr = Input.map(x => {
      return new FormControl(x.selected || false);
    });
    return new FormArray(arr);
  }

  getSelectedOptions() {
  for(let x=0; x<this.dietPlanForm.value.days.length; x++)
   { let item=this.dietPlanForm.value.days[x];
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
    if(this.dietPlanForm.valid)
    {this.api.addHealthyKitchenDietPlan(this.getData()).subscribe((res:{code,status,response})=>console.log(res.response));
    this.router.navigate(['healthy-kitchen/diet-plans']);
    }
  }

  saveIt(){
    if(this.dietPlanForm.valid)
    {this.api.updateHealthyKitchenDietPlan(this.getUpdatedData(this.id)).subscribe((res:{code,status,response})=>console.log(res.response));
    this.router.navigate(['healthy-kitchen/diet-plans']);
  }
  }

  clearIt(){
    this.dietPlanForm.reset();
  }

  addItem(){
    console.log('x');
  	(<FormArray>this.dietPlanForm.get('items')).push(
  		new FormGroup({
  			'itemId': new FormControl(null, Validators.required)
  }));	
  this.noOfItems=this.dietPlanForm.value.items;
  console.log(this.dietPlanForm);
  }

  returnItem(){
    let x=this.dietPlanForm.value.items;
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
      dite_plan_name:this.dietPlanForm.value.name,
      dite_plan_desc:this.dietPlanForm.value.desc,
      dite_meal_price:this.dietPlanForm.value.price,
      delivery_available_on:this.selectedDays,
      image:this.img,
      items:this.returnItem()
   
    };

    console.log(data);
    return data;
  }

  getUpdatedData(iD){
    this.getSelectedOptions();
    let data={
      dite_plan_name:this.dietPlanForm.value.name,
      dite_plan_desc:this.dietPlanForm.value.desc,
      dite_meal_price:this.dietPlanForm.value.price,
      delivery_available_on:this.selectedDays,
      image:this.img,
      items:this.returnItem(),
      id:iD
    };

    console.log(data);
    return data;    
  }
}
