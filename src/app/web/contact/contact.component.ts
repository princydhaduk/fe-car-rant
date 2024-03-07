import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
      name:['',Validators.required],
      email:['',(Validators.required, Validators.email)],
      mobile_no:['',(Validators.required, Validators.minLength(10))],
      message:['',Validators.required],
    })
  }

  sendMessage(){
    const payload = {
      "name":this.contactForm.value.name,
      "email":this.contactForm.value.email,
      "mobile_number":this.contactForm.value.mobile_no,
      "message":this.contactForm.value.mobile_no,
    }
    this.api.saveContact(payload).subscribe((res:any)=>{
      if(res.message){
        this.toastr.success(res.message);
      }
    })
    this.contactForm.reset();
  }
  // this.getContactData();

  get fnameControl(){
    return this.contactForm.get('name');
  }
  get emailControl(){
    return this.contactForm.get('email');
  }
  get mobileControl(){
    return this.contactForm.get('mobile_no');
  }
  get msgControl(){
    return this.contactForm.get('message');
  }
}
