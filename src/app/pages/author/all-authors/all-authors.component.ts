import { Component, OnInit } from '@angular/core';
import { Author } from '../../../Model/Author';
import { NavigationComponent } from '../../../components/navigation/navigation.component';
import { Router,RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthorService } from '../../../service/author.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-authors',
  standalone: true,
  imports: [
    NavigationComponent,
    FormsModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterModule
  ],
  templateUrl: './all-authors.component.html',
  styleUrl: './all-authors.component.scss'
})
export class AllAuthorsComponent implements OnInit{

  author = new Author();
  authors:Author[] = [];

  constructor(private router:Router,private service:AuthorService){}
  ngOnInit(): void {
    this.getAll();
  }
  //Método para pegar a posição do author para editar ou apagar
  selectAuthor(position:number):void{
    this.author = this.authors[position];
    this.router.navigate(["/author/", this.author.id], { state: {author: this.author}});
  }
  //Método mostrando todos os authors disponíveis no banco de dados
  getAll(){
    this.service.allAuthors()
    .subscribe(retorno => this.authors = retorno);
  }

}
