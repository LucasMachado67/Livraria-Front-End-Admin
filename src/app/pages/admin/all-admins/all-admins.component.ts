import { Component } from '@angular/core';
import { NavigationComponent } from "../../../components/navigation/navigation.component";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../service/admin.service';
import { Admin } from '../../../Model/Admin';

@Component({
  selector: 'app-all-admins',
  standalone: true,
  imports: [NavigationComponent,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './all-admins.component.html',
  styleUrl: './all-admins.component.scss'
})
export class AllAdminsComponent {

  table:Boolean = true;
  admins:Admin [] = [];
  admin = new Admin();

  constructor(private service:AdminService,
    private router: Router
  ){}

  select():void {
    this.service.select()
    .subscribe(retorno => this.admins = retorno);
  }
  selectAdmin(position:number):void{

    this.admin = this.admins[position];
    this.router.navigate(['/admin/', this.admin.id]);
    
  }

  ngOnInit(){
    this.select();
  }
}
