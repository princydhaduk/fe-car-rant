import { NgFor, NgForOf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';

declare var Razorpay: any;


@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  datasource: any = [];
  id = '';
  img = '';
  brand = '';
  model = '';
  price = '';
  displayedColumns: string[] = [
    'id',
    'model',
    'p_location',
    'd_location',
    'p_date',
    'd_date',
    'price',
    'status',
    'action',
  ];
  razorpay: any;
  statusColor: String = 'red'; 
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, private api: ApiService, private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getBookingList();
    this.id = this.api.get()._id;
    this.img = this.api.get().Image;
    this.model = this.api.get().model;
    this.brand = this.api.get().brand;
    this.price = this.api.get().price;
    console.log('res_data:::===', this.api.get());
  }

  getBookingList(): void {
    // debugger
    this.api.getbooking().subscribe((data: any) => {
      if (data) {
        data.bookings.forEach((ele: any, index: number) => {
          // console.log("price---", ele);
          const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          const firstDate: any = new Date(ele.pickup_date);
          const secondDate: any = new Date(ele.return_date);
          let priceMulti: any = ele.price;

          const daysDifference = Math.round(Math.abs((firstDate - secondDate) / oneDay));
          let priceDifference = daysDifference * priceMulti;

          // debugger
          if(data.status ==='success'){
            this.statusColor = 'green';
          }
          else if(data.status === 'pending'){
            this.statusColor = 'yellow';
          }
          else if(data.status === 'cencel'){
            this.statusColor = 'red';
          }
          console.log("color==",this.statusColor);
          

          const car = data.cars.find((item: any) => ele.car_id === item._id)
          ele['id'] = index + 1;
          if (car) {
            ele['img'] = '../../../assets/images' + car.Image;
            ele['brand'] = car.brand;
            ele['model'] = car.model;
            ele['price'] = priceDifference;
          } else {
            ele['img'] = '';
            ele['brand'] = null;
            ele['model'] = null;
            ele['price'] = null;
          }
        })
        this.dataSource = data.bookings;
      }
      console.log("array:::---", this.dataSource);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
  }

  addRowData(row_obj: any): void {
    this.table.renderRows();
  }

  updateRowData(row_obj: any): boolean | any {
  }

  deleteRecords(element: any): void {
    // debugger
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    const options = {
      headers
    };
    this.http.post('http://localhost:5000/api/bookingcancel', { car_id: element.car_id }, options).subscribe((res: any) => {
      if (res.message) {
        this.toastr.success(res.message);
      }
    });
    // this.getBookingList();
  }

  payment(element: any): void {
    const payload = {
      "amount": element.price,
      "currency": "INR"
    }
    this.api.sendPayment(payload).subscribe((res: any) => {
      if (res) {
        // debugger
        console.log("res===>", res);
        this.razorpay = new Razorpay({
          key: 'rzp_test_N1wGv58I7zlIrN',
          order_id: res.data.orderId,
          name: 'SpeedyWheels',
          description: 'Purchase Description',
          image: '',
          handler: function (response: any) {
            handlePaymentSuccess(response);
          },
          prefill: {
            name: 'demo',
            email: 'dhameliyamiral@gmail.com',
            contact: '9978420331'
          },
          theme: {
            color: '#3399cc'
          },
          modal: {
            ondismiss: () => {
              console.log("payment dismissed");
            }
          }
        });
        const handlePaymentSuccess = (response: any) => {
          const payload = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id
          }

          this.api.capturePayment(payload).subscribe((res: any) => {
            if (res) {
              console.log("res==>>>>", res);
            }
          })
        }
        this.razorpay.open()
      }
    });
  }
}
