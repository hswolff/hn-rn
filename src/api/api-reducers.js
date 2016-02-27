import createReducer from '../utils/create-reducer';

import {
  FETCH_TOP_STORIES,
  FETCH_ITEMS,
} from './api-actions';

export const topStoryIds = createReducer([], {
  [FETCH_TOP_STORIES](state, action) {
    if (action.payload) {
      return action.payload;
    }

    return state;
  },
});

export const items = createReducer({}, {
  [FETCH_ITEMS](state, action) {
    if (action.payload) {
      const nextState = {
        ...state,
      };

      return action.payload.reduce((all, item) => {
        nextState[item.id] = item;
        return nextState;
      }, nextState);
    }

    return state;
  },
});
