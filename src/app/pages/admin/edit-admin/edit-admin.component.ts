import { Component } from '@angular/core';
import { NavigationComponent } from "../../../components/navigation/navigation.component";
import { CommonModule } from '@angular/common';
import {} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../../../Model/Admin';
import { AdminService } from '../../../service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-admin',
  standalone: true,
  imports: [NavigationComponent,
    
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './edit-admin.component.html',
  styleUrl: './edit-admin.component.scss'
})
export class EditAdminComponent {

  admin = new Admin();
  admins:Admin[] = [];

  constructor(private service:AdminService,
    private routeActive: ActivatedRoute,
    private router: Router,
    private toastr:ToastrService
  ){}
  //Método para editar o admin
  editAdmin():void{
    this.service.edit(this.admin, this.admin.id)
    .subscribe((retorno) => {
      
      let position = this.admins.findIndex((obj) => 
        obj.id == retorno.id
      );
      this.admins[position] = retorno;
      this.admin = new Admin(); 
      this.toastr.info(this.admin.name + "updated","Updated!", {
        disableTimeOut: false,
        timeOut: 3000,
        extendedTimeOut: 1000,
        tapToDismiss: true,
      });
      this.router.navigate(["/admin/all"])
    });
  }
  //Método para remover o admin
  removeAdmin():void{
    this.service.remove(this.admin.id)
    .subscribe((retorno) => {
      
      let position = this.admins.findIndex(obj => {
        return obj.id == this.admin.id;
      });
      this.admins.splice(position, 1);
      this.admin = new Admin(); 
      this.toastr.warning("Admin removed","Removed!", {
        disableTimeOut: false,
        timeOut: 3000,
        extendedTimeOut: 1000,
        tapToDismiss: true,
      });
      this.router.navigate(['/admin/all']);
    });
  }

  cancel():void{
    this.router.navigate(['/admin/all']);
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

  ngOnInit() {
    this.routeActive.paramMap.subscribe(params => {
        let id = params.get('id');
        if (id) {
            this.service.getAdminById(Number(id)).subscribe((data) => {
                this.admin = data;
                console.log("Admin loaded:", this.admin);
            });
        }
    });
  }
}
