import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { NewsDraft } from '../create-news/create-news.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-controller-news',
  standalone:true,
  imports: [
    CommonModule,
    NavbarComponent,
    MatIconModule
  ],
  templateUrl: './controller-news.component.html',
  styleUrl: './controller-news.component.scss'
})
export class ControllerNewsComponent implements OnInit, OnDestroy{

  newsDrafts: NewsDraft[] = []; 
  userName: string | null = null;
  private isBrowser: boolean; // For SSR check
  private routerSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID for SSR
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if in browser
  }


  ngOnInit(): void {
    this.loadNewsDrafts();

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verifica se a navegação terminou E se a URL atual corresponde à rota deste componente
        if (this.router.url === '/author/controller-news') {
          this.loadNewsDrafts(); // Recarrega os dados
        }
      }
    });

    
    const currentUser = this.authService.getCurrentUser();
    if(currentUser) {
      this.userName = currentUser.username;
    }
  }

  ngOnDestroy(): void {
    // DESINSCREVA-SE para evitar memory leaks quando o componente for destruído
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  loadNewsDrafts(): void {
    if (this.isBrowser) {
      const draftsJSON = localStorage.getItem('newsDrafts');
      this.newsDrafts = draftsJSON ? JSON.parse(draftsJSON) : [];
      console.log('Rascunhos carregados no ControllerNewsComponent:', this.newsDrafts);
    } else {
      this.newsDrafts = []; // Garante array vazia no servidor
    }
  }

  goToCreateNews(): void {
    this.router.navigate(['/author/create-news']); // Navega para a tela de criação
  }

  viewDraft(draftId?: string): void {
    if (draftId) {
      // Redireciona para a rota de edição com o ID
      this.router.navigate(['/author/create-news/edit/', draftId]);
    } else {
      // Se por algum motivo o ID for null, redireciona para criar um novo
      console.warn("ID do rascunho é nulo. Redirecionando para criação.");
      this.router.navigate(['/author/create-news']);
    }
  }

  // private getDraftsFromLocalStorage(): NewsDraft[] {
  //   if (this.isBrowser) {
  //     const draftsJSON = localStorage.getItem('newsDrafts');
  //     return draftsJSON ? JSON.parse(draftsJSON) : [];
  //   }
  //   return []; // Return empty array if not in browser (server-side)
  // }
}
