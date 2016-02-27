import {
  fetchTopStoryItems,
  fetchAskItems,
  fetchShowItems,
  fetchJobItems,
} from '../api/api-actions';

import ItemListPage from '../components/item-list-page';

export const TOP = {
  id: 'top-stories',
  title: 'Top',
  iconName: 'hacker-news',
  component: ItemListPage,
  componentProps: {
    fetchAction: fetchTopStoryItems,
    getItemIds: (state) => state.topStoryIds,
  },
};

const ASK_STORIES = {
  id: 'ask-stories',
  title: 'Ask',
  iconName: 'question-circle',
  component: ItemListPage,
  componentProps: {
    fetchAction: fetchAskItems,
    getItemIds: (state) => state.askIds,
  },
};

const SHOW_STORIES = {
  id: 'show-stories',
  title: 'Show',
  iconName: 'bullhorn',
  component: ItemListPage,
  componentProps: {
    fetchAction: fetchShowItems,
    getItemIds: (state) => state.showIds,
  },
};

const JOB_STORIES = {
  id: 'job-stories',
  title: 'Job',
  iconName: 'briefcase',
  component: ItemListPage,
  componentProps: {
    fetchAction: fetchJobItems,
    getItemIds: (state) => state.jobIds,
  },
};

export const NavigationItems = [
  TOP,
  ASK_STORIES,
  SHOW_STORIES,
  JOB_STORIES,
];
