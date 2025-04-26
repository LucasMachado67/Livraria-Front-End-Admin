import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { BookService } from '../../service/book.service';

@Component({
    selector: 'app-navigation',
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterModule
    ],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private service: BookService
  ){}
}
