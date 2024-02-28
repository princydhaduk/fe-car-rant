import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bookForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private api:ApiService) {
  }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      p_location: ['', Validators.required],
      d_location: ['', Validators.required],
      p_date: ['', Validators.required],
      d_date: ['', Validators.required],
      p_time: ['', Validators.required],
      d_time: ['', Validators.required],
    })
  }

  submitBooking(): void{
    const payload = {
      "pickup_Location": this.bookForm.value.p_location,
      "dropoff_Location": this.bookForm.value.d_location,
      "pickup_time": this.bookForm.value.p_time,
      "return_time": this.bookForm.value.d_time,
      "pickup_date": this.bookForm.value.p_date,
      "return_date": this.bookForm.value.d_date,
    }
    // console.log(payload);

    this.api.saveBooking(payload).subscribe((res:any) => {
      if(res){
        console.log("res--->",res);
      }
    });

    this.bookForm.reset();
  }

}
