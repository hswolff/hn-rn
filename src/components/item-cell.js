import React, {
  PropTypes,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,

    borderColor: 'black',
    borderBottomWidth: 1,
  },
  leftContainer: {
    width: 50,
    alignSelf: 'center',
  },
  rightContainer: {
    flex: 1,
  },
  commentContainer: {
    width: 50,
    alignSelf: 'center',
  },
});

export default class ItemCell extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    cellNumber: PropTypes.number,

    by: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'job',
      'story',
      'comment',
      'poll',
      'pollopt',
    ]),
    url: PropTypes.string.isRequired,
    descendants: PropTypes.number,
    kids: PropTypes.arrayOf(PropTypes.number),
    dead: PropTypes.bool,
    deleted: PropTypes.bool,
  };

  static defaultProps = {
  };

  static defaultProps = {
    isVisible: true,
  };

  render() {
    return (
      <TouchableHighlight
        underlayColor={'#F7F7F7'}
        onPress={this.props.onPress}
      >
        <View style={styles.container}>
          {this.props.cellNumber ?
            (<View style={styles.leftContainer}>
              <Text>{this.props.cellNumber}</Text>
            </View>)
          : null}
          <View style={styles.rightContainer}>
            <Text>{this.props.title}</Text>

            <Text>{this.props.score} points</Text>
            <Text>by {this.props.by}</Text>
            <Text>{this.props.time} hours ago</Text>
            <Text>{(this.props.kids || []).length} comments</Text>
          </View>
          <View style={styles.commentContainer}>
            <Text>Comments</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
