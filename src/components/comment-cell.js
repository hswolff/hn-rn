import React, {
  PropTypes,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';

import {
  fetchItems,
} from '../api/api-actions';

import { timeAgo } from '../utils/time-ago';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,

    borderColor: 'black',
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
  },

  kidContainer: {
    paddingLeft: 20,
  },
});

export class CommentCell extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    fetchItems: PropTypes.func,
    kidsItems: PropTypes.arrayOf(PropTypes.object),

    by: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    kids: PropTypes.arrayOf(PropTypes.number),
    parent: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    type: PropTypes.oneOf([
      'comment',
    ]),
  };

  static defaultProps = {
    isVisible: true,
    kids: [],
    kidsItems: [],
  };

  componentDidMount() {
    if (this.props.id === 11187622 && this.props.kids.length !== this.props.kidsItems.length) {
      this.fetchKidsItems();
    }
  }

  fetchKidsItems = () => {
    this.props.fetchItems(this.props.kids);
  };

  render() {
    const hasKids = this.props.kids.length > 0;
    const needsToLoadKids =
      this.props.kids.length !== this.props.kidsItems.length;

    let kidContent = null;
    if (hasKids) {
      if (needsToLoadKids) {
        kidContent = (
          <TouchableOpacity onPress={this.fetchKidsItems}>
            <Text>Load Children</Text>
          </TouchableOpacity>
        );
      } else {
        kidContent = (
          <View style={styles.kidContainer}>
            {this.props.kidsItems.map(kidId => {
              return (
                <CommentCellConnect key={`kidId-${kidId.id}`} {...kidId} />
              );
            })}
          </View>
        );
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>{timeAgo(this.props.time)} ago </Text>
          <Text>by {this.props.by}</Text>
        </View>

        <HTMLView value={this.props.text} />

        {kidContent}
      </View>
    );
  }
}

const CommentCellConnect = connect(
  (state, props) => {
    const kids = props.kids || [];

    return {
      kidsItems: kids.reduce((all, storyId) => {
        const item = state.items[storyId];
        // Only add items if they exist.
        if (item) {
          all.push(item);
        }
        return all;
      }, []),
      ...props,
    };
  },
  {
    fetchItems,
  },
)(CommentCell);

export default CommentCellConnect;
