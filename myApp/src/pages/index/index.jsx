import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { setGlobalData, getGlobalData } from '../../constants/global_data';

import { add, minus, asyncAdd } from '../../actions/counter';

import './index.scss';

@connect(
  ({ counter }) => ({
    counter
  }),
  dispatch => ({
    add() {
      dispatch(add());
    },
    dec() {
      dispatch(minus());
    },
    asyncAdd() {
      dispatch(asyncAdd());
    }
  })
)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'index页',
      date: new Date(),
      timerID: null
    };
  }

  componentDidMount() {
    console.log('组件第一次渲染之后执行');
    setGlobalData('test', '我是谁');
    this.setState({ title: getGlobalData('test') });
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentWillUnmount() {}

  componentDidShow() {
    this.setState({
      timerID: setInterval(() => this.tick(), 1000)
    });
  }

  componentDidHide() {
    clearInterval(this.state.timerID);
  }

  config = {
    navigationBarTitleText: '首页'
  };
  tick() {
    this.setState({
      date: new Date()
    });
  }
  goQuestion() {
    Taro.navigateTo({
      url: '/pages/question/question'
    });
  }
  render() {
    let { title } = this.state;
    return (
      <View className='index'>
        <View className='title'>{title}</View>
        <View class='go-question'>
          <Button onClick={() => this.goQuestion()}>去提问</Button>
        </View>
        <Button className='add_btn' onClick={this.props.add}>
          +
        </Button>
        <Button className='dec_btn' onClick={this.props.dec}>
          -
        </Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>
          async
        </Button>
        <View>
          <Text>{this.props.counter.num}</Text>
        </View>
        <View>
          <Text>Hello, World</Text>
          <Text>现在时间是 {this.state.date.toLocaleTimeString()}.</Text>
        </View>
      </View>
    );
  }
}

export default Index;
