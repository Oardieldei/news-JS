import './sources.css';
import type { NewsSource } from '../../../types/news';

class Sources {
    draw(data: NewsSource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        if (!sourceItemTemp) {
            throw new Error('Source template not found');
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceName = sourceClone.querySelector('.source__item-name');
            if (!sourceName) {
                throw new Error('Source name element not found');
            }
            sourceName.textContent = item.name;

            const sourceItem = sourceClone.querySelector('.source__item');
            if (!sourceItem) {
                throw new Error('Source item element not found');
            }
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesElem = document.querySelector<HTMLDivElement>('.sources');
        if (!sourcesElem) {
            throw new Error('Sources container not found');
        }
        sourcesElem.append(fragment);
    }
}

export default Sources;
