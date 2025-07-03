import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe CommonModule se já não estiver
import { RouterLink, RouterOutlet } from '@angular/router'; // Adicione RouterLink e RouterOutlet

@Component({
  selector: 'app-home',
  standalone: true, // Ou module: ..., se não for standalone
  imports: [
    CommonModule,
    RouterLink, // Adicione RouterLink aqui
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}