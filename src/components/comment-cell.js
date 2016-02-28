import React, {
  PropTypes,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-htmlview';

import {
  fetchItems,
} from '../api/api-actions';

import { timeAgo } from '../utils/time-ago';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  containerExpanded: {
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 0,
  },
  expandedIcon: {
    paddingRight: 10,
  },

  loadChildren: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20,
  },
  loadChildrenText: {
    textAlign: 'center',
  },

  kidContainer: {
    marginTop: 10,
    paddingLeft: 15,
    borderColor: '#333',
    borderLeftWidth: 1,
  },
});

export class CommentCell extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    fetchItems: PropTypes.func,
    style: PropTypes.any,
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
    kids: [],
    kidsItems: [],
  };

  state = {
    expanded: true,
  };

  fetchKidsItems = () => {
    this.props.fetchItems(this.props.kids);
  };

  toggleExpanded = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
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
            <View style={styles.loadChildren}>
              <Text style={styles.loadChildrenText}>Load Children</Text>
            </View>
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

    const expandedIcon = this.state.expanded ? 'caret-down' : 'caret-right';

    const containerStyles = [
      styles.container,
      this.state.expanded ? styles.containerExpanded : null,
      this.props.style,
    ];

    return (
      <View style={containerStyles}>
        <TouchableOpacity onPress={this.toggleExpanded}>
          <View style={styles.header}>
            <Icon name={expandedIcon} size={20} color="#333"
              style={styles.expandedIcon}
            />
            <Text>{timeAgo(this.props.time)} ago </Text>
            <Text>by {this.props.by}</Text>
          </View>
        </TouchableOpacity>

        {this.state.expanded ? (
          <HTMLView value={this.props.text} />
        ) : null}

        {this.state.expanded ? kidContent : null}
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
