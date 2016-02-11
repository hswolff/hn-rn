import { combineReducers } from 'redux';

const combinedReducers = combineReducers({
  test: (state = {}) => state,
});

export default function indexReducer(state, action) {
  return combinedReducers(state, action);
}
