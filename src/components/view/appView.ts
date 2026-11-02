import News from './news/news';
import Sources from './sources/sources';
import type { Article, NewsSource } from '../../types/news';

interface NewsResponse {
    articles?: Article[];
}

interface SourcesResponse {
    sources?: NewsSource[];
}

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsResponse): void {
        const values = data.articles ?? [];
        this.news.draw(values);
    }

    drawSources(data: SourcesResponse): void {
        const values = data.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
