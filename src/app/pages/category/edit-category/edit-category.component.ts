import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../../components/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../Model/Category';
import { CategoryService } from '../../../service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private router:Router,
    private toastr:ToastrService
  ){}
  //Método para editar a categoria selecionada
  editCategory():void{
    this.service.edit(this.category,this.category.id)
    .subscribe((retorno) => {
      let position = this.categories.findIndex((obj) =>
        obj.id == retorno.id
      );
      this.categories[position] = retorno;
      this.category = new Category();
      this.toastr.success("Category Updated","Updated!", {
        disableTimeOut: false,
        timeOut: 3000,
        extendedTimeOut: 1000,
        tapToDismiss: true,
        progressBar: true
      });
      this.router.navigate(['/category/all']);
    });
  }
  //Método para remover a categoria selecionada
  removeCategory():void{
     
    this.service.remove(this.category.id)
    .subscribe((retorno) => {
      let position = this.categories.findIndex(obj => {
        
        return obj.id == this.category.id;
      });

      this.categories.splice(position, 1);
      this.category = new Category();
      this.toastr.info("Category removed","Removed!", {
        disableTimeOut: false,
        timeOut: 3000,
        extendedTimeOut: 1000,
        tapToDismiss: true,
        progressBar: true
      });
      this.router.navigate(['/category/all']);
    })
  }
  //Método para voltar a página mostrando todas as categorias
  cancel():void{
    this.router.navigate(['/category/all']);
  }

  ngOnInit() {
    //recebendo o id da categoria selcionada na outra página
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
