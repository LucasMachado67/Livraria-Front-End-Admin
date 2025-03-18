import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Author } from '../Model/Author';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  readonly url = environment.url;
  constructor(private http: HttpClient) {}

  newAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.url + '/author/new', author);
  }

  allAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.url + '/author/all');
  }

  getAuthorById(id: number): Observable<any> {
    return this.http.get(this.url + '/author/' + id);
  }

  editAuthor(id: number | null, author: Author): Observable<Author> {
    return this.http.put<Author>(this.url + '/author/' + id, author);
  }

  deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/author/' + id);
  }
}
