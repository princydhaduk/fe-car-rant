import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  arr: any = [];
  loginForm!: FormGroup;
  show: boolean = false;

  constructor(private api: ApiService,private router:Router, private toastr:ToastrService) { }

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
      if (res && res.status === 200) {
        localStorage.setItem('token',res?.token);
        this.router.navigate(['/web/home']);
        this.toastr.success(res.message);
      }
      else{
        this.toastr.error(res.message);
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
