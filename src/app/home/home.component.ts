import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { NewsItem } from '../model/news.model';
import { AbstractNewsService } from '../service/abstract-news.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private newsService = inject(AbstractNewsService); 

  selectedTag = '';
  searchQuery = '';
  currentPage = 1;
  itemsPerPage = 4;

  tags: string[] = [];
  newsItems: NewsItem[] = [];
  hotNews: NewsItem[] = [];

  ngOnInit(): void {
    this.tags = this.newsService.tags;
    this.newsItems = this.newsService.newsItems();
    this.hotNews = this.newsService.getHotNews(this.newsItems);

    this.route.queryParams.subscribe(params => {
      if (params['tag']) {
        this.selectedTag = params['tag'];
      }
    });
  }

  get filteredNews(): NewsItem[] {
    return this.newsService.filterNews(this.newsItems, this.selectedTag, this.searchQuery);
  }

  get paginatedNews(): NewsItem[] {
    return this.newsService.paginate(this.filteredNews, this.currentPage, this.itemsPerPage);
  }

  get totalPages(): number {
    return this.newsService.getTotalPages(this.filteredNews, this.itemsPerPage);
  }

  selectTag(tag: string): void {
    this.selectedTag = this.selectedTag === tag ? '' : tag;
  }

  onSearchChange(): void {
    if (this.searchQuery.trim().length > 0) {
      this.selectedTag = '';
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  goToNews(news: NewsItem): void {
    this.router.navigate(['news', news.id]);
  }
}
