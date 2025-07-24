import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';

export interface NewsDraft {
  id?: string;
  title: string;
  subtitle: string;
  content: string;
  status: 'Draft' | 'Published';
  author: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
}

@Component({
  selector: 'app-create-news.component',
  standalone:true,
  imports: [
    CommonModule,
    NavbarComponent,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './create-news.component.html',
  styleUrl: './create-news.component.scss'
})
export class CreateNewsComponent implements OnInit {
  newsDraft: NewsDraft = {
    title: '',
    subtitle: '',
    content: '',
    status: 'Draft',
    author: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: '',
  };

  private isBrowser: boolean;
  private userSubscription: Subscription | null = null;
  private routeSubscription: Subscription | null = null;
  userName: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID for SSR
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if in browser
  }

  ngOnInit(): void{
    // carregar um rascunho existente se estivesse editando
    // Por exemplo, se a rota fosse /admin/news/edit/:id

    const currentUser = this.authService.getCurrentUser();
    if(currentUser) {
      this.userName = currentUser.username;
    }

    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const draftId = params.get('id'); // Obtém o ID da URL (ex: /admin/news/edit/:id)

      if (draftId && this.isBrowser) { // Se há um ID e estamos no navegador
        const drafts = this.getDraftsFromLocalStorage();
        const existingDraft = drafts.find(d => d.id === draftId);

        if (existingDraft) {
          // Carrega o rascunho existente no formulário
          this.newsDraft = { ...existingDraft }; // Cria uma cópia para evitar modificações diretas
          console.log('Editando rascunho:', this.newsDraft);
        } else {
          console.warn('Rascunho não encontrado para ID:', draftId);
          // Opcional: Redirecionar para a página de criação ou lista se o rascunho não existir
          this.router.navigate(['/admin/news/create']);
        }
      } else if (!draftId) {
        // Se não há ID, é um NOVO rascunho, então redefinimos o formulário
        this.resetFormForNewDraft();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private resetFormForNewDraft(): void {
    this.newsDraft = {
      title: '',
      subtitle: '',
      content: '',
      status: 'Draft',
      author: this.authService.getCurrentUser()?.username || this.authService.getCurrentUser()?.username || 'Autor Desconhecido', // Preenche com o autor atual
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: '',
    };
  }
  
  saveDraft(): void {
    if (!this.isBrowser) return;

    this.newsDraft.updatedAt = new Date();

    const drafts = this.getDraftsFromLocalStorage();
    const draftToSave = { ...this.newsDraft }; // Cria uma cópia para garantir que não haja referências indesejadas

    if (!draftToSave.id) { // Se não tem ID, é um NOVO rascunho
      draftToSave.id = 'draft-' + Date.now(); // Gera um ID único
      drafts.push(draftToSave);
    } else { // Se já tem ID, é um rascunho EXISTENTE
      const index = drafts.findIndex(d => d.id === draftToSave.id);
      if (index > -1) {
        drafts[index] = draftToSave; // Substitui o rascunho existente pelo atualizado
      } else {
        // Caso o ID exista, mas não foi encontrado na lista
        drafts.push(draftToSave); // Adiciona como novo
      }
    }
    localStorage.setItem('newsDrafts', JSON.stringify(drafts));

    console.log('Rascunho salvo/atualizado:', this.newsDraft);

    this.router.navigate(['/author/controller-news']); // Volta para a lista de rascunhos
  }

  goBack(): void{
    this.router.navigate(['/author/controller-news']);
  }

  private getDraftsFromLocalStorage(): NewsDraft[] {
    if (typeof localStorage !== 'undefined') {
      const draftsJSON = localStorage.getItem('newsDrafts');
      return draftsJSON ? JSON.parse(draftsJSON) : [];
    }
    return [];
  }
}
