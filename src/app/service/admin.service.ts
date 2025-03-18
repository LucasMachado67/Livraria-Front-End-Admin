import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../Model/Admin';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly url = environment.url;
  constructor(private http:HttpClient) { }

  addNewAdmin(adminData: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.url + "/admin/new", adminData);
  }

  select():Observable<Admin[]>{
    return this.http.get<Admin[]>(this.url + "/admin/all");
  }

  edit(obj:Admin, id:number|null):Observable<Admin>  {
    return this.http.put<Admin>(this.url + "/admin/" + id, obj);
  }

  remove(id:number|null) :Observable<void>{
    return this.http.delete<void>(this.url + "/admin/" + id);
  }

  admins:Admin[] = []

  getAdminById(id: number|null): Observable<any> {
    return this.http.get(`${this.url}/admin/${id}`);
  }
}
