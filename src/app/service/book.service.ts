import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../Model/Book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url:string = "https://livrariaback-end-production.up.railway.app";
  constructor(private http:HttpClient) { }

  select():Observable<Book[]>{
    return this.http.get<Book[]>(this.url + "/books");
  }


  addNewBook(bookData: FormData): Observable<Book> {
      return this.http.post<Book>(this.url + "/newBook", bookData);
  }

  edit(obj:Book, code:number):Observable<Book>{
    return this.http.put<Book>(this.url + "/books/" + code, obj);
  }

  remove(code:number) :Observable<void>{
    return this.http.delete<void>(this.url + "/books/" + code);
  }

  books:Book[] = []

  getBookByCode(code: number): Observable<any> {
    return this.http.get(`${this.url}/books/${code}`);
  }
}
