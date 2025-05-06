import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';


@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterModule
    ],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
}
