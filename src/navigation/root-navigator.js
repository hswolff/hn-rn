import React, {
  PropTypes,
  Component,
  StyleSheet,
  Navigator,
} from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

const styles = StyleSheet.create({
  sceneStyle: {
    paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight,
  },
});

export default class RootNavigator extends Component {
  static propTypes = {
    initialRoute: PropTypes.object.isRequired,
  };

  render() {
    return (
      <ExNavigator
        initialRoute={this.props.initialRoute}
        style={{ flex: 1 }}
        sceneStyle={styles.sceneStyle}
      />
    );
  }
}
