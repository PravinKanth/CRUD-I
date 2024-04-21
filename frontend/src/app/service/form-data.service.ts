import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  base_url= "http://localhost:3000"

  constructor(private http: HttpClient) { }
  

  submitFormData(formData: FormData){
    return this.http.post<any>(`${this.base_url}/postdata`, formData);
  }

  getFormData(){
    return this.http.get<any>(`${this.base_url}/getdata`);
  }

  postDelete(id:string){
    return this.http.post<any>(`${this.base_url}/postdelete`,{id:id});
  }
}