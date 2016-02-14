import { combineReducers } from 'redux';
import navigation from './navigation/navigation-reducer';
import {
  topStoryIds,
  items,
} from './api/api-reducers';

const combinedReducers = combineReducers({
  navigation,
  topStoryIds,
  items,
});

export default function indexReducer(state, action) {
  return combinedReducers(state, action);
}
