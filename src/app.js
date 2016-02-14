import React, {
  Component,
} from 'react-native';

import Provider from './provider';
import TabBar from './navigation/tab-bar';

export default class HackerNews extends Component {
  render() {
    return (
      <Provider>
        <TabBar />
      </Provider>
    );
  }
}
