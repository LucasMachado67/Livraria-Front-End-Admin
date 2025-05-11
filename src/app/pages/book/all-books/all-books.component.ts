import { Component } from '@angular/core';
import { NavigationComponent } from "../../../components/navigation/navigation.component";
import { Book } from '../../../Model/Book';
import { BookService } from '../../../service/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-all-books',
    standalone: true,
    imports: [
        NavigationComponent,
        CommonModule,
        FormsModule,
        RouterLink,
        RouterLinkActive,
        RouterModule,
        TableModule,
        ButtonModule
    ],
    templateUrl: './all-books.component.html',
    styleUrl: './all-books.component.scss'
})
export class AllBooksComponent {

  book = new Book();
  table:Boolean = true;
  books:Book[] = [];
  selectedImage: File | null = null;
  bookPagination!: Book[];
  allBooks: any[] = [];
  totalBooks: number = 0;
  first = 0;
  code:number = 0;
  rows: number = 0;

  constructor(private service:BookService,
    private router:Router
  ){}
  //Método buscando os livros do banco de dados
  select():void {
    this.service.select()
    .subscribe(retorno => this.books = retorno);
  }
  //Seleciona o livro para editar
  selectBook(position: number) {
    this.book = this.books[position];
    this.router.navigate(['/book/', this.book.code], {
      state: { book: this.book },
    });
  }

  ngOnInit(){
    this.select();
  }

  
  //Métodos para a pagination
  next() {
    this.first = this.first - this.rows;
  }
  prev() {
    this.first = this.first - this.rows;
  }
  reset() {
    this.first = 0;
  }
  pageChange(event: { first: number; rows: number; }) {
    this.first = event.first;
    this.rows = event.rows;
  }
  isLastPage(): boolean {
    return this.bookPagination ? this.first + this.rows >= this.bookPagination.length : true;
  }

  isFirstPage(): boolean {
    return this.bookPagination ? this.first === 0 : true;
  }
}
