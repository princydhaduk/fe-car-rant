import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  show: boolean = false;
  showhide:boolean = false;
  arr:any = [];

  constructor(private formBuilder: FormBuilder) {}

  signupForm = this.formBuilder.group({
    fname: ['',[Validators.required]],
    lname: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.email]],
    phoneno : ['',[Validators.required,Validators.minLength(10)]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    cpassword : ['',[Validators.required]],
    gender : ['',[Validators.required]],
  },{
    validator : this.MustMatch('password','cpassword'),
  });

  onClick() {
    this.show = !this.show;
  }
  onClickOn(){
    this.showhide = !this.showhide;
  }

  onSubmit(){
    this.arr.push(this.signupForm.value);
    this.signupForm.controls['fname'].setValue('');
    this.signupForm.controls['lname'].setValue('');
    this.signupForm.controls['email'].setValue('');
    this.signupForm.controls['phoneno'].setValue('');
    this.signupForm.controls['password'].setValue('');
    this.signupForm.controls['cpassword'].setValue('');
    this.signupForm.controls['gender'].setValue('');
    console.log(this.arr);
  }

  get fnameValidators(){
    return this.signupForm.get('fname');
  }
  get lnameValidators(){
    return this.signupForm.get('lname');
  }
  get emailValidators(){
    return this.signupForm.get('email');
  }
  get phonenoValidators(){
    return this.signupForm.get('phoneno');
  }
  get passValidators(){
    return this.signupForm.get('password');
  }
  get cpassValidators(){
    return this.signupForm.get('cpassword');
  }

  MustMatch(controlName:string, matchControlName:string){
    return (formGroup:FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchcontrol = formGroup.controls[matchControlName];

      // if(matchcontrol.errors && !matchcontrol.errors['MustMatch']){
      //   debugger
      //   return
      // }

      if(control.value !== matchcontrol.value){
        matchcontrol.setErrors({MustMatch:true});
      }
      else{
        matchcontrol.setErrors(null);
      }
    }
  }
}
