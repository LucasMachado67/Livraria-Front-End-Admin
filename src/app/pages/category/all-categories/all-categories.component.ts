import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../../components/navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../Model/Category';
import { CategoryService } from '../../../service/category.service';
import {
  Router,
  RouterModule,
} from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-all-categories',
    standalone: true,
    imports: [
        NavigationComponent,
        FormsModule,
        RouterModule,
        TableModule,
        ButtonModule
    ],
    templateUrl: './all-categories.component.html',
    styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {
  categories: Category[] = [];
  category = new Category();
  category1!: Category[];
  allCategories: any[] = [];
  totalCategories: number = 0;
  first = 0;
  code:number = 0;
  rows: number = 0;

  constructor(private service: CategoryService, private router: Router) {}
  //Método para mostrar todas as categorias presentes no banco de dados
  getAll(): void {
    this.service
      .allCategories()
      .subscribe((retorno) => (this.categories = retorno));
  }
  //Antigo Método para pegar a categoria pela posição, afim de editar ou deletar a categoria selecionada
  selectCategory(position: number) {
    this.category = this.categories[position];
    console.log('Categoria selecionada:', this.category);
    console.log('ID da categoria:', this.category.id);
    this.router.navigate(['/category/', this.category.id], {
      state: { category: this.category },
    });
  }
  //Novo Método para pegar a categoria pelo diretamente pelo id
  // selectCategory(id: number | null){
  //   //Validação contra null
  //   if(id == null ){
  //      return;
  //   }
  //   const selectedCategory = this.categories.find(c => c.id === id);

  //   if(selectedCategory){
  //     this.category = selectedCategory;
  //     this.router.navigate(['/category/', this.category.id], {
  //       state: {category: this.category},
  //     });
  //   }
  // }

  ngOnInit(): void {
    this.getAll();
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
    return this.category1 ? this.first + this.rows >= this.category1.length : true;
  }

  isFirstPage(): boolean {
    return this.category1 ? this.first === 0 : true;
  }

}
