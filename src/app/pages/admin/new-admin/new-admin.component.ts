import { Component } from '@angular/core';
import { NavigationComponent } from "../../../components/navigation/navigation.component";
import { AdminService } from '../../../service/admin.service';
import { Admin } from '../../../Model/Admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
    selector: 'app-new-admin',
    standalone: true,
    imports: [NavigationComponent,
        CommonModule,
        FormsModule,
        NgxMaskDirective
    ],
    templateUrl: './new-admin.component.html',
    styleUrl: './new-admin.component.scss'
})
export class NewEmployeeComponent {

  admin = new Admin();

  constructor(
    private service:AdminService,
    private toastr:ToastrService
  ){}
  //Método para registrar um novo admin
  register():void{
    this.service.addNewAdmin(this.admin)
    .subscribe(retorno => {
      this.admin = retorno;
      this.admin = new Admin();
      this.toastr.success(this.admin.name + " Added!", "Success!",{
        disableTimeOut: false,
        timeOut: 3000,
        extendedTimeOut: 1000,
        tapToDismiss: true,
      });
    });
  }
}
