import './news.css';
import type { Article } from '../../../types/news';

class News {
    draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            throw new Error('News template not found');
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItem = newsClone.querySelector<HTMLDivElement>('.news__item');
            if (!newsItem) {
                throw new Error('News item element not found');
            }

            if (idx % 2) {
                newsItem.classList.add('alt');
            }

            const newsMetaPhoto = newsClone.querySelector<HTMLDivElement>('.news__meta-photo');
            if (!newsMetaPhoto) {
                throw new Error('News photo element not found');
            }

            newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const newsMetaAuthor = newsClone.querySelector<HTMLLIElement>('.news__meta-author');
            if (!newsMetaAuthor) {
                throw new Error('News author element not found');
            }

            newsMetaAuthor.textContent = item.author || item.source.name;

            const newsMetaDate = newsClone.querySelector<HTMLLIElement>('.news__meta-date');
            if (!newsMetaDate) {
                throw new Error('News date element not found');
            }

            newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsDescriptionTitle = newsClone.querySelector<HTMLHeadingElement>('.news__description-title');
            if (!newsDescriptionTitle) {
                throw new Error('News title element not found');
            }

            newsDescriptionTitle.textContent = item.title;

            const newsDescriptionSource = newsClone.querySelector<HTMLHeadingElement>('.news__description-source');
            if (!newsDescriptionSource) {
                throw new Error('News source element not found');
            }

            newsDescriptionSource.textContent = item.source.name;

            const newsDescriptionContent = newsClone.querySelector<HTMLParagraphElement>('.news__description-content');
            if (!newsDescriptionContent) {
                throw new Error('News description element not found');
            }

            newsDescriptionContent.textContent = item.description;

            const newsReadMore = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
            if (!newsReadMore) {
                throw new Error('News link element not found');
            }

            newsReadMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElement = document.querySelector<HTMLDivElement>('.news');
        if (!newsElement) {
            throw new Error('News container not found');
        }

        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
