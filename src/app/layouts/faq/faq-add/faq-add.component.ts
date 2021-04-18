
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-faq-add',
  templateUrl: './faq-add.component.html',
//   styleUrls: ['./faq-addition.component.css']
})
export class FaqAddComponent implements OnInit {

   
    faqForm: FormGroup;
    editMode:boolean=false;
    id:number;
    category:any;
    constructor(private fb:FormBuilder,private api:ApiService, private route:ActivatedRoute , private router: Router){}

    ngOnInit(){
      this.route.params.subscribe(
        (params:Params)=>{
          this.id=+params['id'];
          this.editMode= params['id']!=null;
          console.log(this.id);
          this.inItForm();
        })
      
        this.api.getFaqCat().subscribe((res:any)=>{
          this.category=res.response;
        })

    }

    private inItForm(){

      let question="";
      let answer="";
      
      if(this.editMode)
      { console.log(this.id);
        this.api.getFaqById(this.id).subscribe((res:{code,status,response})=>{
            question=res.response[0].question;
            answer=res.response[0].answers;
            this.faqForm = this.fb.group({
              "question":[question, [Validators.required]],
              "answer": [answer,[Validators.required]],
              "category":[res.response[0].faq_cat_id,[Validators.required]]
            })
          
          });
      }    
   
      this.faqForm = this.fb.group({
        "question":[question, [Validators.required]],
        "answer": [answer,[Validators.required]],
        "category":[,[Validators.required]]
      })
       
    }
  
    
    addIt()
    { console.log(this.faqForm);
      if(this.faqForm.valid){
    this.api.addFaq(
        {question:this.faqForm.value.question,
         answers:this.faqForm.value.answer,
         faq_cat_id:this.faqForm.value.category})
      .subscribe(res=>{
          console.log(res);
          this.router.navigate(['faq']);
        })
      }   
    }	

    saveIt(){
     if(this.faqForm.valid){ 
         this.api.updateFaq(this.id,
            {question:this.faqForm.value.question,
             answers:this.faqForm.value.answer,
             faq_cat_id:this.faqForm.value.category})
      .subscribe(res=>{
          this.router.navigate(['faq']);
          })}
    }
    
    
  clearIt(){
    this.faqForm.reset();
  }  

  }
  
