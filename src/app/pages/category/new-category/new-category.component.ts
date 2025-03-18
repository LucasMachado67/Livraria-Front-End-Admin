import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../../components/navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Category } from '../../../Model/Category';
import { CategoryService } from '../../../service/category.service';

@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [NavigationComponent, FormsModule, NgIf, NgFor],
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.scss',
})
export class NewCategoryComponent implements OnInit {
  category = new Category();
  btnRegister: Boolean = true;
  table: Boolean = true;
  categories: Category[] = [];

  constructor(private service: CategoryService) {}

  getAll():void{
    this.service.allCategories()
    .subscribe(retorno => this.categories = retorno);
  }

  register(){
    
    this.service.newCategory(this.category).subscribe(response => {
      console.log('New category Added!', response);
      alert('New category Added!')
    });
    this.category.category = "";
  }

  ngOnInit(): void {
    this.getAll();
  }
}
