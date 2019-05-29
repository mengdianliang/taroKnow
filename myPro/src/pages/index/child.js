import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

export default class Child extends Component {

  state={
    
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  // 组件事件传参只能在使用匿名箭头函数，或使用类作用域下的确切引用(this.handleXX || this.props.handleXX)，或使用 bind。
  render () {
      const { name, age, test } = this.props;

    return (
      <View className='child'>
        <Text>{name}</Text>
        <Text>{age}</Text>
        <Button onClick={() => test()}>点击</Button>
      </View>
    )
  }
}
// 当父组件传值为undefefined（不是null）,才会使用defaultProps
Child.defaultProps={
    age: 'lisi'
}
