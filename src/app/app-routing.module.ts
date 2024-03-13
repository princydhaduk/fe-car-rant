import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { HomeComponent } from './web/home/home.component';
import { BlogDetailComponent } from './web/blog-detail/blog-detail.component';
import { CommonModule } from '@angular/common';5

const routes: Routes = [
  // {
  //   path:'',
  //   redirectTo:'login',
  //   pathMatch:'full'
  // },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'forgotpass',
    component:ForgotpassComponent
  },
  // {
  //   path:'home',
  //   component:HomeComponent
  // },
  {
    path:'blogdetails',
    component:BlogDetailComponent
  },
  {
    path:'web',
    loadChildren: () => import('./web/web.module').then(m => m.WebModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
