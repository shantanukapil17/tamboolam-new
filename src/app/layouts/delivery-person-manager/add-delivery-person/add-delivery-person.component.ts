import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';

import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-add-delivery-person',
  templateUrl: './add-delivery-person.component.html',
//   styleUrls: ['./add-delivery-person.component.css']
})
export class AddDeliveryPersonComponent implements OnInit {

  deliveryPersonForm: FormGroup;
  editMode:boolean=false;
  id:number;
  updateId:any;
  constructor(private fb:FormBuilder,private api:ApiService, private route:ActivatedRoute , private router: Router){}

  

  ngOnInit(){
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.updateId=params.id;
        this.editMode= params['id']!=null;
        this.inItForm();
      })

  }

  private inItForm(){

    let name,address,email,phone,license;
    
    if(this.editMode)
    { console.log(this.id);
      this.api.getDriversDetailsById(this.id).subscribe((res:{code,status,response})=>{
        console.log(res);
        name=res.response[0].user_name;
        address=res.response[0].address;
        email=res.response[0].email;
        phone=res.response[0].phone; 
        license=res.response[0].license;
          this.deliveryPersonForm = this.fb.group({
            "name":[name, [Validators.required]],
            "license":[license,[Validators.required]],
            "email":[email,[Validators.required, Validators.email]],
            "address":[address,[Validators.required]],
            "phone":[phone,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]],
          })
        });
    }    
 
    this.deliveryPersonForm = this.fb.group({
      "name":[name, [Validators.required]],
      "license":[license,[Validators.required]],
      "email":[email,[Validators.required, Validators.email]],
      "address":[address,[Validators.required]],
      "phone":[phone,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]],
      "pass":[null,[Validators.required]],
      "cpass":[null,[Validators.required]]
      },
    {  validators: this.password.bind(this)}
   )
     
  }

  password(formGroup: FormGroup) {
    console.log(document.getElementById('cpassword'));
    const { value: password } = formGroup.get('pass');
    const { value: confirmPassword } = formGroup.get('cpass');
    if(password!=confirmPassword)
    {document.getElementById('password').classList.add("mat-form-field-invalid");
    document.getElementById('password').classList.remove("ng-valid");
    document.getElementById('cpassword').classList.add("mat-form-field-invalid");
    document.getElementById('cpassword').classList.remove("ng-valid");}
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  
  addIt()
  { if(this.deliveryPersonForm.valid)
     { this.api.addDeliveryPersonData(this.getData())
      .subscribe(res=>{
          console.log(res);
          this.router.navigate(['delivery-person-list']);
        },err=>console.log(err))}
      
  }	

  saveIt(){
    console.log(this.getUpdatedData());
    // if(this.deliveryPersonForm.valid)
    // {
      this.api.updateDeliveryPersonDataById(this.updateId,this.getUpdatedData())
    .subscribe(res=>{
      console.log(res);
        this.router.navigate(['delivery-person-list']);
        })
      // }
  } 
  
  
clearIt(){
  this.deliveryPersonForm.reset();
}  

getData(){
  let data={
    addresses:this.deliveryPersonForm.value.address,
    email:this.deliveryPersonForm.value.email,
    phone:this.deliveryPersonForm.value.phone,
    // role_id:3,
    driving_license:this.deliveryPersonForm.value.license,
    name:this.deliveryPersonForm.value.name,
    password:this.deliveryPersonForm.value.pass,
    user_type: 'driver'
  }
 return data;
}

getUpdatedData(){
  let data={
    id:this.id,
    address:this.deliveryPersonForm.value.address,
    email:this.deliveryPersonForm.value.email,
    phone:this.deliveryPersonForm.value.phone,
    role_id:3,
    driver_license:this.deliveryPersonForm.value.license,
    user_name:this.deliveryPersonForm.value.name,
    password:this.deliveryPersonForm.value.pass,
  }
 return data;
}
    
  
  }
  
