import { Component, OnInit , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-create-offers',
  templateUrl: './create-offers.component.html',
//   styleUrls: ['./create-offers.component.css']
})

export class CreateOffersComponent implements OnInit {
  offersForm: FormGroup;
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

    let name="",valid_from,valid_till,discount="";
    let desc="",mprice,mdiscount,dtype;
    
    if(this.editMode)
    { console.log(this.id);
      this.api.getCouponById(this.id).subscribe((res:{code,status,response})=>{
          name=res.response[0].coupon_code;
          desc=res.response[0].coupon_desc;
          let data=res.response[0].expire_date.split("-");
          valid_from=new Date(data[0]);
          valid_till=new Date(data[1]);
          console.log(data);
          discount=res.response[0].discount;
          mprice=res.response[0].min_price;
          mdiscount=res.response[0].max_price;
          dtype=res.response[0].discount_type;
         
          console.log(valid_from);
          this.offersForm = this.fb.group({
            "offer_name":[name, [Validators.required]],
            "offer_desc": [desc,[Validators.required]],
            "valid_from":[valid_from,[Validators.required]],
            "valid_till":[valid_till,[Validators.required]],
            "discount":[discount,[Validators.required]],
            "mprice":[mprice,[Validators.required]],
            "dtype":[dtype,[Validators.required]]
          })
        });
    }    
    
    this.offersForm = this.fb.group({
      "offer_name":[name, [Validators.required]],
      "offer_desc": [desc,[Validators.required]],
      "valid_from":[valid_from,[Validators.required]],
      "valid_till":[valid_till,[Validators.required]],
      "discount":[discount,[Validators.required]],
      "mprice":[mprice,[Validators.required]],
      "dtype":[dtype,[Validators.required]]
    
    })
     
  }

  
  addIt()
  { 
    if(this.offersForm.valid){
      this.api.invokeCoupons(this.getData())
    .subscribe(res=>{
        console.log(res);
        this.router.navigate(['offers-list']);
      })
    }  
  }	

  saveIt(){
    if(this.offersForm.valid){this.api.updateCoupon(this.id,this.getData())
    .subscribe(res=>{
      console.log(res) ;
      this.router.navigate(['offers-list']);
        })}
  }

  getData(){
    let date1=this.offersForm.value.valid_from.toLocaleString("en-US", {month:'short',day:'numeric',year:'numeric'});
    let date2=this.offersForm.value.valid_till.toLocaleString("en-US", {month:'short',day:'numeric',year:'numeric'});
    let date=date1+"-"+date2;
    console.log(this.offersForm);
    let data={
      active_status:"1",
      coupon_code:this.offersForm.value.offer_name,
      discount:this.offersForm.value.discount,
      created_date:new Date(),
      discount_type:this.offersForm.value.dtype,
      expire_date:date,
      coupon_desc:this.offersForm.value.offer_desc,
      min_price:this.offersForm.value.mprice,
      max_price:0
    };
    console.log(data);
    return data;
  }

  
  
  clearIt(){
    this.offersForm.reset();
  }  

}
