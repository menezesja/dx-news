import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NewsService {
    readonly tags: string[] = ['WORKSHOP', 'VISITS', 'DX ACADEMY', 'DX DAY', 'PRODUCTION'];

    filterNews(newsItems: any[], tag: string, query: string): any[] {
        let filtered = !tag ? newsItems : newsItems.filter(n => n.category === tag);
        if (query.trim()) {
        filtered = filtered.filter(n =>
            n.title.toLowerCase().includes(query.toLowerCase()) ||
            n.description.toLowerCase().includes(query.toLowerCase())
        );
        }
        return filtered;
    }

    paginate(news: any[], currentPage: number, itemsPerPage: number): any[] {
        const start = (currentPage - 1) * itemsPerPage;
        return news.slice(start, start + itemsPerPage);
    }

    getHotNews(newsItems: any[]): any[] {
        return [...newsItems].sort((a, b) => b.views - a.views).slice(0, 3);
    }

    getTotalPages(filtered: any[], itemsPerPage: number): number {
        return Math.ceil(filtered.length / itemsPerPage);
    }
}