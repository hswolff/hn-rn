import React, {
  PropTypes,
  Component,
  ListView,
} from 'react-native';

export default class ItemListView extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    renderRow: PropTypes.func.isRequired,
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
        renderRow={this.props.renderRow}
        {...this.props}
      />
    );
  }
}
