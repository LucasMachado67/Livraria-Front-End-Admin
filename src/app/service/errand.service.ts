import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Errand } from '../Model/Errand';

@Injectable({
  providedIn: 'root'
})
export class ErrandService {

  private url:string = "http://localhost:8080";
  constructor(private http:HttpClient) { }


  select():Observable<Errand[]>{
    return this.http.get<Errand[]>(this.url + "/allErrands");
  }

  remove(code:number) :Observable<void>{
    return this.http.delete<void>(this.url + "/allErrands/" + code);
  }

  errands:Errand[] = []

  getErrandByCode(code: number): Observable<any> {
    return this.http.get(`${this.url}/allErrands/${code}`);
  }
}
