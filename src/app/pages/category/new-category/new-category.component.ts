import { Component } from '@angular/core';
import { NavigationComponent } from '../../../components/navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Category } from '../../../Model/Category';
import { CategoryService } from '../../../service/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-new-category',
    imports: [NavigationComponent, FormsModule, NgIf],
    templateUrl: './new-category.component.html',
    styleUrl: './new-category.component.scss'
})
export class NewCategoryComponent {
  category = new Category();
  btnRegister: Boolean = true;
  table: Boolean = true;
  categories: Category[] = [];

  constructor(private service: CategoryService,
    private toastr:ToastrService
  ) {}
  //Método para criar uma nova categoria
  register(){
    this.service.newCategory(this.category).subscribe(response => {
      this.toastr.success("Nova categoria adicionada","Success!", {
        disableTimeOut: false,
        timeOut: 3000,
        extendedTimeOut: 1000,
        tapToDismiss: true,
        progressBar: true
    });
    });
    this.category.category = "";
  }

}
