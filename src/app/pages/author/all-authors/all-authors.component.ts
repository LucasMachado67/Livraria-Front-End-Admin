import { Component, OnInit } from '@angular/core';
import { Author } from '../../../Model/Author';
import { NavigationComponent } from '../../../components/navigation/navigation.component';
import { Router } from '@angular/router';
import { AuthorService } from '../../../service/author.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-authors',
  standalone: true,
  imports: [
    NavigationComponent,
    FormsModule,
    CommonModule
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

  selectAuthor(position:number):void{
    this.author = this.authors[position];
    this.router.navigate(["/author/", this.author.id], { state: {author: this.author}});
  }

  getAll(){
    this.service.allAuthors()
    .subscribe(retorno => this.authors = retorno);
  }

}
