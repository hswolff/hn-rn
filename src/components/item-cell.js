import React, {
  PropTypes,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  touchableContainer: {
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default class ItemCell extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    // concurrents: PropTypes.number.isRequired,
    // engagedTime: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
  };

  static defaultProps = {
    isVisible: true,
  };

  render() {
    return (
      <TouchableHighlight
        style={styles.touchableContainer}
        underlayColor={'#F7F7F7'}
        onPress={this.props.onPress}
      >
        <View style={styles.container}>
          <Text>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
