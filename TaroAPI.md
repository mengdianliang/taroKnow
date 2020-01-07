### 1. 前言
```python
Taro 以 微信小程序组件库 为标准，结合 jsx 语法规范，定制了一套自己的组件库规范。

基于以上原则，在小程序端，我们可以使用所有的小程序原生组件，而在其他端，我们提供了对应的组件库实现

H5 端，@tarojs/components，同时也是需要引入的默认标准组件库
RN 端为，@tarojs/components-rn
在使用时，我们需要先从 Taro 标准组件库 @tarojs/components 引用组件，再进行使用，例如使用 <View />、 <Text /> 组件

import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class C extends Component {
  render () {
    return (
      <View className='c'>
        <Text>c component</Text>
      </View>
    )
  }
}
注意
在组件的详细文档中列出了组件在不同端的支持程度，以及基本的使用示例。 部分未列出示例的，标明仅在小程序端支持的组件的用法可以直接参考小程序组件文档。

需要注意的是仍需遵循 Taro 的开发规范：

首字母大写与驼峰式命名
例如使用 H5 端尚未支持 map 组件

import Taro, { Component } from '@tarojs/taro'
// 引入 map 组件
import { Map } from '@tarojs/components'

class App extends Components {
  onTap () {}
  render () {
    return (
      <Map onClick={this.onTap} />
    )
  }
}
组件的事件传递都要以 on 开头
在微信小程序中 bind 开头这样的用法，都需要转成以 on 开头的形式。
```
### 2. 关于API：
```python
(1) API说明：
Taro 的 API 包括 Taro 内置提供的 API 以及对小程序的端能力 API 的封装。
其中对小程序的端能力 API 的封装，主要会基于微信小程序的 API 规范，对于其他小程序类似的 API，会在 Taro 中适配为小程序 API 的规范格式，并且都挂载在 Taro 命名空间下。
例如，支付宝小程序中，my.alert 用于弹出一个警告的模态框，而微信小程序中没有这一 API，与之类似的有 wx.showModal，所以在 Taro 中会将支付宝的 my.alert 统一为 Taro.showModal，从而减少一些跨平台兼容代码的书写。
而对于微信小程序中没有，而某些小程序平台特有的 API，可以先尝试用 Taro. + API 名称来进行调用，如果出现未定义，则使用对应小程序平台的命名空间（如 my、swan、tt 等）来进行调用，并反馈给我们。
当然，由于各个小程序平台的迭代非常快速，Taro 要不断跟进小程序的更新，有时候难免有些 API 没有加入 Taro 适配，你可以通过提 PR 或者 issue，来获得帮助。
同时，为了方便代码书写，Taro 默认对小程序的异步 API 进行了 promisify 化，你可以像使用 Promise 那样进行调用，例如
import Taro from '@tarojs/taro'
Taro.request(url).then(function (res) {
  console.log(res)
})

(2)Taro.Component：
    2-1. 通常你定义一个 Taro 组件相当于一个纯 JavaScript 类：
    import Taro, { Component } from '@tarojs/taro';
    class Welcome extends Component {
      render () {
        return <h1>Hello, {this.props.name}</h1>
      }
    }
    注意：这里 Taro 和 React 不一样的地方在于没有暴露出一个 createClass 的方法，你只能用 ES6 的 class 类来创建 Taro 组件。

    2-2. 组件生命周期：
    2-2-1. 装载(Mounting)：
        这些方法会在组件实例被创建和插入 DOM 中时被调用：
        constructor()
        componentWillMount()
        render()
        componentDidMount()
    2-2-2. 更新(Updating)：
        属性或状态的改变会触发一次更新。当一个组件在被重新渲染时，这些方法将会被调用：
        componentWillReceiveProps()
        shouldComponentUpdate()
        componentWillUpdate()
        render()
        componentDidUpdate()
    2-2-3. 卸载(Unmounting)：
        当一个组件被从 DOM 中移除时，该方法被调用：
        componentWillUnmount()
    2-2-4. 其他API：
        每一个组件还提供了其他的API：
        setState()
        forceUpdate()
    2-2-5. 类属性：
        defaultProps
    2-2-6. 实例属性：
        props
        state
        config（小程序专属）
    2-2-7. static getDerivedStateFromProps(props, state) v1.3 听说要替换掉componentWillReceiveProps，所以来看看：
        getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
        此方法无权访问组件实例（this）。如果你需要，可以通过提取组件 props 的纯函数及 class 之外的状态，在 getDerivedStateFromProps() 和其他 class 方法之间重用代码。
        和 componentWillReceiveProps 不同，getDerivedStateFromProps 会在每次 render 前触发此方法，而 componentWillReceiveProps 会在父组件重新渲染时调用。
        请注意： getDerivedStateFromProps() 如果存在，componentWillReceiveProps、componentWillMount 和 componentWillUpdate 将不会调用。 当你需要在以上老生命周期 setState 时，我们更推荐你使用 getDerivedStateFromProps 方法，因为它能减少一次更新开销。
    2-2-8. getSnapshotBeforeUpdate(prevProps, prevState) v1.3
        getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。
        应返回 snapshot 的值（或 null）。
        请注意： getSnapshotBeforeUpdate() 如果存在，componentWillReceiveProps、componentWillMount 和 componentWillUpdate 将不会调用。 当你需要在以上老生命周期 setState 时，我们更推荐你使用 getSnapshotBeforeUpdate 方法，因为它能减少一次更新开销。
(3) 环境判断：
    3-1. Taro.ENV_TYPE
        ENV_TYPE.WEAPP 微信小程序环境
        ENV_TYPE.SWAN 百度小程序环境
        ENV_TYPE.ALIPAY 支付宝小程序环境
        ENV_TYPE.TT 字节跳动小程序环境
        ENV_TYPE.WEB WEB(H5)环境
        ENV_TYPE.RN ReactNative 环境
    3-2. Taro.getEnv()
        获取当前环境值，具体值如上 Taro.ENV_TYPE   
(4) 消息机制：
    Taro 提供了 Taro.Events 来实现消息机制，使用时需要实例化它，如下
    import Taro, { Events } from '@tarojs/taro'
    const events = new Events()
    // 监听一个事件，接受参数
    events.on('eventName', (arg) => {
      // doSth
    })
    // 监听同个事件，同时绑定多个 handler
    events.on('eventName', handler1)
    events.on('eventName', handler2)
    events.on('eventName', handler3)
    // 触发一个事件，传参
    events.trigger('eventName', arg)
    // 触发事件，传入多个参数
    events.trigger('eventName', arg1, arg2, ...)
    // 取消监听一个事件
    events.off('eventName')
    // 取消监听一个事件某个 handler
    events.off('eventName', handler1)
    // 取消监听所有事件
    events.off()
    
    同时 Taro 还提供了一个全局消息中心 Taro.eventCenter 以供使用，它是 Taro.Events 的实例
    import Taro from '@tarojs/taro'
    Taro.eventCenter.on
    Taro.eventCenter.trigger
    Taro.eventCenter.off
```