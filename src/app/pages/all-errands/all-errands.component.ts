import { Component } from '@angular/core';
import { NavigationComponent } from "../../components/navigation/navigation.component";
import { Errand } from '../../Model/Errand';
import { Router } from '@angular/router';
import { ErrandService } from '../../service/errand.service';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-all-errands',
    standalone: true,
    imports: [
      NavigationComponent,
      NgFor
    ],
    templateUrl: './all-errands.component.html',
    styleUrl: './all-errands.component.scss'
})
export class AllErrandsComponent {

  constructor(private service:ErrandService,
    private router: Router
  ){}
  errand = new Errand();
  errands:Errand[] = [];

  select():void{
    this.service.select().subscribe(retorno => this.errands = retorno)
  }

  removeErrandById(code: number): void {
    this.service.remove(code).subscribe({
      next: () => {
        this.errands = this.errands.filter(e => e.code !== code);
        alert('Errand removed!');
      },
      error: (err) => {
        console.error('Error removing errand:', err);
        alert('Failed to remove the errand. Please try again.');
      },
    });
  }

  ngOnInit(){
    this.select();
  }
}
