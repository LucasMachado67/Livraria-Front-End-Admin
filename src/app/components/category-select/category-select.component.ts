import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../../Model/Book';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../Model/Category';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './category-select.component.html',
  styleUrl: './category-select.component.scss'
})
export class CategorySelectComponent implements OnInit{

  book:Book = new Book();
  books:Book[] = [];
  category:Category = new Category();
  categories:Category[] = [];
  selectedCategories:Category[] = [];

  constructor(private categoryService:CategoryService){}

  @Output() choosedCategories = new EventEmitter<Category[]>(); 

  getCategories(){
    this.categoryService.allCategories().subscribe(
      (data) => {
        this.categories = data;
      }
    )
  }

  onCategoryChange(event: Event,category: Category) {
    const checkbox = event.target as HTMLInputElement;
    if(checkbox.checked){
      this.selectedCategories.push(category);
    }else{
      this.selectedCategories = this.selectedCategories.filter(c => c.category !== category.category);
    }

    this.choosedCategories.emit(this.selectedCategories);
  }

  ngOnInit(): void {
    this.getCategories();
  }
  
}
