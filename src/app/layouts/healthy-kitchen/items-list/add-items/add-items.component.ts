import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl, FormArray} from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';

import { ApiService } from '../../../../services/api.service';  

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
//   styleUrls: ['./add-items.component.css']
})
export class HealthyAddItemsListComponent implements OnInit {

  itemsForm:FormGroup;
  editMode:boolean=false;
  id:number;
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

  selectedNutrients=[];
  nutrientsList:any=[
  {name: "Protein", quantity:null ,value:19,selected: false},
  {name: "Calories", quantity:null ,value:18,selected: false},
  {name: "Fat", quantity:null ,value:20,selected: false},
  {name: "Sugar", quantity:null ,value:21 ,selected: false}]

  constructor(private fb:FormBuilder,private api:ApiService, private route:ActivatedRoute , private router: Router){}

  ngOnInit() {
    
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode= params['id']!=null;
        this.changeImage=!this.editMode;
        this.inItForm();
      })

  }

  private inItForm(){

    let name,price,desc,enable,days,nutrients;
    
    if(this.editMode)
    { console.log(this.id);
      this.api.getHealthyKitchenItemsById(this.id).subscribe((res:{code,status,response})=>{
        name=res.response[0].item_name;
        desc=res.response[0].item_description;
        price=res.response[0].item_price;
        days=res.response[0].delivery_available_on;
        days=days.split(",");
        nutrients=res.response[0].nutrition;
        
        for (let x =0; x<this.daysList.length ; x++ )
        { for(let d of days)
          { 
            if(this.daysList[x].name==d)
            this.daysList[x].selected=true;
          }
        }

         
        for (let x =0; x<this.nutrientsList.length ; x++ )
        { let itemId=this.nutrientsList[x].value;
          for(let d of nutrients)
          { let id=d.nutrition_id;
            if(itemId==id)
            {this.nutrientsList[x].selected=true;
             this.nutrientsList[x].quantity=d.nutrition_quantity;
            }
          }
        }



        enable=res.response[0].enable==1 ?true:false;
          this.itemsForm = this.fb.group({
            "item_name":[name, [Validators.required]],
            "item_price":[price,[Validators.required]],
            "item_desc":[desc,[Validators.required]],
            "days":this.createOptions(this.daysList),
            "nutrients":this.createNutrientOptions(this.nutrientsList),
            "enableItem":[enable],
            
          })
        });
    }    
 
    this.itemsForm = this.fb.group({
      "item_name":[name, [Validators.required]],
      "item_price":[price,[Validators.required]],
      "item_desc":[desc,[Validators.required]],
      "days": this.createOptions(this.daysList),
      "enableItem":false,
      "nutrients":this.createNutrientOptions(this.nutrientsList),
      "image":[this.img,[Validators.required]],
     
      });
     
      console.log(this.itemsForm);
  }

  navigate(){
    this.router.navigate(['healthy-kitchen/items-list']);
  }

  createOptions(Input) {
    const arr = Input.map(x => {
      return new FormControl(x.selected || false);
    });
    return new FormArray(arr);
  }

  createNutrientOptions(Input) {
    console.log(this.itemsForm);
    const p=new FormGroup(({
      'name':new FormControl(Input[0].selected),
      'quantity':new FormControl(Input[0].quantity)
    }));

    
    const c=new FormGroup(({
      'name':new FormControl(Input[1].selected),
      'quantity':new FormControl(Input[1].quantity)
    }));

    
    const f=new FormGroup(({
      'name':new FormControl(Input[2].selected),
      'quantity':new FormControl(Input[2].quantity)
    }));

    
    const s=new FormGroup(({
      'name':new FormControl(Input[3].selected),
      'quantity':new FormControl(Input[3].quantity)
    }));
    

    return new FormArray([p,c,f,s]);
  }

  getSelectedOptions() {


   for(let x=0; x<this.itemsForm.value.nutrients.length; x++)
   { let item=this.itemsForm.value.nutrients[x];
      let quantList=[this.itemsForm.value.nutrients[0],this.itemsForm.value.nutrients[1],this.itemsForm.value.nutrients[2],this.itemsForm.value.nutrients[3]];
     if(item)
     { let quantity=quantList[x];
      console.log(quantity,quantList);
       this.selectedNutrients.push({nutrition_id:x,nutrition_name:this.nutrientsList[x].name,quantity:quantity});}
   }

   for(let x=0; x<this.itemsForm.value.days.length; x++)
   { let item=this.itemsForm.value.days[x];
     if(item)
      this.selectedDays.push(this.daysList[x].name);
   }

    console.log(this.selectedDays);
    console.log(this.selectedNutrients);
  }


  
  clearIt(){
    this.itemsForm.reset();
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

  isChange(index) {
    console.log(index);
    if(this.itemsForm.value.nutrients[index].name) {
      console.log(this.itemsForm.controls.nutrients['controls'][index].controls.quantity);
      this.itemsForm.controls.nutrients['controls'][index].controls.quantity.setValidators([Validators.required]);
      // this.itemsForm.controls.child_name.setValidators(this.setRequired());
    } else {
      this.itemsForm.controls.nutrients['controls'][index].controls.quantity.clearValidators();
    }
  }


  addIt(){
    console.log(this.itemsForm);
    
    if(this.itemsForm.valid)
    { this.api.addHealthyKitchenItems(this.getData()).subscribe((res:{code,status,response})=>{console.log(res.response);this.navigate()});}
  }

  saveIt(){
    if(this.itemsForm.valid){this.api.updateHealthyKitchenItems(this.getUpdatedData(this.id)).subscribe((res:{code,status,response})=>{console.log(res.response);this.navigate()});}
  }

  getData(){
    this.getSelectedOptions();
    console.log(this.selectedNutrients);
    let data={
      item_name:this.itemsForm.value.item_name,
      item_desc:this.itemsForm.value.item_desc,
      item_price:this.itemsForm.value.item_price,
      delivery_available_on:this.selectedDays,
      image:this.img,
      enable:this.itemsForm.value.enableItem.value ?1:0,
      nutrition:this.selectedNutrients
    };

    console.log(data);
    return data;
  }

  getUpdatedData(iD){
    this.getSelectedOptions();
    console.log(this.selectedNutrients);
    let data={
      item_name:this.itemsForm.value.item_name,
      item_desc:this.itemsForm.value.item_desc,
      item_price:this.itemsForm.value.item_price,
      delivery_available_on:this.selectedDays,
      image:this.img,
      enable:this.itemsForm.value.enableItem.value ?1:0,
      nutrition:this.selectedNutrients,
      id:iD
    };

    console.log(data);
    return data;    
  }
}
