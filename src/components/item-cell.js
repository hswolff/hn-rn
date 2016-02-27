import React, {
  PropTypes,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { timeAgo } from '../utils/time-ago';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,

    borderColor: '#ccc',
    borderBottomWidth: 1,
  },

  cellNumberContainer: {
    width: 30,
    alignItems: 'center',
    alignSelf: 'center',
    paddingRight: 8,
  },
  cellNumber: {
    fontSize: 16,
  },

  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    paddingBottom: 8,
  },
  contentFooter: {
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 12,
  },

  commentContainer: {
    width: 50,
    flexDirection: 'column',
    alignItems: 'center',
  },
  commentText: {
    paddingTop: 6,
  },
});

export default class ItemCell extends Component {
  static propTypes = {
    onPress: PropTypes.func,
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
    url: PropTypes.string,
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
            (<View style={styles.cellNumberContainer}>
              <Text style={styles.cellNumber}>{this.props.cellNumber}</Text>
            </View>)
          : null}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{this.props.title}</Text>

            <View style={styles.contentFooter}>
              <Text style={styles.footerText}>
                {this.props.score} points
                by {this.props.by}
                {timeAgo(this.props.time)} ago
              </Text>
            </View>
          </View>
          <View style={styles.commentContainer}>
            <Icon name={'comment'} size={34} color="#222" />
            <Text style={styles.commentText}>{this.props.descendants}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
