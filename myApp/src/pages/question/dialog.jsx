import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './dialog.scss';

export default class Dialog extends Component {
  state = {};

  render() {
    return <View className='dialog'>{this.props.children}</View>;
  }
}
