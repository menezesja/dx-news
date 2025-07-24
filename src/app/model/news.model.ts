export interface NewsItem {
    id: number;
    title: string;
    date: string;
    description: string;
    category: string;
    views: number;
    imageUrl: string;
    author?: string;
    content?: string; //texto da notícia
}