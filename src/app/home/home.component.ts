import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe CommonModule se já não estiver
import { Router } from '@angular/router'; // Adicione RouterLink e RouterOutlet
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

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
  constructor(private router: Router) {}

  tags: string[] = ['WORKSHOP', 'VISITS', 'DX ACADEMY', 'DX DAY', 'PRODUCTION'];

  selectedTag: string = ''; // Nenhuma selecionada por padrão
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 4;

  newsItems = [
    {
      title: 'Hyperautomation Presentations from DX Academy',
      date: 'Jun 27, 2025',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In the event, experts showcased intelligent automation strategies and shared success cases from digital transformation initiatives.',
      category: 'DX ACADEMY',
      views: 2341,
      imageUrl: 'https://picsum.photos/seed/hyperautomation/100'
    },
    {
      title: 'Workshop on AI Integration',
      date: 'Jun 15, 2025',
      description: 'Hands-on session with AI tools. Participants learned how to apply machine learning models in business scenarios, explored data processing techniques, and built functional prototypes with real-world applications.',
      category: 'WORKSHOP',
      views: 1285,
      imageUrl: 'https://picsum.photos/seed/workshop/100'
    },
    {
      title: 'Visit to Robotics Center',
      date: 'Jun 20, 2025',
      description: 'Explore the latest robotic technologies. The tour included demonstrations of autonomous systems, collaborative robots in manufacturing, and insights into next-generation automation research conducted at the facility.',
      category: 'VISITS',
      views: 3120,
      imageUrl: 'https://picsum.photos/seed/robotics/100'
    },
    {
      title: 'Production Line Automation',
      date: 'Jun 10, 2025',
      description: 'Optimizing manufacturing workflows. The session covered implementation strategies for smart factories, showcased cost-effective automation tools, and discussed ways to integrate IoT solutions into existing production lines.',
      category: 'DX DAY',
      views: 1540,
      imageUrl: 'https://picsum.photos/seed/production/100'
    },
    {
      title: 'Production Line Automation',
      date: 'Jun 10, 2025',
      description: 'Optimizing manufacturing workflows. The session covered implementation strategies for smart factories, showcased cost-effective automation tools, and discussed ways to integrate IoT solutions into existing production lines.',
      category: 'PRODUCTION',
      views: 1842,
      imageUrl: 'https://picsum.photos/seed/dxday/100'
    }
  ];

  // Seleciona as 3 notícias com mais visualizações para destaque
  hotNews = [...this.newsItems]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  //Filtro dinâmico: por tag e busca por texto
  get filteredNews() {
    let filtered = !this.selectedTag
      ? this.newsItems
      : this.newsItems.filter(news => news.category === this.selectedTag);

    if (this.searchQuery.trim()) {
      filtered = filtered.filter(news =>
        news.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        news.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    return filtered;
  }

  //Alterna a seleção da tag clicada
  selectTag(tag: string) {
    this.selectedTag = this.selectedTag === tag ? '' : tag;
  }

  //Retorna as notícias paginadas com base na página atual
  get paginatedNews() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredNews.slice(start, end);
  }

  //Calcula o total de páginas para a navegação
  get totalPages(): number {
    return Math.ceil(this.filteredNews.length / this.itemsPerPage);
  }

  //Troca a página atual dentro dos limites válidos
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  //Navega para o componente /news, enviando dados da notícia selecionada via state
  goToNews(news: any) {
    this.router.navigate(['news'], { state: { data: news } });
  }
}
