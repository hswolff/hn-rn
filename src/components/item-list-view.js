import React, {
  PropTypes,
  Component,
  ListView,
  RefreshControl,
} from 'react-native';

export default class ItemListView extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    renderRow: PropTypes.func.isRequired,
    onRefresh: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.state.isRefreshing = false;

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

  onRefresh = () => {
    this.setState({
      isRefreshing: true,
    });

    this.props.onRefresh().then(() => {
      this.setState({
        isRefreshing: false,
      });
    });
  };

  render() {
    let refreshControl = null;

    if (this.props.onRefresh) {
      refreshControl = (
        <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={this.onRefresh}
          tintColor="#E1772C"
          colors={['#E1772C', '#00ff00', '#0000ff']}
          progressBackgroundColor="#ffff00"
        />
      );
    }

    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        initialListSize={20}
        pageSize={10}
        dataSource={this.state.dataSource}
        renderRow={this.props.renderRow}
        refreshControl={refreshControl}
        enableEmptySections={true} // eslint-disable-line
        {...this.props}
      />
    );
  }
}
