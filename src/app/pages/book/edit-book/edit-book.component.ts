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
    CategorySelectComponent,
  ],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss',
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

  editBook(): void {
    this.book.categories = this.categoriesSelectedToRegister;

    this.service
      .edit(this.book, this.selectedImage ?? undefined)
      .subscribe((dto: Book) => {
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
    this.loadBook();
  }

  loadBook(): void {
    const code = Number(this.route.snapshot.paramMap.get('code'));

    this.service.getBookByCode(code).subscribe(
      (data: BookDetailsDTO) => {
        this.book.code = data.code;
        this.book.title = data.title;
        this.book.year = data.year;
        this.book.price = data.price;
        this.book.pages = data.pages;
        this.book.language = data.language;
        this.book.bookCover = data.bookCover;
        this.book.image = data.image;
        this.book.quantity = data.quantity;
        this.book.description = data.description;
        this.book.author = {
          id: data.authorId,
          author: data.authorName,
        };
        const categoryArray = data.categories.split(',').map((c) => c.trim());
        this.book.categories = this.categories.filter(
          (cat) => categoryArray.includes(cat.category)
        );
      },
      (error) => {
        console.error('Error while trying to load book:', error);
      }
    );
  }

  loadCategories() {
    this.categoryService.allCategories().subscribe((categories) => {
      this.categories = categories; // Aqui você carrega todas as categorias possíveis
    });
  }
}
