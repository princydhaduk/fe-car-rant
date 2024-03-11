import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  datasource:any = [];
  id= '';
  img= '';
  brand= '';
  model= '';
  displayedColumns: string[] = [
    'id',
    'model',
    'p_location',
    'd_location',
    'p_date',
    'd_date',
    'action',
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, private api:ApiService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getBookingList();
    this.id = this.api.get()._id;
    this.img = this.api.get().Image;
    this.model = this.api.get().model;
    this.brand = this.api.get().brand;
    console.log('res_data:::===',this.api.get());
  }

  getBookingList(){
    this.api.getbooking().subscribe((data:any) => {
      debugger
      if(data){
        data.bookings.forEach((ele: any, index: number) => {
          const car =  data.cars.find((item:any)=> ele.car_id === item._id)
          ele['id'] = index + 1;
          if(car) {
            ele['img'] = '../../../assets/images/' + car.Image;
            ele['brand'] = car.brand;
            ele['model'] = car.model;
          } else {
            ele['img'] = '';
            ele['brand'] = null;
            ele['model'] = null;
          }
        })
        this.dataSource = data.bookings;
      }
      console.log("array:::---",this.dataSource);
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
    // this.dataSource.data = this.dataSource.data.filter((value: any) => {
    //   if (value.id === row_obj.id) {
    //     value.Name = row_obj.Name;
    //     value.Position = row_obj.Position;
    //     value.Email = row_obj.Email;
    //     value.Mobile = row_obj.Mobile;
    //     value.DateOfJoining = row_obj.DateOfJoining;
    //     value.Salary = row_obj.Salary;
    //     value.Projects = row_obj.Projects;
    //     value.imagePath = row_obj.imagePath;
    //   }
    //   return true;
    // });
  }

  deleteRowData(row_obj: any): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.plate_number !== row_obj.plate_number;
    });
  }
}
