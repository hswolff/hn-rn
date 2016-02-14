import React, {
  PropTypes,
  Component,
  ListView,
  StyleSheet,
  View,
} from 'react-native';

import ItemCell from './item-cell';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default class ItemList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onRowPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onRowPress: () => ({}),
  };

  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }),
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.items),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          automaticallyAdjustContentInsets={false}
          initialListSize={20}
          pageSize={10}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <ItemCell
              {...rowData}
              onPress={() => this.props.onRowPress(rowData)}
            />
          )}
          {...this.props}
        />
      </View>
    );
  }
}
