import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { CarComponent } from './car/car.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { PopularfleetsComponent } from './popularfleets/popularfleets.component';
import { BookingComponent } from './booking/booking.component';
import { WebComponent } from './web.component';

const routes: Routes = [
  {
    path:'',
    component:WebComponent,

    // children: [
    //   {
    //     path:'',
    //     redirectTo:'home',
    //     pathMatch:'full'
    //   },
    //   {
    //     path:'home',
    //     component:HomeComponent
    //   },
    //   {
    //     path:'about',
    //     component:AboutComponent
    //   },
    //   {
    //     path:'popularfleets',
    //     component:PopularfleetsComponent
    //   },
    //   {
    //     path:'blogdetails',
    //     component:BookingComponent
    //   },
      // {
      //   path:'services',
      //   component:ServiceComponent
      // },
      // {
      //   path:'cars',
      //   component:CarComponent
      // },
  //     // {
  //     //   path:'blog',
  //     //   component:BlogComponent
  //     // },
  //     // {
  //     //   path:'contact',
  //     //   component:ContactComponent
  //     // },
  //   ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
