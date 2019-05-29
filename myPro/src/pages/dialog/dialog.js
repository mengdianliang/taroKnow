import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

export default class Dialog extends Component {

  state={
    
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // 不能在render之外定义标签类的方法
  render () {
    return (
      <View className='index'>
       {this.props.myText}
       {this.props.children}
      </View>
    )
  }
}
