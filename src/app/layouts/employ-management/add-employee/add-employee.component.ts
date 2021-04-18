import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
//   styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  
    employForm: FormGroup;
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

      let name,address,email,phone,pass;
      
      if(this.editMode)
      { console.log(this.id);
        this.api.getPeopleDetailsById(this.id).subscribe((res:{code,status,response})=>{
          name=res.response[0].user_name;
          console.log(res.response[0]);
          address=res.response[0].address;
          email=res.response[0].email;
          phone=res.response[0].phone; 
            this.employForm = this.fb.group({
              "employ_name":[name, [Validators.required]],
              "email":[email,[Validators.required, Validators.email]],
              "employ_address":[address,[Validators.required]],
              "phone":[phone,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]],
            })
          });
      }    
   
      this.employForm = this.fb.group({
        "employ_name":[name, [Validators.required]],
        "email":[email,[Validators.required, Validators.email]],
        "employ_address":[address,[Validators.required]],
        "phone":[phone,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]],
        "pass":[null,[Validators.required]],
        "confirm_pass":[null,[Validators.required]]
        },
      {  validators: this.password.bind(this)}
     )
       
    }
  
    password(formGroup: FormGroup) {
      const { value: password } = formGroup.get('pass');
      const { value: confirmPassword } = formGroup.get('confirm_pass');
      console.log(password,confirmPassword,password==confirmPassword);
      this.validateIt(password,confirmPassword);
      return password === confirmPassword ? null : { passwordNotMatch: true };
    }
    
    validateIt(password,confirmPassword){
      if(password!=confirmPassword)
      {document.getElementById('pass').classList.add("mat-form-field-invalid");
      document.getElementById('pass').classList.remove("ng-valid");
      document.getElementById('cpass').classList.add("mat-form-field-invalid");
      document.getElementById('cpass').classList.remove("ng-valid");} 
    //   if(password==confirmPassword)
    //   {
    //  document.getElementById('pass').classList.add("ng-valid");
    //   document.getElementById('cpass').classList.add("ng-valid");
    //   }
    }

    addIt()
    { if(this.employForm.valid)
       { this.api.addPeopleDetails(this.getData())
        .subscribe(res=>{
            console.log(res);
            this.router.navigate(['employee-list']);
          },err=>console.log(err))}
        
    }	

    saveIt(){
      if(this.employForm.valid)
      {this.api.updatePeopleDetails(this.getUpdatedData())
      .subscribe(res=>{
        console.log(res);
          this.router.navigate(['employee-list']);
          })}
    } 
    
    
  clearIt(){
    this.employForm.reset();
  }  

  getData(){
    let data={
      address:this.employForm.value.employ_address,
      email:this.employForm.value.email,
      phone:this.employForm.value.phone,
      role_id:2,
      user_name:this.employForm.value.employ_name,
      password:this.employForm.value.pass,
    }
   return data;
  }

  getUpdatedData(){
    let data={
      id:this.id,
      address:this.employForm.value.employ_address,
      email:this.employForm.value.email,
      phone:this.employForm.value.phone,
      role_id:2,
      user_name:this.employForm.value.employ_name,
      password:this.employForm.value.pass,
    }
   return data;
  }
}
