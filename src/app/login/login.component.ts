import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("toast") toast: ElementRef;
  loginForm: FormGroup;
  public loginInvalid: boolean;
  hide: boolean = true;
  public showOTP = false;
  public isSendOtpDisabled = false;
  constructor(private formbuilder: FormBuilder, 
    private toastr: ToastrService,
    private router: Router, 
    public api: ApiService,
    private auth: AuthService) { }

  ngOnInit() {
    // if (localStorage.getItem('LoggedInUser')) { 
    //   this.router.navigate(['/dashboard']);
    //   }
    this.loginForm = this.formbuilder.group({
      'mobileNumber': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'otp': new FormControl('', [Validators.required])
    });
  }

  account_validation_messages = {
    'username': [
      { type: 'required', message: 'Required Field' },
      { type: 'minlength', message: 'Length must be at least 6 characters long' },
      { type: 'maxlength', message: 'Length cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Input must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
  }

    showSuccessToastr(response:any) {
      if (response.response.data.type === 'success') { 
        this.toastr.success("OTP sent successfully");
      } 
    }

    showErrorToastr(err:any) {
        this.toastr.error("OTP Sent Failed");
    }

    sendOTP() {
      this.api.sendOtp({
      phone: this.loginForm.value.mobileNumber,
    }).subscribe(res => {
      this.showSuccessToastr(res);
      this.showOTP = true;
      this.loginForm.controls.mobileNumber.disable();
      }, err => {
        this.showErrorToastr(err);
    })
  }

  verifyOTP() {
    this.loginForm.controls.mobileNumber.enable();
    this.api.verifyOtp({
      phone: this.loginForm.value.mobileNumber,
      otp: this.loginForm.value.otp,
      user_type: 'staff'
    }).subscribe((res:any) => {
      
      this.loginForm.controls.mobileNumber.disable();
      this.loginForm.controls.otp.disable();
      // this.showSuccessToastr(res);
      this.showOTP = true;
      if(!localStorage.getItem('LoggedInUser')) { 
      this.auth.sendToken(res.response.token);
      this.router.navigate(['/dashboard']);
      }
    }, err => {
      this.showErrorToastr(err);
    })
  }

submit() {
  if (this.showOTP === false) {
    this.sendOTP();
  } else {
    this.verifyOTP();
    }
  }
}