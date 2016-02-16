import React, {
  PropTypes,
  Component,
  ListView,
} from 'react-native';

import ItemCell from './item-cell';

export default class ItemList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onRowPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onRowPress: () => ({}),
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.state.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state.dataSource.cloneWithRows(props.items);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.items),
    });
  }

  render() {
    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        initialListSize={20}
        pageSize={10}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => {
          return (
            <ItemCell
              {...rowData}
              onPress={() => this.props.onRowPress(rowData)}
            />
          );
        }}
        {...this.props}
      />
    );
  }
}
