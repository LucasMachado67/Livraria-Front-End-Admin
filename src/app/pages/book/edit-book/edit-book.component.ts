import { Component } from '@angular/core';
import { Book } from '../../../Model/Book';
import { BookService } from '../../../service/book.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '../../../components/navigation/navigation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../Model/Category';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NavigationComponent
  ],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss'
})
export class EditBookComponent {

  book = new Book();
  btnRegister:Boolean = true;
  table:Boolean = true;
  books:Book[] = [];
  selectedImage: File | null = null;

  constructor(private service:BookService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  editBook():void{
    this.service.edit(this.book, this.book.code)
    .subscribe(retorno => {
      
      let position = this.books.findIndex(obj => {
        return obj.code == retorno.code;
      });
 
      this.books[position] = retorno;
      
      this.book = new Book(); 
      
      this.btnRegister = true;
      
      this.table = true;
      
      alert("Book successfully altered!");
    });
  }

  removeBook():void{
    this.service.remove(this.book.code)
    .subscribe(retorno => {
      
      let position = this.books.findIndex(obj => {
        return obj.code == this.book.code;
      });
      this.books.splice(position, 1);
      this.book = new Book(); 
      alert("Book removed!");
      this.router.navigate(['/allBooks']);
    });
  }
  cancel():void{

    this.router.navigate(['/allBooks']);

  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }

  onCategoryChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
          this.book.category = new Category();
          this.book.category.category = checkbox.value;
        } else {
          this.book.category = new Category();
        }
  }

  ngOnInit(): void {

    this.loadBook();
  }

  loadBook(): void {
    const code = Number(this.route.snapshot.paramMap.get('code'));
    if (code) {
      this.service.getBookByCode(code).subscribe(
        (book) => {
          this.book = book;
        },
        (error) => {
          console.error('Erro ao carregar o livro:', error);
        }
      );
    } else {
      console.error('Código do livro não encontrado na rota.');
    }
  }
}
