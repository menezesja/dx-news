import { Injectable, Signal, computed, signal } from '@angular/core';
import { AbstractNewsService } from './abstract-news.service';
import { environment } from '../../../environments/environments';
import { NewsItem } from '../model/news.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewsService  extends AbstractNewsService {
    override tags!: string[];
    override newsItems!: Signal<NewsItem[]>;

    override filterNews(newsItems: NewsItem[], tag: string, query: string): NewsItem[] {
        throw new Error('Method not implemented.');
    }

    override paginate(news: NewsItem[], currentPage: number, itemsPerPage: number): NewsItem[] {
        throw new Error('Method not implemented.');
    }
    
    override getHotNews(newsItems: NewsItem[]): NewsItem[] {
        throw new Error('Method not implemented.');
    }

    override getTotalPages(filtered: NewsItem[], itemsPerPage: number): number {
        throw new Error('Method not implemented.');
    }
}