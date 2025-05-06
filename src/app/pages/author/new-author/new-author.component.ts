import { Component } from '@angular/core';
import { NavigationComponent } from '../../../components/navigation/navigation.component';
import { Author } from '../../../Model/Author';
import { AuthorService } from '../../../service/author.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-new-author',
    standalone: true,
    imports: [
        NavigationComponent,
        FormsModule,
        NgIf
    ],
    templateUrl: './new-author.component.html',
    styleUrl: './new-author.component.scss'
})
export class NewAuthorComponent {

  author = new Author();
  btnRegister:Boolean = true;
  table:Boolean = true;
  authors:Author[] = [];

  constructor(private service:AuthorService,
    private toastr:ToastrService
  ){}
  
  //Método para criar um novo author
  register(){
    if(this.author.author != ""){
      this.service.newAuthor(this.author).subscribe(response => {
        this.toastr.success( this.author.author + " adicionado","Success!", {
          disableTimeOut: false,
          timeOut: 3000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
      });
        this.author.author = "";
      });
      
    }else{
      alert("fill the field 'author'")
    }
    
  }
  
}
