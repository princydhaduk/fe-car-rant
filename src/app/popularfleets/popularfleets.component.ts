import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { elementAt } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-popularfleets',
  templateUrl: './popularfleets.component.html',
  styleUrls: ['./popularfleets.component.scss']
})

export class PopularfleetsComponent implements OnInit {
  cars: any = [];
  selectFilter: any = {
    brand: '',
    price: '',
    seats: '',
    fuel: ''
  }
  filters: any = {
    brand:'Brand',
    price: 'Price',
    seats: 'Seats',
    fuel: 'Fuel'
  }
  ele: any = [];
  url = '';
  subscribeForm: FormGroup;
  constructor(private api: ApiService, private toastr: ToastrService, private route:Router) { 
    this.subscribeForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
    })
    // if(this.cars.length == 0){
    //   this.cars.push('Data is not Found');
    // }
    // else{
    //   this.cars = this.applyFilter;
    // }
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.api.getCar(this.url).subscribe((res: any) => {
      if (res) {
        this.cars = res;
        if(this.api.getData() !== undefined){
          this.cars = this.api.getData().carlist; 
        }
        this.cars.forEach((ele: any) => {
          ele['img'] = '../../../assets/images/' + ele.Image;
        });
        console.log("responce--->>>", this.cars);
        // console.log("getdata-->",this.api.getData());
      }
    });
  }

  sendSubscribe(): void{
    const payload = { 
      "email" : this.subscribeForm.value.email,
    }
    // console.log("payload....",payload);
    this.api.saveSubscribe(payload).subscribe((res: any) => {
      if(res.message){
        this.toastr.success(res.message);
        console.log("responce===",res);
      }
    });
    this.subscribeForm.reset();
  }

  applyFilter() {
    // debugger
    this.url = "";
    if (this.selectFilter.brand !== '') {
      this.url = this.url + "?brand=" + this.selectFilter.brand
    }
    if (this.selectFilter.price !== '') {
      this.url = this.url + "&price=" + `${this.selectFilter.price} - ${this.selectFilter.price}`
    }
    if (this.selectFilter.seats !== '') {
      this.url = this.url + "&seats=" + this.selectFilter.seats
    }
    if (this.selectFilter.fuel !== '') {
      this.url = this.url + "&fuel=" + this.selectFilter.fuel
    }
    // console.log("this.url::", this.url);
    this.getData()
  }

  sendBooking(item: any): void {
    console.log("items--->>", item);

    // debugger
    if(!localStorage.getItem('token')){
      // debugger
      this.route.navigate(['/login']);
    }
    else{
      this.route.navigate(['/web/home']); 
    }

    this.api.set(item);
  }
}


