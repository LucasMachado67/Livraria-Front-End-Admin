import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterModule, CommonModule, NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent{

mode: string = "dark-mode";
turnToLightMode() {
  this.mode = "light-mode";
  if (typeof document !== 'undefined') {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  }
}

turnToDarkMode() {
  this.mode = "dark-mode";
  if (typeof document !== 'undefined') {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
  }
}


  ngOnInit() {
    if (typeof document !== 'undefined') {
      document.body.classList.add(this.mode);
    }
  }
}
