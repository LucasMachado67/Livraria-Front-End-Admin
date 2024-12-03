import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../Model/Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url:string = "https://livrariaback-end-production.up.railway.app";
  constructor(private http:HttpClient) { }

  addNewAdmin(adminData: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.url + "/newAdmin", adminData);
  }

  select():Observable<Admin[]>{
    return this.http.get<Admin[]>(this.url + "/allAdmins");
  }

  edit(obj:Admin, id:number):Observable<Admin>{
    return this.http.put<Admin>(this.url + "/allAdmins/" + id, obj);
  }

  remove(id:number) :Observable<void>{
    return this.http.delete<void>(this.url + "/allAdmins/" + id);
  }

  admins:Admin[] = []

  getAdminById(id: number): Observable<any> {
    return this.http.get(`${this.url}/allAdmins/${id}`);
  }
}
