import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../../components/navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Category } from '../../../Model/Category';
import { CategoryService } from '../../../service/category.service';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'app-all-categories',
  standalone: true,
  imports: [
    NavigationComponent,
    FormsModule,
    NgFor,
    RouterLink,
    RouterLinkActive,
    RouterModule,
  ],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.scss',
})
export class AllCategoriesComponent implements OnInit {
  categories: Category[] = [];
  category = new Category();
  totalRecords:number = 0;

  constructor(private service: CategoryService, private router: Router) {}
  //Método para mostrar todas as categorias presentes no banco de dados
  getAll(): void {
    this.service
      .allCategories()
      .subscribe((retorno) => (this.categories = retorno));
  }
  //Método para pegar a categoria pela posição, afim de editar ou deletar a categoria selecionada
  selectCategory(position: number) {
    this.category = this.categories[position];
    console.log('Categoria selecionada:', this.category);
    console.log('ID da categoria:', this.category.id);
    this.router.navigate(['/category/', this.category.id], {
      state: { category: this.category },
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

}
