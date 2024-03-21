import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!:FormGroup;
  subscribeForm: FormGroup;
  constructor(private formBuilder:FormBuilder, private api:ApiService, private toastr:ToastrService){
    this.subscribeForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
    })
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name:['',Validators.required],
      email:['',(Validators.required, Validators.email)],
      mobile_no:['',(Validators.required, phoneNumberValidator())],
      message:['',Validators.required],
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
  // this.getContactData();

  sendSubscribe(): void{
    const payload = { 
      "email" : this.subscribeForm.value.email,
    }
    // console.log("payload....",payload);
    
    this.api.saveSubscribe(payload).subscribe((res: any) => {
      if(res.message){
        this.toastr.success(res.message);
        console.log("responce===",res);
      }
    });
    this.subscribeForm.reset();
  }

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
export function phoneNumberValidator() {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const mobileControl = control.value;
    const minLength = 10;
    const maxLength = 10;

    if (!mobileControl || mobileControl.length < minLength || mobileControl.length > maxLength) {
      return { 'invalidPhoneNumber': { value: control.value } };
    }
    return null;
  };
}
