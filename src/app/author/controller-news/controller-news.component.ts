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

  newsDrafts: NewsDraft[] = []; // <<< ADD THIS PROPERTY
  private isBrowser: boolean; // For SSR check
  private routerSubscription: Subscription | null = null;
  userName: string | null = null;

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
    this.newsDrafts = this.getDraftsFromLocalStorage();
    console.log('Rascunhos carregados:', this.newsDrafts); // Para depuração
  }

  goToCreateNews(): void {
    this.router.navigate(['/author/create-news']); // Navega para a tela de criação
  }

  viewDraft(draftId?: string): void {
    if (draftId) {
      this.router.navigate(['/admin/news/edit', draftId]); // Assuming you'll add an 'edit' route
    }
  }

  private getDraftsFromLocalStorage(): NewsDraft[] {
    if (this.isBrowser) {
      const draftsJSON = localStorage.getItem('newsDrafts');
      return draftsJSON ? JSON.parse(draftsJSON) : [];
    }
    return []; // Return empty array if not in browser (server-side)
  }
}
