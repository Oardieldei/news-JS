export interface NewsSource {
    id: string;
    name: string;
}

export interface Article {
    urlToImage: string | null;
    author: string | null;
    source: Pick<NewsSource, 'name'> & {
        id: string | null;
    };
    publishedAt: string;
    title: string;
    description: string | null;
    url: string;
}
