import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private api:ApiService, private toastr:ToastrService){
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name:[''],
      email:[''],
      mobile_no:[''],
      message:[''],
    })
  }

  sendMessage(){
    const payload = {
      "name":this.contactForm.value.name,
      "email":this.contactForm.value.email,
      "mobile_number":this.contactForm.value.mobile_no,
      "message":this.contactForm.value.message,
    }
    this.api.saveContact(payload).subscribe((res:any)=>{
      if(res.message){
        this.toastr.success(res.message);
      }
    })
    this.contactForm.reset();
  }

}
