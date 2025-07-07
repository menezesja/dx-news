import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-controller-news.component',
  standalone:true,
  imports: [
    CommonModule,
    NavbarComponent
  ],
  templateUrl: './controller-news.component.html',
  styleUrl: './controller-news.component.scss'
})
export class ControllerNewsComponent {

}
