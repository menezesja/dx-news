import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { NewsService } from '../service/news.service';
import { MockNewsService } from '../service/mock-news.service';
import { ShortNumberPipe } from './short-number.pipe';
import { NewsItem } from '../model/news.model';

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
  selectedNews?: NewsItem;
  selectedRelatedNews?: NewsItem;
  selectedTag: string = '';
  tags: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private mockNewsService: MockNewsService
  ) {}

  ngOnInit(): void {
    this.tags = this.newsService.tags;

    const newsIdParam = this.route.snapshot.paramMap.get('id');
    const newsId = newsIdParam ? parseInt(newsIdParam, 10) : null;

    if (newsId !== null) {
      const allNews = this.mockNewsService.newsItems();
      this.selectedNews = allNews.find(news => news.id === newsId);

      if (!this.selectedNews) {
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

}
