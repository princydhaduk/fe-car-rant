import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit{
  commentForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private api:ApiService, private toastr:ToastrService){}

  ngOnInit(): void {
      this.commentForm = this.formBuilder.group({
        name: ['',Validators.required],
        email: ['',Validators.required],
        message: ['',Validators.required],
      })
  }

  sendComment(){
    const payload = {

    }
  }
}
