import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
// import {moment} from 'moment/moment';
import * as moment from 'moment/moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bookForm!: FormGroup;
  id = '';
  img = '';
  model = '';
  brand = '';
  price = '';
  firstDate: any;
  secondDate: any;
  daysDifference: any;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      p_location: ['', Validators.required],
      d_location: ['', (Validators.required, Validators.minLength(4))],
      p_time: ['', Validators.required],
      d_time: ['', Validators.required],
      p_date: ['', Validators.required],
      d_date: ['', Validators.required],
    })
    this.id = this.api.get()._id;
    this.price = this.api.get().price;
    console.log("getdata--->", this.api.get());
    console.log("price--" , this.price);

    this.setValue();
  }

  setValue(): void {
    this.bookForm.controls['p_location'].setValue('');
    this.bookForm.controls['d_location'].setValue('');
    this.bookForm.controls['p_time'].setValue('');
    this.bookForm.controls['d_time'].setValue('');
    this.bookForm.controls['p_date'].setValue('');
    this.bookForm.controls['d_date'].setValue('');
  }
  submitBooking(): void {

    const pick_date = moment(this.bookForm.value.p_date).format("YYYY/MM/DD");
    const drop_date = moment(this.bookForm.value.d_date).format("YYYY/MM/DD");

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate: any = new Date(pick_date);
    const secondDate : any= new Date(drop_date);

    const daysDifference = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    console.log("days---",daysDifference);

    // const priceDifference = daysDifference * this.price;


    const payload = {
      "car_id": this.id,
      "price": this.price,
      "pickup_Location": this.bookForm.value.p_location,
      "dropoff_Location": this.bookForm.value.d_location,
      "date_time_range": `${pick_date}-${drop_date}`,
      "pickup_time": this.bookForm.value.p_time,
      "return_time": this.bookForm.value.d_time,
    }
    console.log("payload====>>>", payload);
    this.api.saveBooking(payload).subscribe((res: any) => {
      if (res.message && res.status === 200) {
        this.toastr.success(res.message);
        this.route.navigate(['/web/booking-detail'])
        console.log("res--->", res);
      }
      else {
        this.toastr.error(res.message);
      }
    });
    this.bookForm.reset();
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.bookForm.controls[controlName].hasError(errorName);
  }
  get p_locationControl() {
    return this.bookForm.get('p_location');
  }
  get d_locationControl() {
    return this.bookForm.get('d_location');
  }
  get p_timeControl() {
    return this.bookForm.get('p_time');
  }
  get d_timeControl() {
    return this.bookForm.get('d_time')
  }

}
