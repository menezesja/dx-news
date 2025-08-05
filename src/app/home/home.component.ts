import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Footer } from '../footer/footer.component';
import { NewsItem } from '../model/news.model';
import { AbstractNewsService } from '../service/abstract-news.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    Footer
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private newsService = inject(AbstractNewsService); 

  selectedTag = '';
  searchQuery = '';
  searchPage = 1;
  resultsPerPage = 2;

  tags: string[] = [];
  newsItems: NewsItem[] = [];
  hotNews: NewsItem[] = [];
  recentNews: NewsItem[] = [];
  highlightNews: NewsItem | null = null;
  carouselNews: NewsItem[] = [];
  searchResults: NewsItem[] = [];

  ngOnInit(): void {
    this.tags = this.newsService.tags;
    this.newsItems = this.newsService.newsItems();
    this.hotNews = this.newsService.getHotNews(this.newsItems);
    this.recentNews = this.newsService.getRecent(this.newsItems);

    this.route.queryParams.subscribe(params => { 
      const tag = params['tag'] || ''; 
      this.selectTag(tag); 
    });
  }

  get filteredNews(): NewsItem[] {
    return this.newsService.filterNews(this.newsItems, this.selectedTag, this.searchQuery);
  }

  get paginatedSearchResults(): NewsItem[] {
    const remaining = this.searchResults.slice(1);
    return this.newsService.paginate(remaining, this.searchPage, this.resultsPerPage);
  }

  get totalSearchPages(): number {
    const remaining = this.searchResults.length > 1 ? this.searchResults.slice(1) : [];
    return this.newsService.getTotalPages(remaining, this.resultsPerPage);
  }

  isSearchOrTagActive(): boolean {
    return this.searchQuery.trim().length > 0 || this.selectedTag !== '';
  }

  selectTag(tag: string): void {
    this.selectedTag = this.selectedTag === tag ? '' : tag;
    this.searchQuery = '';
    this.searchPage = 1;

    const filtered = this.filteredNews;

    if (filtered.length === 0) {
      this.highlightNews = null;
      this.carouselNews = [];
      this.searchResults = [];
      return;
    }

    this.highlightNews = filtered[0];
    this.carouselNews = this.selectedTag ? [] : filtered.filter(news => news.id !== this.highlightNews?.id);
    this.searchResults = filtered;
  }

  onSearchChange(): void {
    this.searchPage = 1;

    if (this.searchQuery.trim().length === 0) {
      this.searchResults = [];
      this.highlightNews = this.newsService.getHotNews(this.newsItems)[0] || null;
      this.carouselNews = this.newsItems.filter(news => news.id !== this.highlightNews?.id);
      return;
    }

    this.selectedTag = '';
    this.searchResults = this.filteredNews;

    if (this.searchResults.length === 0) {
      this.highlightNews = null;
      return;
    }

    this.highlightNews = this.searchResults.length > 1 ? this.searchResults[0] : null;
  }

  nextPage(): void {
    if (this.searchPage < this.totalSearchPages) {
      this.searchPage++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevPage(): void {
    if (this.searchPage > 1) {
      this.searchPage--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToNews(news: NewsItem): void {
    this.router.navigate(['news', news.id]);
  }

  groupNewsInPairs(newsArray: NewsItem[]): NewsItem[][] {
    const pairs: NewsItem[][] = [];
    for (let i = 0; i < newsArray.length; i += 2) {
      pairs.push(newsArray.slice(i, i + 2));
    }
    return pairs;
  }

  scrollCarousel(direction: 'left' | 'right'): void {
    const carousel = document.querySelector('.news-carousel');
    if (carousel) {
      const scrollAmount = 300;
      carousel.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }
}