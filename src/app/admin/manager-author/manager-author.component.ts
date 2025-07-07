import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-author.component',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent
  ],
  templateUrl: './manager-author.component.html',
  styleUrl: './manager-author.component.scss'
})
export class ManagerAuthorComponent {

}
