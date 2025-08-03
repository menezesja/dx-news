import { Injectable, Signal, computed, signal } from '@angular/core';
import { NewsItem } from '../model/news.model';
import { AbstractNewsService } from './abstract-news.service';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

@Injectable()
export class MockNewsService extends AbstractNewsService{
  private _newsItems = signal<NewsItem[]>([
    {
      id: 1,
      title: 'Apresentações de hiperautomação da DX Academy',
      author: 'Professor Chiquinho',
      date: 'Jun 27, 2025',
      description: 'Lorem ipsum dolor sit amet...',
      category: 'DX ACADEMY',
      views: 900,
      imageUrl: 'https://picsum.photos/seed/hyperautomation/100',
    },
    {
      id: 2,
      title: 'Cientistas descobrem planta que “fala” com insetos',
      author: 'Professor Chiquinho',
      date: 'Jun 27, 2025',
      description: 'Lorem ipsum dolor sit amet...',
      category: 'DX ACADEMY',
      views: 900,
      imageUrl: 'https://s2-oglobo.glbimg.com/5kLJIR5u9jctB3l4JIuvpuILgQk=/600x0/filters:quality(50)/https://i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2025/b/H/PYpWEGT6GcrC3E9FaLUw/faustao-gpt.jpg',
    },
    {
      id: 3,
      title: 'Cidade brasileira testa semáforos com inteligência artificial',
      author: 'Professor Chiquinho',
      date: 'Jun 27, 2025',
      description: 'Lorem ipsum dolor sit amet...',
      category: 'DX ACADEMY',
      views: 900,
      imageUrl: 'https://www.infomoney.com.br/wp-content/uploads/2025/04/Gm8d8AObYAImwUr-edited-1.jpeg?fit=1280%2C720&quality=50&strip=all',
    },
    {
      id: 4,
      title: 'O mistério dos peixes que caem do céu em Honduras',
      author: 'Professor Chiquinho',
      date: 'Jun 27, 2025',
      description: 'Lorem ipsum dolor sit amet...',
      category: 'DX ACADEMY',
      views: 900,
      imageUrl: 'https://conectaja.proteste.org.br/wp-content/uploads/2025/04/trend-studio-ghibli-970x472.png',
    },
    {
      id: 5,
      title: 'Workshop sobre Integração de IA',
      author: 'Professor Chiquinho',
      date: 'Jun 15, 2025',
      description: 'Hands-on session with AI tools...',
      category: 'WORKSHOP',
      views: 1285,
      imageUrl: 'https://picsum.photos/seed/workshop/100',
    },
    {
      id: 9,
      title: 'Workshop de Design Thinking para Inovação',
      author: 'Professor Chiquinho',
      date: 'Jun 18, 2025',
      description: 'Sessão prática sobre resolução criativa de problemas...',
      category: 'WORKSHOP',
      views: 1020,
      imageUrl: 'https://picsum.photos/seed/designthinking/100',
    },
    {
      id: 10,
      title: 'Workshop de Segurança Cibernética',
      author: 'Professor Chiquinho',
      date: 'Jun 22, 2025',
      description: 'Técnicas de proteção de dados e análise de vulnerabilidades...',
      category: 'WORKSHOP',
      views: 980,
      imageUrl: 'https://picsum.photos/seed/cybersecurity/100',
    },
    {
      id: 11,
      title: 'Workshop de UX/UI para Aplicações Web',
      author: 'Professor Chiquinho',
      date: 'Jun 25, 2025',
      description: 'Melhores práticas de design centrado no usuário...',
      category: 'WORKSHOP',
      views: 1100,
      imageUrl: 'https://picsum.photos/seed/uxui/100',
    },
    {
      id: 6,
      title: 'Visita ao Centro de Robótica',
      author: 'Professor Chiquinho',
      date: 'Jun 20, 2025',
      description: 'Explore the latest robotic technologies...',
      category: 'VISITS',
      views: 1120,
      imageUrl: 'https://picsum.photos/seed/robotics/100',
    },
    {
      id: 12,
      title: 'Visita à Usina Solar de Manaus',
      author: 'Professor Chiquinho',
      date: 'Jun 21, 2025',
      description: 'Conheça o funcionamento de painéis solares em larga escala...',
      category: 'VISITS',
      views: 890,
      imageUrl: 'https://picsum.photos/seed/solarplant/100',
    },
    {
      id: 13,
      title: 'Visita ao Laboratório de Biotecnologia',
      author: 'Professor Chiquinho',
      date: 'Jun 23, 2025',
      description: 'Experimentos com DNA sintético e bioengenharia...',
      category: 'VISITS',
      views: 950,
      imageUrl: 'https://picsum.photos/seed/biotechlab/100',
    },
    {
      id: 14,
      title: 'Visita Técnica à Fábrica de Chips',
      author: 'Professor Chiquinho',
      date: 'Jun 24, 2025',
      description: 'Processo de fabricação de semicondutores e microcontroladores...',
      category: 'VISITS',
      views: 1010,
      imageUrl: 'https://picsum.photos/seed/chipfactory/100',
    },
    {
      id: 7,
      title: 'Automação de linha de produção',
      author: 'Professor Chiquinho',
      date: 'Jun 10, 2025',
      description: 'Optimizing manufacturing workflows...',
      category: 'DX DAY',
      views: 1540,
      imageUrl: 'https://picsum.photos/seed/production/100',
    },
    {
      id: 15,
      title: 'DX Day: Inteligência Artificial na Indústria',
      author: 'Professor Chiquinho',
      date: 'Jun 11, 2025',
      description: 'Painel sobre IA aplicada à manufatura e logística...',
      category: 'DX DAY',
      views: 1200,
      imageUrl: 'https://picsum.photos/seed/aiindustry/100',
    },
    {
      id: 16,
      title: 'DX Day: Sustentabilidade e Tecnologia',
      author: 'Professor Chiquinho',
      date: 'Jun 12, 2025',
      description: 'Discussão sobre inovação ecológica e impacto ambiental...',
      category: 'DX DAY',
      views: 980,
      imageUrl: 'https://picsum.photos/seed/greentech/100',
    },
    {
      id: 17,
      title: 'DX Day: Startups e Ecossistemas Digitais',
      author: 'Professor Chiquinho',
      date: 'Jun 13, 2025',
      description: 'Como fomentar inovação em ambientes colaborativos...',
      category: 'DX DAY',
      views: 1050,
      imageUrl: 'https://picsum.photos/seed/startups/100',
    },
    {
      id: 8,
      title: 'O mercado clandestino de diplomas universitários no Brasil',
      author: 'Professor Chiquinho',
      date: 'Jun 10, 2025',
      description: 'Investigação sobre falsificação de certificados...',
      category: 'PRODUCTION',
      views: 1842,
      imageUrl: 'https://picsum.photos/seed/dxday/100',
    },
    {
      id: 18,
      title: 'Produção de bioplásticos a partir de resíduos agrícolas',
      author: 'Professor Chiquinho',
      date: 'Jun 14, 2025',
      description: 'Processo sustentável para fabricação de polímeros...',
      category: 'PRODUCTION',
      views: 920,
      imageUrl: 'https://picsum.photos/seed/bioplastics/100',
    },
    {
      id: 19,
      title: 'Produção automatizada de conteúdo com IA',
      author: 'Professor Chiquinho',
      date: 'Jun 16, 2025',
      description: 'Ferramentas de geração de texto e imagem com modelos generativos...',
      category: 'PRODUCTION',
      views: 1100,
      imageUrl: 'https://picsum.photos/seed/aicontent/100',
    },
    {
      id: 20,
      title: 'Produção de energia limpa com microturbinas',
      author: 'Professor Chiquinho',
      date: 'Jun 17, 2025',
      description: 'Tecnologia inovadora que utiliza microturbinas para gerar eletricidade em áreas remotas. O sistema é eficiente, sustentável e pode ser integrado a redes inteligentes para otimizar o consumo energético.',
      category: 'PRODUCTION',
      views: 970,
      imageUrl: 'https://picsum.photos/seed/microturbines/100',
    }
  ]);
  
  newsItems: Signal<NewsItem[]> = computed(() => this._newsItems());
  tags: string[] = ['WORKSHOP', 'VISITS', 'DX ACADEMY', 'DX DAY', 'PRODUCTION']; // Implementação obrigatória da propriedade abstrata

  override generateLongText(): string {
    return `
      Em um cenário de constantes transformações tecnológicas, pesquisadores brasileiros têm se destacado no desenvolvimento de soluções sustentáveis para os desafios do século XXI. A crescente demanda por energia limpa, aliada à preocupação com o meio ambiente, tem impulsionado iniciativas voltadas à inovação ecológica, especialmente na região Norte do país.
      Durante os últimos meses, projetos envolvendo biotecnologia e inteligência artificial têm ganhado notoriedade em instituições acadêmicas e startups da Amazônia. Um dos destaques recentes é um sistema inteligente de monitoramento da floresta que utiliza drones e sensores para coletar dados em tempo real, facilitando a preservação da biodiversidade.
      Além disso, empreendedores locais têm apostado em novos modelos de negócios focados no reaproveitamento de resíduos industriais. Essas soluções, que antes eram vistas como alternativas, agora se mostram viáveis economicamente e essenciais para a construção de um futuro mais equilibrado.
      As ações também envolvem educação e inclusão digital. Escolas públicas têm recebido kits tecnológicos que permitem aulas interativas e fomentam o interesse dos alunos pela ciência. Especialistas apontam que essa aproximação entre juventude e inovação será um dos pilares para o desenvolvimento da região nos próximos anos.
      Com apoio de instituições internacionais e investimento governamental, o Brasil mostra-se como protagonista no debate global sobre tecnologia sustentável. Os próximos capítulos dessa revolução prometem ainda mais integração entre ciência, sociedade e meio ambiente, com a Amazônia no centro das atenções mundiais.
    `.trim();
  }
  
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
    if (!isBrowser()) return;

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
    if (!isBrowser()) return;
    const key = `rating-user-${newsId}`;
    localStorage.setItem(key, stars.toString());
  }

  //recupera avaliação salva
  override getRating(newsId: number): number {
    if (!isBrowser()) return 0;
    return parseInt(localStorage.getItem(`rating-user-${newsId}`) || '0', 10);
  }

  override getRelatedNews(current: NewsItem): NewsItem[] {
    return this._newsItems()
      .filter(n => n.id !== current.id && n.category === current.category)
      .slice(0, 3);
  }

  override splitTextIntoParagraphs(text: string, sentencesPerParagraph: number): string[] {
    const sentences = text
      .split('.')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => s + '.');

    const paragraphs: string[] = [];

    for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
      paragraphs.push(sentences.slice(i, i + sentencesPerParagraph).join(' '));
    }

    return paragraphs;
  }
}