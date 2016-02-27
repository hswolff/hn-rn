import React, {
  PropTypes,
  Component,
  StyleSheet,
  View,
  InteractionManager,
} from 'react-native';
import { connect } from 'react-redux';

import {
  fetchItems,
} from '../api/api-actions';
import ItemCell from './item-cell';
import CommentList from './comment-list';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export class ItemDetailsPage extends Component {
  static propTypes = {
    id: PropTypes.number,
    item: PropTypes.object,
    kids: PropTypes.array.isRequired,
    fetchItems: PropTypes.func.isRequired,
  };

  static defaultProps = {
    items: [],
  };

  state = {
    interactionsCompleted: false,
  };

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        interactionsCompleted: true,
      }, () => {
        this.props.fetchItems(this.props.item.kids);
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ItemCell {...this.props.item} />
        <View style={{
          height: 2,
          backgroundColor: 'black',
        }}
        />
        <CommentList items={this.props.kids} />
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const itemId = props.id;
    const item = state.items[itemId];
    const kids = item.kids || [];

    return {
      item,
      kids: kids.reduce((all, storyId) => {
        const childItem = state.items[storyId];
        // Only add items if they exist.
        if (childItem) {
          all.push(childItem);
        }
        return all;
      }, []),
    };
  },
  {
    fetchItems,
  }
)(ItemDetailsPage);
