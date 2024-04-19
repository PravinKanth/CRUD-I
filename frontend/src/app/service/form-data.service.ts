import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor(private http: HttpClient) { }

  submitFormData(formData: FormData): Observable<any> {
    // return this.http.post<any>('/api/submitFormData', formData);
    console.log("hey");
    console.log(formData);
    return this.http.post<any>('http://localhost:3000/postdata', formData);
  }

  getFormData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/getdata');
  }

  postDelete(id:string):Observable<any>{
    return this.http.post<any>('http://localhost:3000/postdelete',{id:id});
  }
}