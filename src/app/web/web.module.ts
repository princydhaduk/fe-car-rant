import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { PopularfleetsComponent } from './popularfleets/popularfleets.component';
import { ContactComponent } from './contact/contact.component';
import { ServiceComponent } from './service/service.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TermConditionComponent } from './term-condition/term-condition.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ServiceComponent,
    BlogComponent,
    BlogDetailComponent,
    PopularfleetsComponent,
    ContactComponent,
    TermConditionComponent,
    BookingDetailComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class WebModule { }
