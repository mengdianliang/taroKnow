import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Test extends Component {

  config = {
    navigationBarTitleText: 'Test'
  }

  state={
    name: 'nihao',
  }

  componentWillMount () { 
      let { params: { name } } = this.$router;
      console.log(name);
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  test() {
    console.log('test父组件传递参数给子组件');
  }

  render () {
    const { name } = this.state;
    return (
      <View className='test'>
        <Text>test</Text>
      </View>
    )
  }
}
