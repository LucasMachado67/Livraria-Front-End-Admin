import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() selected: Category[] = [];
  @Output() choosedCategories = new EventEmitter<Category[]>(); 

  getCategories(){
    this.categoryService.allCategories().subscribe(data => {
      this.categories = data;

      this.selectedCategories = this.categories.filter(c => 
        Array.isArray(this.selected) && this.selected.some(sel => sel.category === c.category)
      );

      this.choosedCategories.emit(this.selectedCategories);
    })
  }
  isCategorySelected(category: Category): boolean {
    return this.selectedCategories.some(sc => sc.category === category.category);
  }

  onCategoryChange(event: Event,category: Category) {
    const checkbox = event.target as HTMLInputElement;
    if(checkbox.checked){
      if (!this.selectedCategories.some(sc => sc.category === category.category)) {
        this.selectedCategories.push(category);
      }
    }else{
      this.selectedCategories = this.selectedCategories.filter(c => c.category !== category.category);
    }

    this.choosedCategories.emit(this.selectedCategories);
  }

  ngOnInit(): void {
    this.getCategories();
  }
  
}
