import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import Dialog from './dialog'

export default class TestDialog extends Component {

  config = {
    navigationBarTitleText: '组件children'
  }

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
       <Dialog>
           <Text>子组建</Text>
       </Dialog>
       <Dialog myText={<Text>文本</Text>}>
       </Dialog>
      </View>
    )
  }
}
