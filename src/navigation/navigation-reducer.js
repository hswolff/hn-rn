import createReducer from '../utils/create-reducer';

import {
  CHANGE_NAVIGATION,
} from './navigation-actions';
import {
  TOP,
} from './navigation-constants';

const initialState = {
  // Make copy of item to prevent it from being mutated.
  selectedItem: { ...TOP },
};

export default createReducer(initialState, {
  [CHANGE_NAVIGATION](state, action) {
    if (action.payload) {
      return {
        ...state,
        selectedItem: action.payload,
      };
    }

    return state;
  },
});
