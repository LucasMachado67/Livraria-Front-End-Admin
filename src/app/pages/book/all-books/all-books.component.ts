import { Component } from '@angular/core';
import { NavigationComponent } from "../../../components/navigation/navigation.component";
import { Book } from '../../../Model/Book';
import { BookService } from '../../../service/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';


@Component({
    selector: 'app-all-books',
    standalone: true,
    imports: [
        NavigationComponent,
        CommonModule,
        FormsModule,
        RouterLink,
        RouterLinkActive,
        RouterModule
    ],
    templateUrl: './all-books.component.html',
    styleUrl: './all-books.component.scss'
})
export class AllBooksComponent {

  book = new Book();
  table:Boolean = true;
  books:Book[] = [];
  selectedImage: File | null = null;

  constructor(private service:BookService
  ){}
  //Método buscando os livros do banco de dados
  select():void {
    this.service.select()
    .subscribe(retorno => this.books = retorno);
  }

  ngOnInit(){
    this.select();
  }
}
