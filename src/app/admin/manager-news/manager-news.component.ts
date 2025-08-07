import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

export interface NewsItem {
  id: string;
  title: string;
  author: string;
  imageUrl?: string;
  views: number;
}

@Component({
  selector: 'app-manager-news',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent, MatIconModule
  ],
  templateUrl: './manager-news.component.html',
  styleUrl: './manager-news.component.scss'
})
export class ManagerNews implements OnInit, OnDestroy {
  adminName: string | null = null; // Para exibir "Welcome, Admin"
  newsList: NewsItem[] = []; // Lista de notícias
  private userSubscription: Subscription | null = null;
  private isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    this.adminName = currentUser ? currentUser.username : null;

    this.loadNews();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private loadNews(): void {
    this.newsList = [
      { id: '1', title: 'Hyperautomation Presentations from DX Academy', author: 'Teacher Chiquinho', imageUrl: 'https://placehold.co/200x150/f0f0f0/cccccc?text=Image', views: 15000 },
      { id: '2', title: 'Hyperautomation', author: 'Pedro Lancelloza', imageUrl: 'https://placehold.co/200x150/f0f0f0/cccccc?text=Image', views: 15000 },
      { id: '3', title: 'DX Academy', author: 'Pedro Lancelloza', imageUrl: 'https://placehold.co/200x150/f0f0f0/cccccc?text=Image', views: 15000 },
      { id: '4', title: 'Hyperautomation Presentations from DX Academy', author: 'Teacher Chiquinho', imageUrl: 'https://placehold.co/200x150/f0f0f0/cccccc?text=Image', views: 15000 },
    ];
    console.log('Notícias carregadas:', this.newsList);
  }

  readNews(newsId: string): void {
    console.log('Ler notícia:', newsId);
    // this.router.navigate(['/news', newsId]);
  }
}
