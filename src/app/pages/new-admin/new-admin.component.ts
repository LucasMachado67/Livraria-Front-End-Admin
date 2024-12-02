import { Component } from '@angular/core';
import { NavigationComponent } from "../../components/navigation/navigation.component";
import { AdminService } from '../../service/admin.service';
import { Admin } from '../../Model/Admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-admin',
  standalone: true,
  imports: [NavigationComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './new-admin.component.html',
  styleUrl: './new-admin.component.scss'
})
export class NewEmployeeComponent {

  admin = new Admin();

  constructor(
    private service:AdminService
  ){}

  register():void{
    this.service.addNewAdmin(this.admin)
    .subscribe(retorno => {

      this.admin = retorno;

      this.admin = new Admin();

      alert("Admin successfully registered!");
    });
  }

  formatPhone(): void {
    let phone = this.admin.phone.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    if (phone.length > 2) {
      phone = phone.substring(0, 2) + ' ' + phone.substring(2);
    }
    if (phone.length > 7) {
      phone = phone.substring(0, 7) + '-' + phone.substring(7, 11);
    }
    this.admin.phone = phone;
  }
}
