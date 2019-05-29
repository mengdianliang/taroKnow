import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import Head from '../../components/Head/'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  state={
    name: '李四'
  }

  componentWillMount () { }

  componentDidMount () { 
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  // 调用方法不能使用箭头函数
  click() {
    this.setState({
      name: '张三'
    });
  }
  render () {
    return (
      <View>
        <Head />
      </View>
    )
  }
}
