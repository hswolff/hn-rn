import api from './api';

export const FETCH_ITEMS = 'FETCH_ITEMS';
/**
 * Fetches data for all itemIds given and then sends an action to the store
 * with the data.
 * @param {Array.<number>} itemIds Array of item ids.
 * @return {Function}
 */
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

/**
 * Uses an apiMethodto fetch item IDs. This only gets an array of itemIds
 * that we can then use to fetch each individual data.
 * @param {Function} apiMethod API method to fetch dta.
 * @param {string} actionType Action type to send.
 * @return {Function}
 */
function fetchTopLevelIds(apiMethod, actionType) {
  return dispatch => {
    return apiMethod().then(itemIds => {
      return dispatch({
        type: actionType,
        payload: itemIds,
      });
    });
  };
}

/**
 * Given a function that can fetch an array of item IDs this function uses that
 * and then takes that array of itemIds to fetch the data for each.
 * It's a two hop ajax request as we're dependent on the first API call to
 * resolve.
 * @param {Function} fetchTopLevelAction Action method to fetch top level IDs.
 * @param {string} stateProp Where on the store the top level Ids are stored.
 * @return {Function}
 */
export function fetchTopLevelIdsAndItems(
  fetchTopLevelAction,
  stateProp
) {
  return (dispatch, getState) => {
    fetchTopLevelAction()(dispatch).then(() => {
      const itemIds = getState()[stateProp];
      return fetchItems(itemIds)(dispatch);
    });
  };
}

export const FETCH_TOP_STORIES = 'FETCH_TOP_STORIES';
export function fetchTopStories() {
  return fetchTopLevelIds(api().fetchTopStories, FETCH_TOP_STORIES);
}

export function fetchTopStoryItems() {
  return fetchTopLevelIdsAndItems(fetchTopStories, 'topStoryIds');
}
