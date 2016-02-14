import api from './api';

export const FETCH_TOP_STORY_IDS = 'FETCH_TOP_STORY_IDS';
export function fetchTopStoryIds() {
  return dispatch => {
    return api().fetchTopStories().then(itemIds => {
      return dispatch({
        type: FETCH_TOP_STORY_IDS,
        payload: itemIds,
      });
    });
  };
}

export const FETCH_ITEMS = 'FETCH_ITEMS';
export function fetchItems(itemIds) {
  return dispatch => {
    return api().fetchItems(itemIds).then(items => {
      return dispatch({
        type: FETCH_ITEMS,
        payload: items,
      });
    });
  };
}

export function fetchTopStoryItems() {
  return (dispatch, getState) => {
    fetchTopStoryIds()(dispatch).then(() => {
      const topStoryIds = getState().topStoryIds;
      return fetchItems(topStoryIds)(dispatch);
    });
  };
}
