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
  comments:any = [];
  constructor(private formBuilder:FormBuilder, private api:ApiService, private toastr:ToastrService){}

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      message: ['',Validators.required],
    });

    this.api.getComment().subscribe((res: any) => {
      if(res.data){
        this.comments = res.data;
      }
    });
  }

  sendComment(){
    const payload = {
      "name": this.commentForm.value.name,
      "email": this.commentForm.value.email,
      "message": this.commentForm.value.message,
    }
    this.api.saveCommment(payload).subscribe((res: any) => {
      if(res.message && res.data){
        this.toastr.success(res.message);
        console.log("comments::::",this.comments);

      }
      else{
        this.toastr.error(res.message);
      }
    })
    this.commentForm.reset();
  }

}
