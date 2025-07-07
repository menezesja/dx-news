import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-manager-news.component',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent
  ],
  templateUrl: './manager-news.component.html',
  styleUrl: './manager-news.component.scss'
})
export class ManagerNewsComponent {

}
