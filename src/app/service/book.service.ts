import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../Model/Book';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  readonly url = environment.url;
  constructor(private http:HttpClient) { }

  select():Observable<Book[]>{
    return this.http.get<Book[]>(this.url + "/book/all");
  }


  addNewBook(bookData: FormData): Observable<Book> {
      return this.http.post<Book>(this.url + "/book/new", bookData);
  }

  edit(obj:Book, code:number):Observable<Book>{
    return this.http.put<Book>(this.url + "/book/" + code, obj);
  }

  remove(code:number) :Observable<void>{
    return this.http.delete<void>(this.url + "/book/" + code);
  }

  books:Book[] = []

  getBookByCode(code: number): Observable<any> {
    return this.http.get(`${this.url}/book/${code}`);
  }
}
