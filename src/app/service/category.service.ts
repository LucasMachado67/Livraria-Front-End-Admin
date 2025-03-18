import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../Model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly url = environment.url;
  constructor(private http:HttpClient) { }

  newCategory(category: Category):Observable<Category>{
    return this.http.post<Category>(this.url + "/category/new", category);
  }

  allCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.url + "/category/all");
  }

  edit(category:Category, id:number|null):Observable<Category>{
    return this.http.put<Category>(this.url + "/category/" + id, category);
  }

  remove(id:number|null):Observable<void>{
    return this.http.delete<void>(this.url + "/category/" + id);
  }

  getCategoryById(id:number):Observable<any>{
    return this.http.get(this.url + "/category/" + id);
  }
}
