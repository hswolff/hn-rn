import React, {
  PropTypes,
  Component,
  StyleSheet,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ItemCell from './item-cell';
import ItemListView from '../components/item-list-view';

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
        <ItemListView
          items={this.props.items}
          renderRow={(rowData, sectionId, rowId) => {
            return (
              <ItemCell
                {...rowData}
                cellNumber={parseInt(rowId, 10) + 1}
                onPress={() => {
                  this.props.navigator.push(
                    this.props.routes.getItemDetailsPage(rowData.id)
                  );
                }}
              />
            );
          }}
          onRefresh={() => this.props.fetchAction()}
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
