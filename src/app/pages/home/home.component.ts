import { Component } from '@angular/core';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
    selector: 'app-home',
    imports: [
        NavigationComponent,
        MenuComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
