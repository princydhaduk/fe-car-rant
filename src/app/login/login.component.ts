import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm:any;
  // password:any;
  // email:any;
  arr:any = [];
  show:boolean = false;

  constructor(){}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required,Validators.minLength(6)]),
    });
  }

  onSubmit(){
    this.arr.push(this.loginForm.value)
    this.loginForm.controls['email'].setValue('');
    this.loginForm.controls['password'].setValue('');
    console.log(this.arr);
  }

  get emailValidators(){
    return this.loginForm.get('email');
  }

  get passValidators(){
    return this.loginForm.get('password');
  }

  onClick() {
    // debugger
    this.show = !this.show;
  }
}
