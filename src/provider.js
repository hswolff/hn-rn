import React, {
  Component,
  PropTypes,
} from 'react-native';
import {
  createMiddleware,
  createStore,
} from './store';
import { Provider } from 'react-redux';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import reduxStorageDebounce from 'redux-storage-decorator-debounce';

export default class HNProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  state = {
  };

  componentWillMount() {
    const engine = reduxStorageDebounce(createEngine('reduxStore'), 1500);

    engine.load().then(storedState => {
      const middleware = createMiddleware(storage.createMiddleware(engine));

      this.setState({
        store: createStore(storedState, middleware),
      });
    });
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
