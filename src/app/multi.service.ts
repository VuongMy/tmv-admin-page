import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Clinic } from './gioi-thieu/gioi-thieu.component';
@Injectable({
  providedIn: 'root'
})
export class MultiService {

  constructor(private http: HttpClient) { }

  getAllService(pageNum: any){
    const url = `${environment.API}/api/service/get-service?pageNum=${pageNum}&pageSize=10`;
    return this.http.get(url);
  }

  uploadFile(body: any){
    const url = `${environment.API}/api/file/`;
    return this.http.post(url, body);
  }

  addNewService(body: any){
    const url = `${environment.API}/api/service/update-service`;
    return this.http.post(url, body);
  }

  deleteService(body: any){
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: body,
    };
    const url = `${environment.API}/api/service/update-service`;
    return this.http.delete(url, options);
  }


  ////Doctor
  getAllDoctors(pageNum: any){
    const url = `${environment.API}/api/doctor/get-doctors-team?pageNum=${pageNum}&pageSize=100`;
    return this.http.get(url);
  }

  addNewDoctor(body: any){
    const url = `${environment.API}/api/doctor/update-doctor`;
    return this.http.post(url, body);
  }

  deleteDoctor(body: any){
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: body,
    };
    const url = `${environment.API}/api/doctor/update-doctor`;
    return this.http.delete(url, options);
  }


  //Introduction
  getClinic(){
    const url = `${environment.API}/api/intro/get-my-clinic`;
    return this.http.get(url);
  }

  getIntro(){
    const url = `${environment.API}/api/intro/get-my-intro`;
    return this.http.get(url);
  }

  getOffice(){
    const url = `${environment.API}/api/intro/get-my-office`;
    return this.http.get(url);
  }

  updateClinic(body){
    const url = `${environment.API}/api/intro/update-my-clinic`;
    return this.http.post(url, body);
  }
  updateIntro(body){
    const url = `${environment.API}/api/intro/update-my-intro`;
    return this.http.post(url, body);
  }
  updateOffice(body){
    const url = `${environment.API}/api/intro/update-my-office`;
    return this.http.post(url, body);
  }
}
