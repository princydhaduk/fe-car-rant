import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  show: boolean = false;
  showhide: boolean = false;
  signupForm!: FormGroup;
  arr: any = [];

  constructor(private formBuilder: FormBuilder, private api: ApiService, private toastr:ToastrService, private route:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneno: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    }, {
      validator: this.MustMatch('password', 'cpassword'),
    });
  }

  onClick(): void {
    this.show = !this.show;
  }
  onClickOn(): void {
    this.showhide = !this.showhide;
  }

  onSubmit(): void {
    // this.arr.push(this.signupForm.value);
    // this.signupForm.controls['fname'].setValue('');
    // this.signupForm.controls['lname'].setValue('');
    // this.signupForm.controls['email'].setValue('');
    // this.signupForm.controls['phoneno'].setValue('');
    // this.signupForm.controls['password'].setValue('');
    // this.signupForm.controls['cpassword'].setValue('');
    // this.signupForm.controls['gender'].setValue('');
    // console.log("array : ",this.arr);

    const payload = {
      "fname": this.signupForm.value.fname,
      "lname": this.signupForm.value.lname,
      "email": this.signupForm.value.email,
      "mobile": this.signupForm.value.phoneno,
      "password": this.signupForm.value.password,
      "gender": this.signupForm.value.gender
    }

    // debugger
    this.api.saveData(payload).subscribe((res: any) => {
      if (res.message) {
        this.toastr.success(res.message);
        this.route.navigate(['/login']);
      }
      console.log("res:::",res);
    })

    this.signupForm.reset();
  }

  get fnameValidators() {
    return this.signupForm.get('fname');
  }
  get lnameValidators() {
    return this.signupForm.get('lname');
  }
  get emailValidators() {
    return this.signupForm.get('email');
  }
  get phonenoValidators() {
    return this.signupForm.get('phoneno');
  }
  get passValidators() {
    return this.signupForm.get('password');
  }
  get cpassValidators() {
    return this.signupForm.get('cpassword');
  }

  MustMatch(controlName: string, matchControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchcontrol = formGroup.controls[matchControlName];
      if (control.value !== matchcontrol.value) {
        matchcontrol.setErrors({ MustMatch: true });
      }
      else {
        matchcontrol.setErrors(null);
      }
    }
  }
}
