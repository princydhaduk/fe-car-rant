import { Component, OnInit } from '@angular/core';
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
<<<<<<< HEAD
    fuel: 'Fuel'
=======
    fuel: ''
>>>>>>> ca47c89a2de10b2c84d3f158c40c98e7a6431ed8
  }
  ele: any = [];
  url = '';
  constructor(private api: ApiService, private toastr: ToastrService, private route:Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.api.getCar(this.url).subscribe((res: any) => {
      if (res) {
        res.forEach((ele: any) => {
          ele['img'] = '../../../assets/images/' + ele.Image;
        });
        this.cars = res;
        console.log("responce--->>>", this.cars);
      }
    });
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
    console.log("this.url::", this.url);

    this.getData()
  }

  sendBooking(item: any): void {
    console.log("item--->>", item);

    debugger
    if(!localStorage.getItem('token')){
      debugger
      this.route.navigate(['/login']);
    }
    else{
      this.route.navigate(['/web/home']);
    }

    this.api.set(item);
  }


}
