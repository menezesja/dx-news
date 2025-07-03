import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ManagerAuthorComponent } from '../admin/manager-author/manager-author.component'; // Importe este
import { ManagerNewsComponent } from '../admin/manager-news/manager-news.component';     // Importe este
import { CreateNewsComponent } from '../author/create-news/create-news.component';
import { ControllerNewsComponent } from '../author/controller-news/controller-news.component';
import { LoginComponent } from '../login/login.component';
import { NewsComponent } from '../news/news.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin/authors', component: ManagerAuthorComponent }, // Nova rota para autores
  { path: 'admin/news', component: ManagerNewsComponent },    
  { path: 'author/create-news', component: CreateNewsComponent },    
  { path: 'author/controller-news', component: ControllerNewsComponent },    
  { path: 'login', component: LoginComponent },    
  { path: 'news', component: NewsComponent },    
  // ... outras rotas que você possa ter
];