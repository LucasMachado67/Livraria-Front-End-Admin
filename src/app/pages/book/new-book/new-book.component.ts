import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { Book } from '../../../Model/Book';
import { BookService } from '../../../service/book.service';
import { NavigationComponent } from "../../../components/navigation/navigation.component";
import { Category } from '../../../Model/Category';
import { Author } from '../../../Model/Author';
import { CategoryService } from '../../../service/category.service';
import { AuthorService } from '../../../service/author.service';

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NavigationComponent
],
  templateUrl: './new-book.component.html',
  styleUrl: './new-book.component.scss'
})
export class NewBookComponent {

  book = new Book();
  author = new Author();
  category = new Category();
  books:Book[] = [];
  authors:Author[] = [];
  categories:Category[] = [];
  btnRegister:Boolean = true;
  table:Boolean = true;
  selectedImage: File | null = null;

  constructor(private service:BookService,
    private categoryService:CategoryService,
    private authorService:AuthorService
  ){}

  select():void {
    this.service.select()
    .subscribe(retorno => this.books = retorno);
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

  register():void{
    const formData = new FormData();

    const bookData = {
      ...this.book,   
      author: { id: this.book.author },
      category: {id: this.book.category}
    };

    formData.append('book', new Blob([JSON.stringify(bookData)], {type: 'application/json'}));

    //formData.append('book', new Blob([JSON.stringify(this.book)], { type: 'application/json' }));
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.service.addNewBook(formData).subscribe(response => {
      console.log('Book added successfully', response);
      alert('Book added successfully');
    });
  }

  selectBook(position:number):void{

    this.book = this.books[position];

    this.btnRegister = false;

    this.table = false;
  }

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
      this.btnRegister = true;
      this.table = true;

      alert("Book removed!");

    });
  }
  cancel():void{
    this.book = new Book(); 
    this.btnRegister = true;
    this.table = true;
  }

  getCategories():void{
    this.categoryService.allCategories()
    .subscribe(retorno => this.categories = retorno);
  }
  getAuthors():void{
    this.authorService.allAuthors()
    .subscribe(retorno => this.authors = retorno);
  }
  

  ngOnInit(){
    this.select();
    this.getCategories();
    this.getAuthors();
  }

}
