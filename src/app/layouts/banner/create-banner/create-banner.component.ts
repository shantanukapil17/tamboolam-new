
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';

import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
//   styleUrls: ['./create-banner.component.css']
})
export class CreateBannerComponent implements OnInit {
  bannerForm:FormGroup;
  editMode:boolean=false;
  changeLogo:boolean=true;
  id:number;
  logo:any;

  constructor(private fb:FormBuilder,private api:ApiService, private route:ActivatedRoute , private router: Router){}

  ngOnInit(){
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode= params['id']!=null;
        this.changeLogo=!this.editMode;
        this.inItForm();
      })
      this.api.getBanners().subscribe(res=>console.log(res));
   

  }

  private inItForm(){

    let name;
    let status,pos;
     
    if(this.editMode)
    { console.log(this.id);
      this.api.getBannersById(this.id).subscribe((res:{code,status,response})=>{
        console.log(res);
          name=res.response[0].banner_name;
          status=res.response[0].active_status;
          pos=res.response[0].banner_position;
          console.log(res.response[0]);

          this.bannerForm = this.fb.group({
            "name":[name, [Validators.required]],
            "status":[status,[Validators.required]],
            "position":[pos,[Validators.required]]
          })
            console.log(this.bannerForm);
        });
    }    

 
    this.bannerForm = this.fb.group({
      "name":[name, [Validators.required]],
      "status":[status,[Validators.required]],
      "image":[this.logo,[Validators.required]],
      "position":[pos,[Validators.required]]
    })
    console.log(this.bannerForm);
  }

  
  addIt()
  { console.log(this.bannerForm.value);
    console.log(this.getData());
    if(this.bannerForm.valid){this.api.addBanners(this.getData())
    .subscribe(res=>{
        console.log(res);
        this.router.navigate(['app-banner-list']);
      })}
      
  }	

  saveIt(){
    if(this.bannerForm.valid){ this.api.updateBanners(
      this.getData())
    .subscribe(res=>{
        console.log(res);
        this.router.navigate(['app-banner-list']);
        })
 }   
  }
  
  getData(){
    let data={ 
      banner_position:this.bannerForm.value.position,
      banner_name: this.bannerForm.value.name,
      active_status:this.bannerForm.value.status,
      banner_image:this.logo
      };
    
      return data;
  }

  selectImage(event){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.logo = file;
    }
    const formData = new FormData();
    formData.append('image',this.logo);
    console.log(formData);
    //this.api.uploadImage() is a API function which need to define in ApiService
    this.api.uploadImage(formData).subscribe((res:{response})=>{
      console.log(res);
      this.logo=res.response.Location;
      console.log(this.logo);
    },err=>console.log(err));
  }

  clearIt(){
    this.bannerForm.reset()
  }

}
