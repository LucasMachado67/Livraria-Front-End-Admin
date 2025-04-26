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
import { CategorySelectComponent } from "../../../components/category-select/category-select.component";
import { NgxMaskDirective } from 'ngx-mask';
import { BookValidation } from '../../../Utils/Validations/book.validation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NavigationComponent,
    CategorySelectComponent,
    NgxMaskDirective
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
  categoryPage:Boolean = true;
  selectedImage: File | null = null;
  categoriesSelectedToRegister: Category [] = [];

  //Variaveis para colocar o tipo de dado correto e validação de inputs
  year:string = "";
  price:string = "";
  pages:string = "";
  quantity:string = "";

  constructor(private service:BookService,
    private categoryService:CategoryService,
    private authorService:AuthorService,
    private validation:BookValidation,
    private toastr:ToastrService
  ){}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }
  //Adiciona a categoria escolhida para o array de categorias que o livro irá conter
  onCategoryChange(event: Event, category: Category): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      // Adiciona categoria se não estiver na lista
      if (!this.book.categories.some(c => c.category === category.category)) {
        this.book.categories.push(category);
      }
    } else {
      // Remove categoria da lista
      this.book.categories = this.book.categories.filter(
        c => c.category !== category.category
      );
    }
  }
  //Método para registrar novos livros
  register():void{
    //Passando as variraveis de Year,Price,Pages,Quantity que eram String para Number, por conta do ngx-mask;
    this.book.year = Number(this.year);
    //Método formatPrice para converter a string do price para float corretamente
    this.book.price = this.service.formatPrice(this.price);
    this.book.pages = Number(this.pages);
    this.book.quantity = Number(this.quantity);
    //Chamando o método para validar os dados que são Number
    if(!this.validation.registerValidationForNumberDataType(this.book.year, this.book.quantity, this.book.price, this.book.pages)){
      return;
    }
    //verificando as categorias selecionadas e salvando em book.categories
    this.book.categories = this.categoriesSelectedToRegister;
    const formData = new FormData();
    const bookData = {
      ...this.book,   
      author: { id: this.book.author },
      categories: this.book.categories.map(c => ({ id: c.id }))
    };
    formData.append('book', new Blob([JSON.stringify(bookData)], {type: 'application/json'}));
    //formData.append('book', new Blob([JSON.stringify(this.book)], { type: 'application/json' }));
    //Adicionando a imagem ao formData
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    //Chamando o serviço para registrar o livro
    this.service.addNewBook(formData).subscribe(response => {
      //Alert personalizado do toastr
      this.toastr.success(this.book.title + " added","Success!", {
          disableTimeOut: false,
          timeOut: 3000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
      });
    });
  }
  //Método para pegar as categorias salvas no banco de dados
  getCategories():void{
    this.categoryService.allCategories()
    .subscribe(retorno => this.categories = retorno);
  }
  //Método para pegar os authors salvos no banco de dados
  getAuthors():void{
    this.authorService.allAuthors()
    .subscribe(retorno => this.authors = retorno);
  }
  //Método para atualizar quais categorias o usuário está selecionando para o livro
  updateSelectedCategories(categories : Category[]){
    this.categoriesSelectedToRegister = categories;
    console.log("Categorias atualizadas: " + JSON.stringify(categories, null, 2));
  }
  
  ngOnInit(){
    this.getCategories();
    this.getAuthors();
  }

}
