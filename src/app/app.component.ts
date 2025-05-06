import { Component, LOCALE_ID } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        FormsModule,
        RouterModule
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ADMLibrary';
  constructor() {
    registerLocaleData(localePt);
  }
}
