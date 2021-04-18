
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';

import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-faq-cat-add',
  templateUrl: './faq-cat-add.component.html',
//   styleUrls: ['./faq-cat.component.css']
})

export class FaqCatAddComponent  implements OnInit{
   
  faqForm: FormGroup;
  editMode:boolean=false;
  id:number;
  constructor(private fb:FormBuilder,private api:ApiService, private route:ActivatedRoute , private router: Router){}

  ngOnInit(){
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode= params['id']!=null;
        this.inItForm();
      })

  }

  private inItForm(){

    let category="";
    
    
    if(this.editMode)
    { console.log(this.id);
      this.api.getFaqCatById(this.id).subscribe((res:{code,status,response})=>{
          category=res.response[0].category;
          
          this.faqForm = this.fb.group({
            "faq_cat":[category, [Validators.required]],
            
          })
        
        });
    }    
 
    this.faqForm = this.fb.group({
      "faq_cat":[category, [Validators.required]],
      
    })
     
  }

  
  addIt()
  { console.log(this.faqForm);
    if(this.faqForm.valid){
  this.api.addFaqCat(this.faqForm.value)
    .subscribe(res=>{
        console.log(res);
        this.router.navigate(['faq-cat']);
      })
    }   
  }	

  saveIt(){
   if(this.faqForm.valid){ 
       this.api.updateFaqCat(this.id,
          {faq_cat:this.faqForm.value.faq_cat,
           id:this.id })
    .subscribe(res=>{
        this.router.navigate(['faq-cat']);
        })}
  }
  
  
clearIt(){
  this.faqForm.reset();
}  
}