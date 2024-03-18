import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  data:any;
  constructor(private http: HttpClient) {
  }

  getPostData() {
    // let url = '';
    // return this.http.get(url);
  }

  saveData(payload: any): Observable<any> {
    let url = 'http://localhost:5000/api/registrations';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = {
      headers
    };
    return this.http.post(url, payload, options);
  }

  saveLoginData(payload:any): Observable<any> {
    let url = 'http://localhost:5000/api/login';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    const options = {
      headers
    };
    return this.http.post(url,payload,options);
  }

  saveForgotEmail(payload:any): Observable<any>{
    let url = 'http://localhost:5000/api/ForgotPasswordEmail';
    return this.http.post(url,payload);
  }

  saveForgetOtp(payload:any): Observable<any>{
    let url = 'http://localhost:5000/api/ForgotPasswordOtp';
    return this.http.post(url,payload);
  }

  saveUpdatePass(payload:any): Observable<any>{
    let url = 'http://localhost:5000/api/updatePassword';
    return this.http.post(url,payload);
  }

  saveContact(payload:any): Observable<any>{
    let url = 'http://localhost:5000/api/contact';
    return this.http.post(url,payload);
  }

  saveBooking(payload:any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    const options = {
      headers
    };
    let url = 'http://localhost:5000/api/bookingcars';
    return this.http.post(url,payload,options);
  }

  getCar(select : any): Observable<any>{
    let url = "http://localhost:5000/api/cardisplay" + select;
    return this.http.get(url);
  }

  saveCommment(payload:any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    const options = {
      headers
    };
    let url = 'http://localhost:5000/api/addComments';
    return this.http.post(url,payload,options);
  }
  getComment(): Observable<any>{
    let url = "http://localhost:5000/api/displayComment";
    return this.http.get(url);
  }

  getbooking(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    const options = {
      headers
    };
    let url = "http://localhost:5000/api/bookingdisplay";
    return this.http.get(url,options);
  }

  sendPayment(payload :any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    const options = {
      headers
    };
    let url = 'http://localhost:5000/api/payment';
    return this.http.post(url, payload ,options);
  }

  capturePayment(payload :any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    const options = {
      headers
    };
    let url = 'http://localhost:5000/api/capture_payment';
    return this.http.post(url, payload ,options);
  }

  saveSubscribe(payload: any): Observable<any>{
    let url = "http://localhost:5000/api/subscribation";
    return this.http.post(url, payload);    
  }

  set(item: any){
    this.data = item;
  }

  get(){
    return this.data;
  }

}
