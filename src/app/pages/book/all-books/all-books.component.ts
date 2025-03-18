import { Component } from '@angular/core';
import { NavigationComponent } from "../../../components/navigation/navigation.component";
import { Book } from '../../../Model/Book';
import { BookService } from '../../../service/book.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [
    NavigationComponent,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.scss'
})
export class AllBooksComponent {

  book = new Book();
  table:Boolean = true;
  books:Book[] = [];
  selectedImage: File | null = null;

  constructor(private service:BookService,
    private router: Router
  ){}

  select():void {
    this.service.select()
    .subscribe(retorno => this.books = retorno);
  }
  selectBook(position:number):void{

    this.book = this.books[position];
    this.router.navigate(['/allBooks', this.book.code]);
    
  }

  ngOnInit(){
    this.select();
  }
}
