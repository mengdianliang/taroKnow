import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import TopicList from '../../components/topicList/topicList'

import Menu from '../../components/menu/menu'


import './index.less'

class Index extends Component {

    config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    
    return (
      <View className='index'>
        <Menu />
        <TopicList />
      </View>
    )
  }
}

export default Index
