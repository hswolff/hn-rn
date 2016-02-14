import React, {
  PropTypes,
  Component,
  StyleSheet,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import TabNavigator from 'react-native-tab-navigator';

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
              <NavItemComponent />
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
