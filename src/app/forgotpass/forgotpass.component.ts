import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

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

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.forgotEmail = new FormGroup({
      email: new FormControl(''),
    })
    this.timer(1);
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
      }
    })
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
    this.forgotDialog()
    this.timer(1);
  }

  otpDailog(): void {
    const payload = {
      "email": this.forgotEmail.value.email,
      "otp": this.otp,
    }
    this.api.saveForgetOtp(payload).subscribe((res: any) => {
      if (res) {
        this.dailogBox = false;
        this.otpDailogBox = false;
        this.passDailogBox = true;
      }
    })
  }

}


