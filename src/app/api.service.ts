import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  getPostData() {
    // let url = '';
    // return this.http.get(url);
  }

  saveData(payload: any) {
    let url = 'http://localhost:5000/api/registrations';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = {
      headers
    };
    return this.http.post(url, payload, options);
  }

  saveLoginData(payload:any) {
    let url = 'http://localhost:5000/api/login';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = {
      headers
    };
    return this.http.post(url,payload,options);
  }

  saveForgotEmail(payload:any){
    let url = 'http://localhost:5000/api/ForgotPasswordEmail';
    return this.http.post(url,payload);
  }

  saveForgetOtp(payload:any){
    let url = 'http://localhost:5000/api/ForgotPasswordOtp';
    return this.http.post(url,payload);
  }

  saveUpdatePass(payload:any){
    let url = 'http://localhost:5000/api/updatePassword';
    return this.http.post(url,payload);
  }

  saveContact(payload:any){
    let url = 'http://localhost:5000/api/contact';
    return this.http.post(url,payload);
  }

  saveBooking(payload:any){
    let url = '';
    return this.http.post(url,payload);
  }
}
