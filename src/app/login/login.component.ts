import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  arr: any = [];
  loginForm!: FormGroup;
  show: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit(): void {
    const payload = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }
    this.api.saveLoginData(payload).subscribe((res: any) => {
      if (res) {
      }
    });
  }

  get emailValidators() {
    return this.loginForm.get('email');
  }

  get passValidators() {
    return this.loginForm.get('password');
  }

  onClick(): void {
    this.show = !this.show;
  }
}
