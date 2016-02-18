import React, {
  PropTypes,
  Component,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import {
  fetchItems,
} from '../api/api-actions';
import ItemCell from '../components/item-cell';
import ItemList from '../components/item-list';

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

  componentDidMount() {
    this.props.fetchItems(this.props.item.kids);
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
        <ItemList items={this.props.kids} />
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
