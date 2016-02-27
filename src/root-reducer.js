import { combineReducers } from 'redux';
import navigation from './navigation/navigation-reducer';
import {
  items,
  topStoryIds,
  askIds,
  showIds,
  jobIds,
} from './api/api-reducers';

const combinedReducers = combineReducers({
  navigation,
  items,
  topStoryIds,
  askIds,
  showIds,
  jobIds,
});

export default function indexReducer(state, action) {
  return combinedReducers(state, action);
}
