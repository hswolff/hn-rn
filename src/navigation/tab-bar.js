import React, {
  PropTypes,
  Component,
  StyleSheet,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import TabNavigator from 'react-native-tab-navigator';

import * as Routes from '../routes';
import { NavigationItems } from './navigation-constants';
import { changeNavigationItem } from './navigation-actions';

const styles = StyleSheet.create({
  selectedTitleStyle: {
  },
});

export class TabBar extends Component {
  static propTypes = {
    changeNavigationItem: PropTypes.func.isRequired,
    selectedItem: PropTypes.object.isRequired,
    navigator: PropTypes.object,
  };

  render() {
    return (
      <TabNavigator>
        {NavigationItems.map(item => {
          const NavItemComponent = item.component;

          return (
            <TabNavigator.Item
              key={item.title}
              title={item.title}
              selected={this.props.selectedItem.id === item.id}
              selectedTitleStyle={styles.selectedTitleStyle}
              renderIcon={() => <Image /> }
              renderSelectedIcon={() => <Image /> }
              onPress={() => {
                this.props.changeNavigationItem(item);
              }}
            >
              <NavItemComponent
                navigator={this.props.navigator}
                routes={Routes}
              />
            </TabNavigator.Item>
          );
        })}
      </TabNavigator>
    );
  }
}

export default connect(
  (state) => ({
    selectedItem: state.navigation.selectedItem,
  }),
  {
    changeNavigationItem,
  }
)(TabBar);
