import { Component } from '@angular/core';
import { Book } from '../../../Model/Book';
import { BookService } from '../../../service/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '../../../components/navigation/navigation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../Model/Category';
import { CategoryService } from '../../../service/category.service';
import { AuthorService } from '../../../service/author.service';
import { Author } from '../../../Model/Author';
import { CategorySelectComponent } from '../../../components/category-select/category-select.component';
import { BookDetailsDTO } from '../../../Model/BookDetailsDTO';

@Component({
    selector: 'app-edit-book',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        NavigationComponent,
        CategorySelectComponent
    ],
    templateUrl: './edit-book.component.html',
    styleUrl: './edit-book.component.scss'
})
export class EditBookComponent {
  book = new Book();
  btnRegister: Boolean = true;
  table: Boolean = true;
  books: Book[] = [];
  selectedImage: File | null = null;
  categoriesSelectedToRegister: Category[] = [];
  categoryPage: Boolean = true;
  authors: Author[] = [];
  categories: Category[] = [];
  author = new Author();
  category = new Category();
  archiveName: string | null = null;
  selectedCategories: Category[] = [];

  constructor(
    private service: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private authorService: AuthorService
  ) {}

  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.archiveName = input.files[0].name;
    }
  }

  loadExistedData() {
    this.archiveName = 'Archive-selected';
  }

  
  editBook(): void {
    this.book.categories = this.categoriesSelectedToRegister;
  
    this.service.edit(this.book, this.selectedImage ?? undefined)
      .subscribe((dto: BookDetailsDTO) => {
        
        this.btnRegister = true;
        this.table = true;
        alert('Book successfully altered!');
      });
  }

  removeBook(): void {
    this.service.remove(this.book.code).subscribe((retorno) => {
      let position = this.books.findIndex((obj) => {
        return obj.code == this.book.code;
      });
      this.books.splice(position, 1);
      this.book = new Book();
      this.btnRegister = true;
      this.table = true;
      alert('Book removed!');
    });
  }
  cancel(): void {
    this.router.navigate(['/book/all']);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }

  onCategoryChange(event: Event, category: Category): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      if (!this.book.categories.some((c) => c.category === category.category)) {
        this.book.categories.push(category);
      }
    } else {
      this.book.categories = this.book.categories.filter(
        (c) => c.category !== category.category
      );
    }
  }

  getCategories(): void {
    this.categoryService
      .allCategories()
      .subscribe((retorno) => (this.categories = retorno));
  }
  getAuthors(): void {
    this.authorService
      .allAuthors()
      .subscribe((retorno) => (this.authors = retorno));
  }
  updateSelectedCategories(categories: Category[]) {
    this.categoriesSelectedToRegister = categories;
    console.log(
      'Categorias atualizadas: ' + JSON.stringify(categories, null, 2)
    );
  }

  ngOnInit(): void {
    this.getCategories();
    this.loadExistedData();
    this.loadBook();
  }

  loadBook(): void {
    const code = Number(this.route.snapshot.paramMap.get('code'));
    
    if (code) {
      this.service.getBookByCode(code).subscribe(
        (dto) => {
          this.book = dto;
          this.selectedCategories = this.book.categories;
        },
        (error) => {
          console.error('Error while trying to load book:', error);
        }
      );
    } else {
      console.error('Book code not Found.');
    }
  }
}
