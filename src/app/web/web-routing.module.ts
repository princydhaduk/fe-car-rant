import { TermConditionComponent } from './term-condition/term-condition.component';
// import { ContactComponent } from './../contact/contact.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebComponent } from './web.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { PopularfleetsComponent } from './popularfleets/popularfleets.component';
import { ContactComponent } from './contact/contact.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path:'',
    component:WebComponent,
    children: [
      // {
      //   path:'',
      //   redirectTo:'cars',
      //   pathMatch:'full'
      // },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'about',
        component:AboutComponent
      },
      {
        path:'services',
        component:ServiceComponent
      },
      {
        path:'term-condition',
        component:TermConditionComponent
      },
      {
        path:'booking-detail',
        component:BookingDetailComponent
      },
      {
        path:'bloglist',
        component:BlogComponent
      },
      {
        path:'blogdetail',
        component:BlogDetailComponent
      },
      {
        path:'cars',
        component:PopularfleetsComponent
      },
      {
        path:'contact',
        component:ContactComponent
      },
      {
        path:'payment',
        component:PaymentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
