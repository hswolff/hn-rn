import React, {
  Component,
  PropTypes,
} from 'react-native';
import * as store from './store';
import { Provider } from 'react-redux';

export default class HNProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  state = {
  };

  componentWillMount() {
    this.setState({
      store: store.create(),
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
