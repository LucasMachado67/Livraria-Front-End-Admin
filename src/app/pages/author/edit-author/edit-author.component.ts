import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../../components/navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Author } from '../../../Model/Author';
import { AuthorService } from '../../../service/author.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-edit-author',
    standalone: true,
    imports: [
        NavigationComponent,
        FormsModule,
        CommonModule
    ],
    templateUrl: './edit-author.component.html',
    styleUrl: './edit-author.component.scss'
})
export class EditAuthorComponent implements OnInit{

  author = new Author();
  authors:Author[] = [];

  constructor(private service:AuthorService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private toastr:ToastrService){}
  //Método para editar o author
  editAuthor():void{
    this.service.editAuthor(this.author.id, this.author)
      .subscribe((retorno) => {
        let position = this.authors.findIndex((obj) =>
          obj.id = retorno.id
        );
        this.authors[position] = retorno;

        this.author = new Author();
        this.toastr.success("Author updated","Updated!", {
          disableTimeOut: false,
          timeOut: 3000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
          progressBar: true
        });
        this.router.navigate(["/author/all"]);
      });
  }
  //Método para remover o author
  removeAuthor():void{
    
    this.service.deleteAuthor(this.author.id)
    .subscribe((retorno) => {
      let position = this.authors.findIndex(obj =>{
        return obj.id == this.author.id;
      });
      this.authors.splice(position, 1);
      this.author = new Author();
      this.toastr.info("Author removed","Removed!", {
        disableTimeOut: false,
        timeOut: 3000,
        extendedTimeOut: 1000,
        tapToDismiss: true,
        progressBar: true
      });
      this.router.navigate(["/author/all"]);
    });
  }
  //Método para redirecionar para a página mostrando todos os authors
  cancel():void{
    this.router.navigate(["/author/all"]);
  }

  ngOnInit(): void {
    //Rebebendo o id do author de acordo com o selecionado pela posição no all-authors-component
      this.activatedRoute.paramMap.subscribe(params =>{
        let id = params.get('id');
        if(id){
          this.service.getAuthorById(Number(id)).subscribe((data) => {
            this.author = data;
          });
        }
      })
  }

}
