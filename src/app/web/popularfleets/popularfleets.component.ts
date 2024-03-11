import { Component, OnInit } from '@angular/core';
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
  ele:any = []
  constructor(private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.api.getCar().subscribe((res: any) => {
      // debugger
      if (res.data) {
        res.data.forEach((ele: any) => {
          ele['img'] = '../../../assets/images/' + ele.Image;
        });
        this.cars = res.data;
        console.log("responce--->>>", this.cars);
      }
    });
  }

  sendBooking(item: any): void {
    console.log("item--->>",item);

    this.api.set(item);
  }


}
