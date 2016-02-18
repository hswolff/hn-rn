import React, {
  Component,
} from 'react-native';

import Provider from './provider';
import RootNavigator from './navigation/root-navigator';
import * as Routes from './routes';

export default class HackerNews extends Component {
  render() {
    return (
      <Provider>
        <RootNavigator
          initialRoute={Routes.getTabBar()}
        />
      </Provider>
    );
  }
}
