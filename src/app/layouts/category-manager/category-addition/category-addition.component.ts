
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-addition.component.html',
  styleUrls: ['./category-addition.component.css']
})
export class CategoryAdditionComponent implements OnInit {

   
    categoryForm: FormGroup;
    editMode:boolean=false;
    id:number;
    categorySlugName: any;
    updateId: any;
    constructor(private fb:FormBuilder,private api:ApiService, private route:ActivatedRoute , private router: Router){}

    ngOnInit(){
      this.route.params.subscribe(
        (params:Params)=>{
          this.id=+params['id'];
          this.updateId = params.id
          this.editMode= params['id']!=null;
          this.inItForm();
        })

    }

    private inItForm(){

      let name="";
      let desc="";
      
      if(this.editMode)
      { console.log(this.id);
        this.api.getCategoryById(this.id).subscribe((res:{code,status,response})=>{
          name=res.response[0].category_name;
            desc=res.response[0].cat_description;
            this.categoryForm = this.fb.group({
              "category_name":[name, [Validators.required]],
              "category_description": [desc,[Validators.required]]
            })
          
          });
      }    
   
      this.categoryForm = this.fb.group({
        "category_name":[name, [Validators.required]],
        "category_description": [desc,[Validators.required]]
      })
       
    }
  
    
    addIt()
    { 
      if(this.categoryForm.valid){
        this.categorySlugName = this.categoryForm.value.category_name.replace(/ /g, "_");
        this.api.addCategory({category_value:this.categoryForm.value.category_name,
          description:this.categoryForm.value.category_description,
          category_slug: this.categorySlugName
        })
      .subscribe(res=>{
          console.log(res);
          this.router.navigate(['category-list']);
        })
      }   
    }	

    saveIt(){
     if(this.categoryForm.valid){ 
      this.categorySlugName = this.categoryForm.value.category_name.replace(/ /g, "_");
       this.api.updateCategoryById(
        this.updateId,{category_value:this.categoryForm.value.category_name,
          description:this.categoryForm.value.category_description,
          category_slug: this.categorySlugName
        })
      .subscribe(res=>{
          this.router.navigate(['category-list']);
          })}
    }
    
    
  clearIt(){
    this.categoryForm.reset();
  }  

  

  }
  
