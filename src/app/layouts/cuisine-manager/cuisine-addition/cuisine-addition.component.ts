import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-cuisine-add',
  templateUrl: './cuisine-addition.component.html',
  styleUrls: ['./cuisine-addition.component.css']
})
export class CuisineAdditionComponent implements OnInit {

  cuisineForm: FormGroup;
  editMode:boolean=false;
  id:number;
  cusineSlugName: any;
  updatetId: any;
  constructor(private fb:FormBuilder,private api:ApiService, private route:ActivatedRoute , private router: Router){}

  ngOnInit(){
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params.id;
        this.updatetId = params.id;
        this.editMode= params['id']!=null;
        this.inItForm();
      })

  }

  private inItForm(){

    let name="";
    let desc="";
    
    if(this.editMode)
    { console.log(this.id);
      this.api.getCuisineById(this.id).subscribe((res:{code,status,response})=>{
        name=res.response[0].cuisine_name;
          desc=res.response[0].cuisine_description;
          console.log(desc);
          this.cuisineForm = this.fb.group({
            "cuisine_name":[name, [Validators.required]],
            "cuisine_description": [desc,[Validators.required]]
          })
        });
    }    
    
    this.cuisineForm = this.fb.group({
      "cuisine_name":[name, [Validators.required]],
      "cuisine_description": [desc,[Validators.required]]
    })
     
  }

  clearIt(){
    this.cuisineForm.reset();
  }  
  
  addIt()
  { 
    this.cusineSlugName = this.cuisineForm.value.cuisine_name.replace(/ /g, "_");
    if(this.cuisineForm.valid)
    {this.api.addCuisine({cuisine_value:this.cuisineForm.value.cuisine_name,
      description:this.cuisineForm.value.cuisine_description,
      cuisine_slug: this.cusineSlugName
    })
    .subscribe(res=>{
        console.log(res);
        this.router.navigate(['cuisine-list']);
      })}
      
  }	

  saveIt(){
    this.cusineSlugName = this.cuisineForm.value.cuisine_name.replace(/ /g, "_");
    if(this.cuisineForm.valid)
    {this.api.updateCuisineById(
      this.updatetId,{cuisine_value:this.cuisineForm.value.cuisine_name,
        description:this.cuisineForm.value.cuisine_description,
        cuisine_slug: this.cusineSlugName})
    .subscribe(res=>{
        this.router.navigate(['cuisine-list']);
        })}
  }
  
}
  
