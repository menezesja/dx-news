import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface NewsDraft {
  id?: string;
  title: string;
  subtitle: string;
  content: string;
  status: 'Draft' | 'Published';
  author: string;
  createdAt: Date;
  updatedAt: Date;
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
    author: 'Teacher Chiquinho',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor(private router: Router){}

  ngOnInit(): void{
    // carregar um rascunho existente se estivesse editando
    // Por exemplo, se a rota fosse /admin/news/edit/:id
  }

  saveDraft(): void{
    this.newsDraft.updatedAt = new Date();

    // Por enquanto, simulação do salvamento no localStorage
    // Mudar para um serviço/API
    const drafts = this.getDraftsFromLocalStorage();
    if(!this.newsDraft.id){
      this.newsDraft.id = 'draft-' + Date.now();
      drafts.push(this.newsDraft);
    }else{
      const index = drafts.findIndex(d => d.id === this.newsDraft.id);
      if (index > -1){
        drafts[index] = this.newsDraft;
      }
    }
    localStorage.setItem('newsDraft', JSON.stringify(drafts));
    console.log('Rascunho salvo:', this.newsDraft);
    this.router.navigate(['/author/controller-news']); 
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
