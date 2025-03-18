import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../../components/navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Author } from '../../../Model/Author';
import { AuthorService } from '../../../service/author.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private service:AuthorService, private router:Router, private activatedRoute:ActivatedRoute){}

  editAuthor():void{
    this.service.editAuthor(this.author.id, this.author)
      .subscribe((retorno) => {
        let position = this.authors.findIndex((obj) =>
          obj.id = retorno.id
        );
        this.authors[position] = retorno;

        this.author = new Author();
        alert("Author successfuly updated!");
        this.router.navigate(["/author/all"]);
      });
  }

  removeAuthor():void{
    this.service.deleteAuthor(this.author.id)
    .subscribe((retorno) => {
      let position = this.authors.findIndex(obj =>{
        return obj.id == this.author.id;
      });
      this.authors.splice(position, 1);
      this.author = new Author();
      alert("Author removed!");
      this.router.navigate(["/author/all"]);
    });
  }

  cancel():void{
    this.router.navigate(["/author/all"]);
  }

  ngOnInit(): void {
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
