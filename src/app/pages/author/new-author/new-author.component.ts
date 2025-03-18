import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../../components/navigation/navigation.component';
import { Author } from '../../../Model/Author';
import { AuthorService } from '../../../service/author.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-new-author',
  standalone: true,
  imports: [
    NavigationComponent,
    FormsModule,
    NgIf,
    NgFor
  ],
  templateUrl: './new-author.component.html',
  styleUrl: './new-author.component.scss'
})
export class NewAuthorComponent implements OnInit{

  author = new Author();
  btnRegister:Boolean = true;
  table:Boolean = true;
  authors:Author[] = [];

  constructor(private service:AuthorService){}
  

  getAll():void{
    this.service.allAuthors()
    .subscribe(retorno => this.authors = retorno);
  }

  register(){
    if(this.author.author != ""){
      this.service.newAuthor(this.author).subscribe(response => {
        console.log('New author Added!', response);
        alert('New author Added!')
        this.author.author = "";
      });
      
    }else{
      alert("fill the field 'author'")
    }
    
  }

  ngOnInit(): void {
    this.getAll();
  }
  
}
