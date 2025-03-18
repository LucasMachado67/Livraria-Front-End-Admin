import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../../components/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../Model/Category';
import { CategoryService } from '../../../service/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [
    NavigationComponent,
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent implements OnInit{

  category = new Category();
  categories:Category[] = [];
  id:number = 0;

  constructor(
    private service:CategoryService,
    private routeActive:ActivatedRoute,
    private router:Router
  ){}

  editCategory():void{
    this.service.edit(this.category,this.category.id)
    .subscribe((retorno) => {
      let position = this.categories.findIndex((obj) =>
        obj.id == retorno.id
      );

      this.categories[position] = retorno;

      this.category = new Category();

      alert("Category altered!");
      this.router.navigate(['/category/all']);
    });
  }

  removeCategory():void{
     
    this.service.remove(this.category.id)
    .subscribe((retorno) => {
      let position = this.categories.findIndex(obj => {
        
        return obj.id == this.category.id;
      });

      this.categories.splice(position, 1);
      this.category = new Category();
      alert("Category " + this.category.category + " removed");
      this.router.navigate(['/category/all']);
    })
  }

  cancel():void{
    this.router.navigate(['/category/all']);
  }

  ngOnInit() {
    this.routeActive.paramMap.subscribe(params => {
        let id = params.get('id');
        if (id) {
            this.service.getCategoryById(Number(id)).subscribe((data) => {
                this.category = data;
                console.log("Categoria carregada:", this.category);
            });
        }
    });
  }

}
