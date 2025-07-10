import { Injectable, Signal, computed, signal } from '@angular/core';
import { NewsItem } from '../model/news.model';

@Injectable({ providedIn: 'root' })
export class MockNewsService {
  private _newsItems = signal<NewsItem[]>([
    {
        id: 1,
        title: 'Hyperautomation Presentations from DX Academy',
        date: 'Jun 27, 2025',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        category: 'DX ACADEMY',
        views: 2341,
        imageUrl: 'https://picsum.photos/seed/hyperautomation/100',
    },
    {
        id: 2,
        title: 'Workshop on AI Integration',
        date: 'Jun 15, 2025',
        description:
            'Hands-on session with AI tools. Participants learned how to apply machine learning models Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliquacccccc',
        category: 'WORKSHOP',
        views: 1285,
        imageUrl: 'https://picsum.photos/seed/workshop/100',
    },
    {
        id: 3,
        title: 'Visit to Robotics Center',
        date: 'Jun 20, 2025',
        description:
            'Explore the latest robotic technologies. The tour included demonstrations of autonomous systems. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        category: 'VISITS',
        views: 3120,
        imageUrl: 'https://picsum.photos/seed/robotics/100',
    },
    {
        id: 4,
        title: 'Production Line Automation',
        date: 'Jun 10, 2025',
        description:
            'Optimizing manufacturing workflows. The session covered implementation strategies for smart factories. The session covered implementation strategies for smart factories.The session covered implementation strategies for smart factories.',
        category: 'DX DAY',
        views: 1540,
        imageUrl: 'https://picsum.photos/seed/production/100',
    },
    {
        id: 5,
        title: 'Production Line Automation',
        date: 'Jun 10, 2025',
        description:
            'Optimizing manufacturing workflows. The session covered implementation strategies for smart factories. The session covered implementation strategies for smart factories.The session covered implementation strategies for smart factories.',
        category: 'PRODUCTION',
        views: 1842,
        imageUrl: 'https://picsum.photos/seed/dxday/100',
    },
  ]);
  
  newsItems: Signal<NewsItem[]> = computed(() => this._newsItems());
}