import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

export interface Author {
  id: string;
  name: string;
  articlesCount: number;
}

@Component({
  selector: 'app-manager-author',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    MatIconModule
  ],
  templateUrl: './manager-author.component.html',
  styleUrl: './manager-author.component.scss'
})

export class ManagerAuthor implements OnInit, OnDestroy {

  adminName: string | null = null;
  authors: Author[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    this.adminName = currentUser ? currentUser.username : null;

    this.loadAuthors();
  }

  ngOnDestroy(): void {
    
  }
  private loadAuthors(): void {
    this.authors = [
      { id: '1', name: 'Teacher Chiquinho', articlesCount: 5 },
      { id: '2', name: 'Pedro Lancelloza', articlesCount: 5 },
      { id: '3', name: 'Juliana Pedrozo', articlesCount: 5 },
      { id: '4', name: 'Victor Brito', articlesCount: 5 },
      { id: '5', name: 'José Abrahim', articlesCount: 5 },
      { id: '6', name: 'Lohan Silva', articlesCount: 5 },
      { id: '7', name: 'Teacher Chiquinho', articlesCount: 5 }, 
      { id: '8', name: 'Teacher Chiquinho', articlesCount: 5 }, 
    ];
    console.log('Autores carregados:', this.authors);
  }

  // Método opcional: para navegar para detalhes de um autor
  viewAuthorDetails(authorId: string): void {
    console.log('Ver detalhes do autor:', authorId);
    // this.router.navigate(['/admin/authors', authorId]); // Exemplo de navegação para detalhes
  }

  // Método opcional: para gerenciar a criação/edição de autores
  goToManageAuthors(): void {
    console.log('Gerenciar autores');
    // this.router.navigate(['/admin/authors/manage']); // Exemplo de navegação para gerenciamento
  }
}
