import createReducer from '../utils/create-reducer';

import {
  FETCH_ITEMS,
  FETCH_TOP_STORIES,
  FETCH_ASK_STORIES,
  FETCH_SHOW_STORIES,
  FETCH_JOB_STORIES,
} from './api-actions';

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

export const topStoryIds = createReducer([], {
  [FETCH_TOP_STORIES](state, action) {
    if (action.payload) {
      return action.payload;
    }

    return state;
  },
});

export const askIds = createReducer([], {
  [FETCH_ASK_STORIES](state, action) {
    if (action.payload) {
      return action.payload;
    }

    return state;
  },
});

export const showIds = createReducer([], {
  [FETCH_SHOW_STORIES](state, action) {
    if (action.payload) {
      return action.payload;
    }

    return state;
  },
});

export const jobIds = createReducer([], {
  [FETCH_JOB_STORIES](state, action) {
    if (action.payload) {
      return action.payload;
    }

    return state;
  },
});
