import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class BookValidation {
  currentYear: number = new Date(Date.now()).getFullYear();

  constructor(private toastr: ToastrService) {}

  registerValidationForNumberDataType(
    year: number,
    quantity: number,
    price: number,
    pages: number
  ): Boolean {
    let isValid = true;
    if (year > this.currentYear || year < 1000) {
      this.toastr.error(
        "O campo 'year' está com valor inválido, precisa ser maior que 0 e menor ou igual a " +
          this.currentYear,
        'Year error',
        {
          disableTimeOut: false,
          timeOut: 3000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
        }
      );
      isValid = false;
    }
    if (quantity <= 0) {
      this.toastr.error(
        "O campo 'quantity' está com valor inválido, precisa ser maior que 0",
        'pagesError',
        {
          disableTimeOut: false,
          timeOut: 3000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
        }
      );
      isValid = false;
    }
    if (price <= 0) {
      this.toastr.error("O campo 'price' está com valor inválido, precisa ser maior que 0 e menor que 9999.99", "Price error",{
        disableTimeOut:false,
        timeOut: 3000,
        extendedTimeOut:1000,
        tapToDismiss: true
    });
      isValid = false;
    }
    if (pages <= 0) {
      this.toastr.error("O campo 'pages' está com valor inválido, precisa ser maior que 0", "Pages Error",{
        disableTimeOut:false,
        timeOut: 3000,
        extendedTimeOut:1000,
        tapToDismiss: true
    });
      isValid = false;
    }
    return isValid;
  }
}
