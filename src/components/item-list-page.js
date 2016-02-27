import React, {
  PropTypes,
  Component,
  StyleSheet,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ItemList from '../components/item-list';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export class ItemListPage extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchAction: PropTypes.func.isRequired,
    navigator: PropTypes.object,
    routes: PropTypes.object,
  };

  static defaultProps = {
    items: [],
  };

  componentDidMount() {
    this.props.fetchAction();
  }

  render() {
    return (
      <View style={styles.container}>
        <ItemList
          items={this.props.items}
          onRowPress={(item) => {
            this.props.navigator.push(
              this.props.routes.getItemDetailsPage(item.id)
            );
          }}
        />
      </View>
    );
  }
}

const ItemListPageConnected = connect(
  (state, props) => {
    const itemIds = props.getItemIds(state);
    return {
      items: itemIds.reduce((all, itemId) => {
        const item = state.items[itemId];
        // Only add items if they exist.
        if (item) {
          all.push(item);
        }
        return all;
      }, []),
    };
  },
  (dispatch, props) => {
    return bindActionCreators({
      fetchAction: props.fetchAction,
    }, dispatch);
  },
  undefined,
  { pure: false }
)(ItemListPage);

ItemListPageConnected.propTypes.getItemIds = PropTypes.func.isRequired;

export default ItemListPageConnected;
