import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Mantenha, se precisar de outras diretivas comuns
import { RouterLink } from '@angular/router'; // Mantenha RouterLink se for usar routerLink em algum menu futuro

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    // RouterLink, // Remova RouterLink se você não tiver NENHUM link routerLink na sua navbar AGORA
    // Se você tiver links de navegação futuros (como "WORKSHOP", "VISITS" etc.), mantenha o RouterLink.
    // Para a navbar simples que você descreveu (só texto e logo), você não precisa de RouterLink.
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  // ... seu código TypeScript do componente ...
}