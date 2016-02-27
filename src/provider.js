import React, {
  Component,
  PropTypes,
} from 'react-native';
import {
  createMiddleware,
  createStore,
} from './store';
import rootReducer from './root-reducer';
import { Provider } from 'react-redux';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import reduxStorageDebounce from 'redux-storage-decorator-debounce';

export default class HNProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  constructor(...args) {
    super(args);

    this.createStore();
  }

  state = {
  };

  async createStore() {
    const engine = reduxStorageDebounce(createEngine('reduxStore'), 1500);
    const reduxStorageLoader = storage.createLoader(engine);

    const store = createStore(
      storage.reducer(rootReducer),
      undefined,
      createMiddleware(storage.createMiddleware(engine))
    );

    try {
      await reduxStorageLoader(store);
    } finally {
      this.setState({
        store,
      });
    }
  }

  render() {
    if (!this.state.store) {
      return null;
    }

    return (
      <Provider store={this.state.store}>
        {this.props.children}
      </Provider>
    );
  }
}
