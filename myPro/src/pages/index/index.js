import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import Child from './child'
import './index.less'
// 判断当前运行环境   process.env.TARO_ENV, 只能在开发期使用
const isH5 = process.env.TARO_ENV
if(isH5) {

} else {
  
}
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  state={
    name: 'nihao',
    list: [
      {id: 1, name: '1'},
      {id: 2, name: '2'},
      {id: 3, name: '3'},
      {id: 4, name: '4'},
      {id: 5, name: '5'},
      {id: 6, name: '6'},
    ]
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  test() {
    console.log('test父组件传递参数给子组件');
  }
  // 在 v1.3.0-beta.0 之后，自定义组件间的事件传递可以不用 on 开头，但内置组件的事件依然是以 on 开头的，为了一致性我们仍然推荐你以 on 开头命名你的事件。
  // 在 Taro 中另一个不同是你不能使用 catchEvent 的方式阻止事件冒泡。你必须明确的使用 stopPropagation。例如，阻止事件冒泡你可以这样写：
  goTo() {
    Taro.navigateTo({url: '/pages/test/test?name=zhangsan'});
  }
  // 不能在render之外定义标签类的方法
  render () {
    const { name,list } = this.state;
    return (
      <View className='index'>
        <Text>{name}</Text>
        <Child name={name} test={() => this.test()}/>
        <Button onClick={() => this.goTo()}>跳转</Button>
        {list.map((item) => <View key={item.id}>{item.name}</View>)}
      </View>
    )
  }
}
