import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ShortNumberPipe } from './short-number.pipe';
import { NewsItem } from '../model/news.model';
import { AbstractNewsService } from '../service/abstract-news.service';

@Component({
  selector: 'app-news.component',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ShortNumberPipe
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private newsService = inject(AbstractNewsService); // ✅ injetando via abstração

  selectedNews?: NewsItem;
  selectedRelatedNews?: NewsItem;
  selectedTag: string = '';
  tags: string[] = [];
  radomText: string = ''; // teste temporário
  formattedparagraphs: string[] = [];
  rating: number = 0;

  ngOnInit(): void {
    this.tags = this.newsService.tags;
    this.radomText = this.generateLongText(); // teste temporário
    this.formattedparagraphs = this.splitTextIntoParagraphs(this.radomText);

    const newsIdParam = this.route.snapshot.paramMap.get('id');
    const newsId = newsIdParam ? parseInt(newsIdParam, 10) : null;

    if (newsId !== null) {
      const allNews = this.newsService.newsItems();
      this.selectedNews = allNews.find(news => news.id === newsId);

      if (this.selectedNews) {
        this.newsService.updateViews(this.selectedNews.id);
        this.rating = this.newsService.getRating(this.selectedNews.id);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  goToTag(tag: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home'], { queryParams: { tag } });
    });
  }

  setRating(stars: number): void {
    if (this.selectedNews) {
      this.newsService.updateRating(this.selectedNews.id, stars);
      this.rating = stars;
    }
  }

  shareNews(): void {
    if (this.selectedNews) {
      const url = `${window.location.origin}/news/${this.selectedNews.id}`;
      navigator.clipboard.writeText(url);
      alert('🔗 Link da notícia copiado!');
    }
  }
  
  // teste temporário
  generateLongText(): string {
    return `
      Em um cenário de constantes transformações tecnológicas, pesquisadores brasileiros têm se destacado no desenvolvimento de soluções sustentáveis para os desafios do século XXI. A crescente demanda por energia limpa, aliada à preocupação com o meio ambiente, tem impulsionado iniciativas voltadas à inovação ecológica, especialmente na região Norte do país.
      Durante os últimos meses, projetos envolvendo biotecnologia e inteligência artificial têm ganhado notoriedade em instituições acadêmicas e startups da Amazônia. Um dos destaques recentes é um sistema inteligente de monitoramento da floresta que utiliza drones e sensores para coletar dados em tempo real, facilitando a preservação da biodiversidade.
      Além disso, empreendedores locais têm apostado em novos modelos de negócios focados no reaproveitamento de resíduos industriais. Essas soluções, que antes eram vistas como alternativas, agora se mostram viáveis economicamente e essenciais para a construção de um futuro mais equilibrado.
      As ações também envolvem educação e inclusão digital. Escolas públicas têm recebido kits tecnológicos que permitem aulas interativas e fomentam o interesse dos alunos pela ciência. Especialistas apontam que essa aproximação entre juventude e inovação será um dos pilares para o desenvolvimento da região nos próximos anos.
      Com apoio de instituições internacionais e investimento governamental, o Brasil mostra-se como protagonista no debate global sobre tecnologia sustentável. Os próximos capítulos dessa revolução prometem ainda mais integração entre ciência, sociedade e meio ambiente, com a Amazônia no centro das atenções mundiais.
    `.trim();
  }

  splitTextIntoParagraphs(text: string, sentencesPerParagraph: number = 2): string[] {
    const sentences = text
      .split('.')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => s + '.'); // adiciona o ponto de volta

    const paragraphs: string[] = [];

    for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
      paragraphs.push(sentences.slice(i, i + sentencesPerParagraph).join(' '));
    }

    return paragraphs;
  }


  goToNews(id: number): void {
    this.router.navigate(['/news', id]);
  }

  relatedNews(current: NewsItem): NewsItem[] {
    return this.newsService.newsItems()
      .filter(n => n.id !== current.id && n.category === current.category)
      .slice(0, 3);
  }
}
