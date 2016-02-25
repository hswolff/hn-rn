import React, {
  PropTypes,
  Component,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import {
  fetchTopStoryItems,
} from '../api/api-actions';
import ItemList from '../components/item-list';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export class TopStoriesPage extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchTopStoryItems: PropTypes.func.isRequired,
    navigator: PropTypes.object,
    routes: PropTypes.object,
  };

  static defaultProps = {
    items: [],
  };

  componentDidMount() {
    this.props.fetchTopStoryItems();
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

export default connect(
  (state) => {
    const topStoryIds = state.topStoryIds;
    return {
      items: topStoryIds.reduce((all, storyId) => {
        const item = state.items[storyId];
        // Only add items if they exist.
        if (item) {
          all.push(item);
        }
        return all;
      }, []),
    };
  },
  {
    fetchTopStoryItems,
  },
  undefined,
  { pure: false }
)(TopStoriesPage);
