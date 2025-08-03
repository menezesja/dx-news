import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ShortNumberPipe } from './short-number.pipe';
import { NewsItem } from '../model/news.model';
import { AbstractNewsService } from '../service/abstract-news.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AlertDialogComponent } from '../feedback/alert-dialog.component';

@Component({
  selector: 'app-news.component',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ShortNumberPipe,
    MatDialogModule
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private newsService = inject(AbstractNewsService); // injetando via abstração
  private dialog = inject(MatDialog);

  selectedNews?: NewsItem;
  selectedRelatedNews?: NewsItem;
  selectedTag: string = '';
  tags: string[] = [];
  formattedparagraphs: string[] = [];
  rating: number = 0;
  radomText: string = ''; // teste temporário

  ngOnInit(): void { 
    this.route.paramMap.subscribe(params => { 
      const newsIdParam = params.get('id'); 
      const newsId = newsIdParam ? parseInt(newsIdParam, 10) : null; 
      
      if (newsId !== null) { 
        const allNews = this.newsService.newsItems(); 
        this.selectedNews = allNews.find(news => news.id === newsId); 
        
        if (this.selectedNews) { 
          this.newsService.updateViews(this.selectedNews.id); 
          this.rating = this.newsService.getRating(this.selectedNews.id); 
          this.radomText = this.newsService.generateLongText(); // teste temporário 
          this.formattedparagraphs = this.newsService.splitTextIntoParagraphs(this.radomText, 2); 
          
          //rola para o topo suavemente 
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
        } else { 
          this.router.navigate(['/']); 
        } 
      }else { 
        this.router.navigate(['/']); 
      } 
    }); 
  }

  goToTag(tag: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home'], { queryParams: { tag } });
    });
  }

  setRating(stars: number): void {
    if (!this.selectedNews) return;

    const existingRating = this.newsService.getRating(this.selectedNews.id);

    if (existingRating > 0) {
      this.dialog.open(AlertDialogComponent, {
        data: { message: '⭐ Você já avaliou esta notícia!' }
      });
      return;
    }

    this.newsService.updateRating(this.selectedNews.id, stars);
    this.rating = stars;
  }

  shareNews(): void {
    if (this.selectedNews) {
      const url = `${window.location.origin}/news/${this.selectedNews.id}`;
      navigator.clipboard.writeText(url);
      alert('🔗 Link da notícia copiado!');
    }
  }
  
  goToNews(news: NewsItem): void {
    this.router.navigate(['news', news.id]);
  }

  relatedNews(current: NewsItem): NewsItem[] {
    return this.newsService.getRelatedNews(current);
  }
}