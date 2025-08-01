import { Injectable, Signal, computed, signal } from '@angular/core';
import { NewsItem } from '../model/news.model';
import { AbstractNewsService } from './abstract-news.service';

@Injectable()
export class MockNewsService extends AbstractNewsService{
  private _newsItems = signal<NewsItem[]>([
    {
        id: 1,
        title: 'Apresentações de hiperautomação da DX Academy',
        author: 'Professor Chiquinho',
        date: 'Jun 27, 2025',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        category: 'DX ACADEMY',
        views: 900,
        imageUrl: 'https://picsum.photos/seed/hyperautomation/100',
    },
    {
        id: 2,
        title: 'Cientistas descobrem planta que “fala” com insetos',
        author: 'Professor Chiquinho',
        date: 'Jun 27, 2025',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        category: 'DX ACADEMY',
        views: 900,
        imageUrl: 'https://s2-oglobo.glbimg.com/5kLJIR5u9jctB3l4JIuvpuILgQk=/600x0/filters:quality(50)/https://i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2025/b/H/PYpWEGT6GcrC3E9FaLUw/faustao-gpt.jpg',
    },
    {
        id: 3,
        title: 'Cidade brasileira testa semáforos com inteligência artificial',
        author: 'Professor Chiquinho',
        date: 'Jun 27, 2025',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        category: 'DX ACADEMY',
        views: 900,
        imageUrl: 'https://www.infomoney.com.br/wp-content/uploads/2025/04/Gm8d8AObYAImwUr-edited-1.jpeg?fit=1280%2C720&quality=50&strip=all',
    },
    {
        id: 4,
        title: 'O mistério dos peixes que caem do céu em Honduras',
        author: 'Professor Chiquinho',
        date: 'Jun 27, 2025',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        category: 'DX ACADEMY',
        views: 900,
        imageUrl: 'https://conectaja.proteste.org.br/wp-content/uploads/2025/04/trend-studio-ghibli-970x472.png',
    },
    {
        id: 5,
        title: 'Workshop sobre Integração de IA',
        author: 'Professor Chiquinho',
        date: 'Jun 15, 2025',
        description:
            'Hands-on session with AI tools. Participants learned how to apply machine learning models Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliquacccccc',
        category: 'WORKSHOP',
        views: 1285,
        imageUrl: 'https://picsum.photos/seed/workshop/100',
    },
    {
        id: 6,
        title: 'Visita ao Centro de Robótica',
        author: 'Professor Chiquinho',
        date: 'Jun 20, 2025',
        description:
            'Explore the latest robotic technologies. The tour included demonstrations of autonomous systems. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        category: 'VISITS',
        views: 1120,
        imageUrl: 'https://picsum.photos/seed/robotics/100',
    },
    {
        id: 7,
        title: 'Automação de linha de produção',
        author: 'Professor Chiquinho',
        date: 'Jun 10, 2025',
        description:
            'Optimizing manufacturing workflows. The session covered implementation strategies for smart factories. The session covered implementation strategies for smart factories.The session covered implementation strategies for smart factories.',
        category: 'DX DAY',
        views: 1540,
        imageUrl: 'https://picsum.photos/seed/production/100',
    },
    {
        id: 8,
        title: 'O mercado clandestino de diplomas universitários no Brasil',
        author: 'Professor Chiquinho',
        date: 'Jun 10, 2025',
        description:
            'Optimizing manufacturing workflows. The session covered implementation strategies for smart factories. The session covered implementation strategies for smart factories.The session covered implementation strategies for smart factories.',
        category: 'PRODUCTION',
        views: 1842,
        imageUrl: 'https://picsum.photos/seed/dxday/100',
    },
  ]);
  
  newsItems: Signal<NewsItem[]> = computed(() => this._newsItems());
  tags: string[] = ['WORKSHOP', 'VISITS', 'DX ACADEMY', 'DX DAY', 'PRODUCTION']; // Implementação obrigatória da propriedade abstrata

  override filterNews(newsItems: NewsItem[], tag: string, query: string): NewsItem[] {
    let filtered = !tag ? newsItems : newsItems.filter(n => n.category === tag);
    if (query.trim()) {
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    return filtered;
  }

  override paginate(news: NewsItem[], currentPage: number, itemsPerPage: number): NewsItem[] {
    const start = (currentPage - 1) * itemsPerPage;
    return news.slice(start, start + itemsPerPage);
  }
  
  override getHotNews(newsItems: NewsItem[]): NewsItem[] {
    return [...newsItems].sort((a, b) => b.views - a.views).slice(0, 3);
  }

  override getTotalPages(filtered: NewsItem[], itemsPerPage: number): number {
    return Math.ceil(filtered.length / itemsPerPage);
  }

  //contabiliza visualizações
  override updateViews(newsId: number): void {
    const localKey = `views-extra-${newsId}`;
    const extraViews = parseInt(localStorage.getItem(localKey) || '0', 10) + 1;

    localStorage.setItem(localKey, extraViews.toString());

    const originalNews = this._newsItems().find(n => n.id === newsId);
    const baseViews = originalNews?.views || 0;
    const totalViews = baseViews + extraViews;

    this._newsItems.update(items =>
      items.map(item =>
        item.id === newsId ? { ...item, views: totalViews } : item
      )
    );
  }

  //salva avaliação por estrelas
  override updateRating(newsId: number, stars: number): void {
    const key = `rating-user-${newsId}`;
    localStorage.setItem(key, stars.toString());
  }

  //recupera avaliação salva
  override getRating(newsId: number): number {
    return parseInt(localStorage.getItem(`rating-user-${newsId}`) || '0', 10);
  }

}