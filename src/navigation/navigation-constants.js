import {
  fetchTopStoryItems,
} from '../api/api-actions';

import ItemListPage from '../components/item-list-page';

export const TOP = {
  id: 'top-stories',
  title: 'Top',
  component: ItemListPage,
  componentProps: {
    fetchAction: fetchTopStoryItems,
    getItemIds: (state) => state.topStoryIds,
  },
};

export const NavigationItems = [
  TOP,
];
