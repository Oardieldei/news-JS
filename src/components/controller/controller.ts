import AppLoader from './appLoader';
import type { Article, NewsSource } from '../../types/news';

class AppController extends AppLoader {
    getSources(callback: (data: NewsSource[]) => void): void {
        super.getResp<NewsSource[]>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data: Article[]) => void): void {
        const newsContainer = e.currentTarget;

        if (!(newsContainer instanceof HTMLElement)) {
            return;
        }

        let target = e.target;

        while (target && target !== newsContainer) {
            if (target instanceof HTMLElement && target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (!sourceId) {
                    return;
                }

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

                    super.getResp<Article[]>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }

                return;
            }

            target = target instanceof HTMLElement ? target.parentElement : null;
        }
    }
}

export default AppController;
