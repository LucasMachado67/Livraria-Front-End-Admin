import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../Model/Book';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { BookDetailsDTO } from '../Model/BookDetailsDTO'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  readonly url = environment.url;
  constructor(private http:HttpClient) { }

  select():Observable<Book[]>{
    return this.http.get<Book[]>(this.url + "/book/all");
  }

  //FormData permite construir facilmente conjuntos de pares chave/valor
  //para enviar dados via requisições HTTP
  addNewBook(bookData: FormData): Observable<Book> {
      return this.http.post<Book>(this.url + "/book/new", bookData);
  }

  edit(book: Book, imageFile?: File):Observable<Book>{
    const formData = new FormData();
    const bookBlob = new Blob([JSON.stringify(book)], {type: 'application/json'});

    formData.append('book', bookBlob);
    if(imageFile){
      formData.append('image', imageFile);
    }

    return this.http.put<Book>(this.url + "/book/" + book.code, formData);
  }

  remove(code:number) :Observable<void>{
    return this.http.delete<void>(this.url + "/book/" + code);
  }

  books:Book[] = []

  getBookByCode(code: number): Observable<BookDetailsDTO> {
    return this.http.get<BookDetailsDTO>(`${this.url}/book/${code}`);
  }

  formatPrice(priceStr: string): number  {
    //Caso a String tenha ',' Vai trocar para '.';
    const value = String(priceStr).replace(',', '.');
    //Convertendo para parseFloat
    let numberValue = parseFloat(value);
    if(isNaN(numberValue)){
      throw new Error("Valor Inválido");
    }
    return numberValue;
  }
}
