import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { NgOtpInputModule } from 'ng-otp-input';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { CarComponent } from './car/car.component';
import { CarSingleComponent } from './car-single/car-single.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';
import { ToastrModule } from 'ngx-toastr';
import { PopularfleetsComponent } from './popularfleets/popularfleets.component';
import { BookingComponent } from './booking/booking.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ServiceComponent,
    CarComponent,
    CarSingleComponent,
    BlogComponent,
    ContactComponent,
    BlogSingleComponent,
    PopularfleetsComponent,
    BookingComponent,
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    HttpClientModule,
    NgOtpInputModule,
    ToastrModule.forRoot()
  ]
})
export class WebModule { }
