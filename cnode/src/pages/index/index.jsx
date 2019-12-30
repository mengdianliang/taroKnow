import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import TopicList from '../../components/topicList/topicList';
import Menu from '../../components/menu/menu';

import './index.scss';

class Index extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: '首页'
  };

  render() {
    return (
      <View className='index'>
        <Menu />
        <TopicList />
      </View>
    );
  }
}

export default Index;
