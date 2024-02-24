import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bookForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      p_location: [''],
      d_location: [''],
      p_date: [''],
      d_date: [''],
      p_time: [''],
      d_time: [''],
    })
  }
}
