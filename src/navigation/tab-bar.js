import React, {
  PropTypes,
  Component,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
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
              renderIcon={() => (
                <Icon name={item.iconName} size={28} color="#000" />
              )}
              renderSelectedIcon={() => (
                <Icon name={item.iconName} size={28} color="#EF701E" />
              )}
              onPress={() => {
                this.props.changeNavigationItem(item);
              }}
            >
              <NavItemComponent
                navigator={this.props.navigator}
                routes={Routes}
                {...item.componentProps}
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
