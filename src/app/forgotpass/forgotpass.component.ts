import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {
  @ViewChild('ngOtpInput') ngOtpInput: any;
  showOtpComponent: boolean = true;
  hide: boolean = true;
  hideshow: boolean = true;
  dailogBox: boolean = true;
  otpDailogBox: boolean = false;
  passDailogBox: boolean = false;
  forgotEmail!: FormGroup;
  updatePassword!: FormGroup;
  arr: any = [];
  otp: string = '';
  display: string = '';
  isOtp:boolean = true;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

  constructor(private api: ApiService, private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.forgotEmail = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
    })

    this.updatePassword = new FormGroup({
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      cpassword: new FormControl('',[Validators.required])
    })
  }

  forgotDialog(): void {
    const payload = {
      "email": this.forgotEmail.value.email,
    }
    this.api.saveForgotEmail(payload).subscribe((res: any) => {
      if (res) {
        this.otpDailogBox = true;
        this.dailogBox = false;
        this.passDailogBox = false;
        console.log("res---",res);
      }
    });
    console.log("payload===>>",payload);
    this.timer(1);
  }

  onOtpChange(otp: any): void {
    this.otp = otp;
  }

  timer(minute: any): void {
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (this.display === '00:00') {
        this.isOtp = false;
      }
      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
      }
    }, 1000);
  }

  isOtpVerify(): void {
    this.isOtp = true;
    this.forgotDialog();
    this.timer(1);
  }

  otpDailog(): void {
    const payload = {
      "email": this.forgotEmail.value.email,
      "otp": this.otp,
    }
    this.api.saveForgetOtp(payload).subscribe((res: any) => {
      if(res.message) {
        this.dailogBox = false;
        this.otpDailogBox = false;
        this.passDailogBox = true;
        this.toastr.success(res.message);
        console.log("res---",res);
      }
      // else{
      //   this.toastr.error(res.message);
      // }
      console.log("payload===>",payload);
    });
  }

  updatePass(): void{
    this.forgotDialog();
    // debugger
    const payload = {
      "email" : this.forgotEmail.value.email,
      "newpassword" : this.updatePassword.value.password,
      "conformPassword": this.updatePassword.value.cpassword,

    }
    this.api.saveUpdatePass(payload).subscribe((res:any) => {
      if(res.message){
        this.router.navigate(['/login']);
        this.toastr.success(res.message);
      }
      // else{
      //   this.toastr.error(res.message);
      // }
    })
  }

  get passValidators() {
    return this.forgotEmail.get('password');
  }
  get cpassValidators() {
    return this.forgotEmail.get('cpassword');
  }
}


