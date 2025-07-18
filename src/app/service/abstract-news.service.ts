import { Signal } from '@angular/core';
import { NewsItem } from '../model/news.model';

export abstract class AbstractNewsService {
  abstract tags: string[]; 
  abstract newsItems: Signal<NewsItem[]>; 

  abstract filterNews(newsItems: NewsItem[], tag: string, query: string): NewsItem[];
  abstract paginate(news: NewsItem[], currentPage: number, itemsPerPage: number): NewsItem[];
  abstract getHotNews(newsItems: NewsItem[]): NewsItem[];
  abstract getTotalPages(filtered: NewsItem[], itemsPerPage: number): number;
  abstract updateViews(newsId: number): void;
  abstract updateRating(newsId: number, stars: number): void;
  abstract getRating(newsId: number): number;
}
