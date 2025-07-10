import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe CommonModule se já não estiver
import { Router } from '@angular/router'; // Adicione RouterLink e RouterOutlet
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { NewsItem } from '../model/news.model';
import { MockNewsService } from '../service/mock-news.service';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-home',
  standalone: true, // Ou module: ..., se não for standalone
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent // Adicione RouterLink aqui
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router, private newsService: NewsService, private dataSource: MockNewsService) {}

  selectedTag: string = ''; // Nenhuma selecionada por padrão
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 4;

  tags: string[] = [];
  newsItems: NewsItem[] = [];
  hotNews: NewsItem[] = [];

  ngOnInit(): void {
    this.tags = this.newsService.tags;
    this.newsItems = this.dataSource.newsItems();
    this.hotNews = this.newsService.getHotNews(this.newsItems);
  }

  //Filtro dinâmico: por tag e busca por texto
  get filteredNews() {
    return this.newsService.filterNews(this.newsItems, this.selectedTag, this.searchQuery);
  }

  //Retorna as notícias paginadas com base na página atual
  get paginatedNews() {
    return this.newsService.paginate(this.filteredNews, this.currentPage, this.itemsPerPage);
  }

  //Calcula o total de páginas para a navegação
  get totalPages(): number {
    return this.newsService.getTotalPages(this.filteredNews, this.itemsPerPage);
  }

  //Alterna a seleção da tag clicada
  selectTag(tag: string): void {
    this.selectedTag = this.selectedTag === tag ? '' : tag;
  }

  //Troca a página atual dentro dos limites válidos
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  //Navega para o componente /news, enviando dados da notícia selecionada via state
  goToNews(news: NewsItem): void {
    this.router.navigate(['news'], { state: { data: news } });
  }
}
