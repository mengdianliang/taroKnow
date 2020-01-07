### 1.前言：
```python
api地址：https://nervjs.github.io/taro/docs/spec-for-taro.html
taro是一套遵循react语法规范的多段开发解决方案。
```
### 2.环境搭建：
```python
(1) cli 工具安装
    # 使用 npm 安装 CLI
    $ npm install -g @tarojs/cli
    # OR 使用 yarn 安装 CLI
    $ yarn global add @tarojs/cli
    # OR 安装了 cnpm，使用 cnpm 安装 CLI
    $ cnpm install -g @tarojs/cli
    
    注意事项: 值得一提的是，如果安装过程出现sass相关的安装错误，请在安装mirror-config-china后重试。
    $ npm install -g mirror-config-china    
    
    使用：$ taro init myApp
    
    在创建完项目之后，Taro 会默认开始安装项目所需要的依赖，安装使用的工具按照 yarn>cnpm>npm 顺序进行检测，一般来说，依赖安装会比较顺利，但某些情况下可能会安装失败，这时候你可以在项目目录下自己使用安装命令进行安装
    
    # 使用 yarn 安装依赖
    $ yarn
    # OR 使用 cnpm 安装依赖
    $ cnpm install
    # OR 使用 npm 安装依赖
    $ npm install
    
    // npm
     npm run dev:h5 WEB
     npm run dev:weapp 微信小程序
     npm run dev:swan 百度小程序
     npm run dev:alipay 支付宝小程序
(2) 特殊问题的处理:
在 H5 模式下，tabBar 可能会挡住页面 fixed 元素问题：这是因为与小程序的 tabBar 不同，在 H5 下 tabBar 是一个普通的组件，当页面中存在 fixed(bottom) 定位的元素时，其表现会与小程序中不一致。Taro 提供了一个适配的方法：
    .fixed {
      bottom: 0;
      /* 在 H5 模式下将会编译成 margin-bottom: 50px，在小程序模式下则会忽略 */
      margin-bottom: taro-tabbar-height;
    }
```
### 3.taro规范：
```python
(1) 文件命名:
Taro 中普通 JS/TS 文件以小写字母命名，多个单词以下划线连接，例如 util.js、util_helper.js
Taro 组件文件命名遵循 Pascal 命名法，例如 ReservationCard.jsx

(2) 文件后缀:
aro 中普通 JS/TS 文件以 .js 或者 .ts 作为文件后缀
Taro 组件则以 .jsx 或者 .tsx 作为文件后缀，当然这不是强制约束，只是作为一个实践的建议，组件文件依然可以以 .js 或者 .ts 作为文件后缀

(3) JavaScript 书写规范:
    使用两个空格进行缩进, 
    
    1) 不要混合使用空格与制表符作为缩进
    function hello (name) {
      console.log('hi', name)   // ✓ 正确
        console.log('hello', name)   // ✗ 错误
    }
    
    2) 除了缩进，不要使用多个空格
    const id =    1234    // ✗ 错误
    const id = 1234       // ✓ 正确
    
    3) 不要在句末使用分号
    const a = 'a'   // ✓ 正确
    const a = 'a';  // ✗ 错误
    
    4) 字符串统一使用单引号
    console.log('hello there')
    // 如果遇到需要转义的情况，请按如下三种写法书写
    const x = 'hello "world"'
    const y = 'hello \'world\''
    const z = `hello 'world'`
    
    5) 代码块中避免多余留白
    if (user) {
                            // ✗ 错误
      const name = getName()
     
    }
    
    if (user) {
      const name = getName()    // ✓ 正确
    }
    
    6) 关键字后面加空格
    if (condition) { ... }   // ✓ 正确
    if(condition) { ... }    // ✗ 错误
    
    7) 函数声明时括号与函数名间加空格
    function name (arg) { ... }   // ✓ 正确
    function name(arg) { ... }    // ✗ 错误
    
    run(function () { ... })      // ✓ 正确
    run(function() { ... })       // ✗ 错误
    
    8) 展开运算符与它的表达式间不要留空白
    fn(... args)    // ✗ 错误
    fn(...args)     // ✓ 正确
    
    9) 遇到分号时空格要后留前不留
    for (let i = 0 ;i < items.length ;i++) {...}    // ✗ 错误
    for (let i = 0; i < items.length; i++) {...}    // ✓ 正确
    
    10) 代码块首尾留空格
    if (admin){...}     // ✗ 错误
    if (admin) {...}    // ✓ 正确
    
    11) 圆括号间不留空格
    getName( name )     // ✗ 错误
    getName(name)       // ✓ 正确
    
    12)属性前面不要加空格
    user .name      // ✗ 错误
    user.name       // ✓ 正确
    
    13) 一元运算符前面跟一个空格
    typeof!admin        // ✗ 错误
    typeof !admin        // ✓ 正确
    
    14) 注释首尾留空格
    //comment           // ✗ 错误
    // comment          // ✓ 正确
    
    /*comment*/         // ✗ 错误
    /* comment */       // ✓ 正确
    
    15) 模板字符串中变量前后不加空格
    const message = `Hello, ${ name }`    // ✗ 错误
    const message = `Hello, ${name}`      // ✓ 正确
    
    16)逗号后面加空格
    // ✓ 正确
    const list = [1, 2, 3, 4]
    function greet (name, options) { ... }
    
    // ✗ 错误
    const list = [1,2,3,4]
    function greet (name,options) { ... }
    
    17)不允许有连续多行空行
    // ✓ 正确
    const value = 'hello world'
    console.log(value)
    
    // ✗ 错误
    const value = 'hello world'
    
    
    
    console.log(value)
    
    18) 单行代码块两边加空格
    function foo () {return true}    // ✗ 错误
    function foo () { return true }  // ✓ 正确
    if (condition) { return true }  // ✓ 正确
    
    19) 不要使用非法的空白符
    function myFunc () /*<NBSP>*/{}   // ✗ 错误
    
    20) 始终将逗号置于行末
    const obj = {
      foo: 'foo'
      ,bar: 'bar'   // ✗ 错误
    }
    
    const obj = {
      foo: 'foo',
      bar: 'bar'   // ✓ 正确
    }
    21) 点号操作符须与属性需在同一行
    console.log('hello')  // ✓ 正确
    console.
      log('hello')  // ✗ 错误
    console
      .log('hello') // ✓ 正确
     
    22) 文件末尾留一空行
    
    23) 函数调用时标识符与括号间不留间隔
    console.log ('hello') // ✗ 错误
    console.log('hello')  // ✓ 正确
    
    24) 键值对当中冒号与值之间要留空白
    const obj = { 'key' : 'value' }    // ✗ 错误
    const obj = { 'key' :'value' }     // ✗ 错误
    const obj = { 'key':'value' }      // ✗ 错误
    const obj = { 'key': 'value' }     // ✓ 正确
    
(4) 变量定义:
    1) 使用 const/let 定义变量:
    当前作用域不需要改变的变量使用 const，反之则使用 let
    const a = 'a'
    a = 'b'   // ✗ 错误，请使用 let 定义
    
    let test = 'test'
    
    var noVar = 'hello, world'   // ✗ 错误，请使用 const/let 定义变量
    
    2) 每个 const/let 关键字单独声明一个变量
    // ✓ 正确
    const silent = true
    let verbose = true
    
    // ✗ 错误
    const silent = true, verbose = true
    
    // ✗ 错误
    let silent = true,
        verbose = true
    
    3) 不要重复声明变量
    let name = 'John'
    let name = 'Jane'     // ✗ 错误
    
    let name = 'John'
    name = 'Jane'         // ✓ 正确
    
    4) 不要使用 undefined 来初始化变量
    let name = undefined    // ✗ 错误

    let name
    name = 'value'          // ✓ 正确
    
    5) 对于变量和函数名统一使用驼峰命名法
    function my_function () { }    // ✗ 错误
    function myFunction () { }     // ✓ 正确
    
    const my_var = 'hello'           // ✗ 错误
    const myVar = 'hello'            // ✓ 正确
    
    6) 不要定义未使用的变量
    function myFunction () {
      const result = something()   // ✗ 错误
    }
    
    7) 避免将变量赋值给自己
    name = name   // ✗ 错误
    
(5) 基本类型:
    1) 不要省去小数点前面的 0
    const discount = .5      // ✗ 错误
    const discount = 0.5     // ✓ 正确
    
    2) 字符串拼接操作符 (Infix operators) 之间要留空格
    // ✓ 正确
    const x = 2
    const message = 'hello, ' + name + '!'
    // ✗ 错误
    const x=2
    const message = 'hello, '+name+'!'
    
    3) 不要使用多行字符串
    const message = 'Hello \
                 world'     // ✗ 错误
    
    4) 检查 NaN 的正确姿势是使用 isNaN()
    if (price === NaN) { }      // ✗ 错误
    if (isNaN(price)) { }       // ✓ 正确
    
    5) 用合法的字符串跟 typeof 进行比较操作
    typeof name === undefined       // ✗ 错误
    typeof name === 'undefined'     // ✓ 正确
    
(6) 对象与数组:
    1) 对象中定义了存值器，一定要对应的定义取值器
    const person = {
      set name (value) {    // ✗ 错误
        this._name = value
      }
    }
    
    const person = {
      set name (value) {
        this._name = value
      },
      get name () {         // ✓ 正确
        return this._name
      }
    }
    
    2) 使用数组字面量而不是构造器
    const nums = new Array(1, 2, 3)   // ✗ 错误
    const nums = [1, 2, 3]            // ✓ 正确
    
    3) 不要解构空值
    const { a: {} } = foo         // ✗ 错误
    const { a: { b } } = foo      // ✓ 正确
    
    4) 对象字面量中不要定义重复的属性
    const user = {
      name: 'Jane Doe',
      name: 'John Doe'    // ✗ 错误
    }
    
    5) 不要扩展原生对象
    Object.prototype.age = 21     // ✗ 错误
    
    6) 外部变量不要与对象属性重名
    let score = 100
    function game () {
      score: while (true) {      // ✗ 错误
        score -= 10
        if (score > 0) continue score
        break
      }
    }
    
    7) 对象属性换行时注意统一代码风格
    const user = {
      name: 'Jane Doe', age: 30,
      username: 'jdoe86'            // ✗ 错误
    }
    
    const user = { name: 'Jane Doe', age: 30, username: 'jdoe86' }    // ✓ 正确
    
    const user = {
      name: 'Jane Doe',
      age: 30,
      username: 'jdoe86'
    }
    
    8) 避免使用不必要的计算值作对象属性
    const user = { ['name']: 'John Doe' }   // ✗ 错误
    const user = { name: 'John Doe' }       // ✓ 正确
    
(7) 函数:
    1) 不要定义冗余的函数参数
    function sum (a, b, a) {  // ✗ 错误
      // ...
    }
    
    function sum (a, b, c) {  // ✓ 正确
      // ...
    }
    
    2) 避免多余的函数上下文绑定
    const name = function () {
      getName()
    }.bind(user)    // ✗ 错误
    
    const name = function () {
      this.getName()
    }.bind(user)    // ✓ 正确
    
    3) 不要使用多余的括号包裹函数
    const myFunc = (function () { })   // ✗ 错误
    const myFunc = function () { }     // ✓ 正确
    
    4) 避免对声明过的函数重新赋值
    function myFunc () { }
    myFunc = myOtherFunc    // ✗ 错误
    
    5) 嵌套的代码块中禁止再定义函数
    if (authenticated) {
      function setAuthUser () {}    // ✗ 错误
    }
    
    6) 禁止使用 Function 构造器
    const sum = new Function('a', 'b', 'return a + b')    // ✗ 错误
    
    7) 禁止使用 Object 构造器
    let config = new Object()   // ✗ 错误
    
    8) 自调用匿名函数 (IIFEs) 使用括号包裹
    const getName = function () { }()     // ✗ 错误

    const getName = (function () { }())   // ✓ 正确
    const getName = (function () { })()   // ✓ 正确
    
    9) 不使用 Generator 函数语法
    使用 Promise 或者 async functions 来实现异步编程
    function* helloWorldGenerator() {     // ✗ 错误
      yield 'hello';
      yield 'world';
      return 'ending';
    }
    
(8) 正则:
    1) 正则中不要使用控制符
    const pattern = /\x1f/    // ✗ 错误
    const pattern = /\x20/    // ✓ 正确
    
    2) 正则中避免使用多个空格
    const regexp = /test   value/   // ✗ 错误

    const regexp = /test {3}value/  // ✓ 正确
    const regexp = /test value/     // ✓ 正确
    
(9) 类定义:
    1) 类名要以大写字母开头
    class animal {}
    const dog = new animal()    // ✗ 错误
    
    class Animal {}
    const dog = new Animal()    // ✓ 正确
    
    2) 避免对类名重新赋值
    class Dog {}
    Dog = 'Fido'    // ✗ 错误
    
    3) 子类的构造器中一定要调用 super
    class Dog {
      constructor () {
        super()   // ✗ 错误
      }
    }

    class Dog extends Mammal {
      constructor () {
        super()   // ✓ 正确
      }
    }
    
    4) 使用 this 前请确保 super() 已调用
    class Dog extends Animal {
      constructor () {
        this.legs = 4     // ✗ 错误
        super()
      }
    }
    
    5) 禁止多余的构造器
    class Car {
      constructor () {      // ✗ 错误
      }
    }
    
    class Car {
      constructor () {      // ✗ 错误
        super()
      }
    }
    
    6) 类中不要定义冗余的属性
    class Dog {
      bark () {}
      bark () {}    // ✗ 错误
    }
    
    7) 无参的构造函数调用时要带上括号
    function Animal () {}
    const dog = new Animal    // ✗ 错误
    const dog = new Animal()  // ✓ 正确
    
    8) new 创建对象实例后需要赋值给变量
    new Character()                     // ✗ 错误
    const character = new Character()   // ✓ 正确
    
(10) 模块:
    1) 同一模块有多个导入时一次性写完
    import { myFunc1 } from 'module'
    import { myFunc2 } from 'module'          // ✗ 错误
    
    import { myFunc1, myFunc2 } from 'module' // ✓ 正确
    
    2) import, export 和解构操作中，禁止赋值到同名变量
    import { config as config } from './config'     // ✗ 错误
    import { config } from './config'               // ✓ 正确
    
(11) 语句： 
    1) 避免在 return 语句中出现赋值语句
    function sum (a, b) {
      return result = a + b     // ✗ 错误
    }
    
    2) 不要随意更改关键字的值
    let undefined = 'value'     // ✗ 错误
    
    3) return，throw，continue 和 break 后不要再跟代码
    function doSomething () {
      return true
      console.log('never called')     // ✗ 错误
    }
    
(12) 逻辑与循环：
    1) 始终使用 === 替代 ==
    例外： obj == null 可以用来检查 null || undefined
    if (name === 'John')   // ✓ 正确
    if (name == 'John')    // ✗ 错误
    if (name !== 'John')   // ✓ 正确
    if (name != 'John')    // ✗ 错误
    
    2) 避免将变量与自己进行比较操作
    if (score === score) {}   // ✗ 错误
    
    3) if/else 关键字要与花括号保持在同一行
    // ✓ 正确
    if (condition) {
      // ...
    } else {
      // ...
    }
    
    // ✗ 错误
    if (condition)
    {
      // ...
    }
    else
    {
      // ...
    }
    
    4) 多行 if 语句的的括号不能省略
    // ✓ 正确
    if (options.quiet !== true) console.log('done')
    // ✓ 正确
    if (options.quiet !== true) {
      console.log('done')
    }
    // ✗ 错误
    if (options.quiet !== true)
      console.log('done')
      
    5) 请书写优雅的条件语句（avoid Yoda conditions）
    if (42 === age) { }    // ✗ 错误
    if (age === 42) { }    // ✓ 正确
    
    6) 避免使用常量作为条件表达式的条件（循环语句除外）
    if (false) {    // ✗ 错误
      // ...
    }
    
    if (x === 0) {  // ✓ 正确
      // ...
    }
    
    while (true) {  // ✓ 正确
      // ...
    }
    
    7) 循环语句中注意更新循环变量
    for (let i = 0; i < items.length; j++) {...}    // ✗ 错误
    for (let i = 0; i < items.length; i++) {...}    // ✓ 正确
    
    8) 如果有更好的实现，尽量不要使用三元表达式
    let score = val ? val : 0     // ✗ 错误
    let score = val || 0          // ✓ 正确
    
    9) switch 语句中不要定义重复的 case 分支
    switch 一定要使用 break 来将条件分支正常中断
    
    10) 避免不必要的布尔转换
    const result = true
    if (!!result) {   // ✗ 错误
      // ...
    }
    
    const result = true
    if (result) {     // ✓ 正确
      // ...
    }
 
 (13) 组件及 JSX 书写规范
    1) 组件创建
    Taro 中组件以类的形式进行创建，并且单个文件中只能存在单个组件
    
    2) 代码缩进：
    import Taro, { Component } from '@tarojs/taro'
    import { View, Text } from '@tarojs/components'
    
    class MyComponent extends Component {
      render () {
        return (
          <View className='test'>     // ✓ 正确
            <Text>12</Text>     // ✗ 错误
          </View>
        )
      }
    }
    
    3) 单引号：jSX 属性均使用单引号
    import Taro, { Component } from '@tarojs/taro'
    import { View, Input } from '@tarojs/components'
    
    class MyComponent extends Component {
      render () {
        return (
          <View className='test'>     // ✓ 正确
            <Text className="test_text">12</Text>     // ✗ 错误
          </View>
        )
      }
    }
    
    4) 对齐方式
    多个属性，多行书写，每个属性占用一行，标签结束另起一行
    // bad
    <Foo superLongParam='bar'
         anotherSuperLongParam='baz' />
    
    // good
    <Foo
      superLongParam='bar'
      anotherSuperLongParam='baz'
    />
    
    // 如果组件的属性可以放在一行就保持在当前一行中
    <Foo bar='bar' />
    
    // 多行属性采用缩进
    <Foo
      superLongParam='bar'
      anotherSuperLongParam='baz'
    >
      <Quux />
    </Foo>
    
    5) 空格使用
    终始在自闭合标签前面添加一个空格
    // bad
    <Foo/>
    
    // very bad
    <Foo                 />
    
    // bad
    <Foo
     />
    
    // good
    <Foo />
    
    6) 属性书写：属性名称始终使用驼峰命名法
    // bad
    <Foo
      UserName='hello'
      phone_number={12345678}
    />
    
    // good
    <Foo
      userName='hello'
      phoneNumber={12345678}
    />
    
    7) JSX 与括号：用括号包裹多行 JSX 标签
    // bad
    render () {
      return <MyComponent className='long body' foo='bar'>
               <MyChild />
             </MyComponent>
    }
    
    // good
    render () {
      return (
        <MyComponent className='long body' foo='bar'>
          <MyChild />
        </MyComponent>
      )
    }
    
    // good
    render () {
      const body = <div>hello</div>
      return <MyComponent>{body}</MyComponent>
    }
    
    8) 标签
    标签没有子元素时，始终使用自闭合标签
    // bad
    <Foo className='stuff'></Foo>
    
    // good
    <Foo className='stuff' />
    
    9) 如果控件有多行属性，关闭标签要另起一行
    
    // bad
    <Foo
      bar='bar'
      baz='baz' />
    
    // good
    <Foo
      bar='bar'
      baz='baz'
    />
    
    10) 书写顺序
    在 Taro 组件中会包含类静态属性、类属性、生命周期等的类成员，其书写顺序最好遵循以下约定（顺序从上至下）

    static 静态方法
    constructor
    componentWillMount
    componentDidMount
    componentWillReceiveProps
    shouldComponentUpdate
    componentWillUpdate
    componentDidUpdate
    componentWillUnmount
    点击回调或者事件回调 比如 onClickSubmit() 或者 onChangeDescription()
    render
    
    11) 通用约束与建议:
    所有内置组件均需要引入后再使用：
    import Taro, { Component } from '@tarojs/taro'
    import { View } from '@tarojs/components'
    
    class MyComponent extends Component {
      render () {
        return (
          <View className='test'>     // ✓ 正确
            <Text>12</Text>     // ✗ 错误
          </View>
        )
      }
    }
    
    推荐使用对象解构的方式来使用 state、props：
    import Taro, { Component } from '@tarojs/taro'
    import { View, Input } from '@tarojs/components'
    class MyComponent extends Component {
      state = {
        myTime: 12
      }
      render () {
        const { isEnable } = this.props     // ✓ 正确
        const { myTime } = this.state     // ✓ 正确
        return (
          <View className='test'>
            {isEnable && <Text className='test_text'>{myTime}</Text>}
          </View>
        )
      }
    }
    
    不要以 class/id/style 作为自定义组件的属性名
    <Hello class='foo' />     // ✗ 错误
    <Hello id='foo' />     // ✗ 错误
    <Hello style='foo' />     // ✗ 错误
    
    不要使用 HTML 标签
    <div className='foo'></div>     // ✗ 错误
    <span id='foo' /></span>    // ✗ 错误
    
    不要在调用 this.setState 时使用 this.state
    由于 this.setState 异步的缘故，这样的做法会导致一些错误，可以通过给 this.setState 传入函数来避免
    this.setState({
      value: this.state.value + 1
    })   // ✗ 错误
    this.setState(prevState => ({ value: prevState.value + 1 }))    // ✓ 正确
    
    map 循环时请给元素加上 key 属性：
    list.map(item => {
      return (
        <View className='list_item' key={item.id}>{item.name}</View>
      )
    })
    
    尽量避免在 componentDidMount 中调用 this.setState
    因为在 componentDidMount 中调用 this.setState 会导致触发更新
    
    import Taro, { Component } from '@tarojs/taro'
    import { View, Input } from '@tarojs/components'
    class MyComponent extends Component {
      state = {
        myTime: 12
      }
      componentDidMount () {
        this.setState({     // ✗ 尽量避免，可以在 componentWillMount 中处理
          name: 1
        })
      }
      render () {
        const { isEnable } = this.props
        const { myTime } = this.state
        return (
          <View className='test'>
            {isEnable && <Text className='test_text'>{myTime}</Text>}
          </View>
        )
      }
    }
    
    不要在 componentWillUpdate/componentDidUpdate/render 中调用 this.setState
    import Taro, { Component } from '@tarojs/taro'
    import { View, Input } from '@tarojs/components'
    class MyComponent extends Component {
      state = {
        myTime: 12
      }
      componentWillUpdate () {
        this.setState({     // ✗ 错误
          name: 1
        })
      }
      componentDidUpdate () {
        this.setState({     // ✗ 错误
          name: 1
        })
      }
      render () {
        const { isEnable } = this.props
        const { myTime } = this.state
        this.setState({     // ✗ 错误
          name: 11
        })
        return (
          <View className='test'>
            {isEnable && <Text className='test_text'>{myTime}</Text>}
          </View>
        )
      }
    }
    
    不要定义没有用到的 state
    import Taro, { Component } from '@tarojs/taro'
    import { View, Input } from '@tarojs/components'
    class MyComponent extends Component {
      state = {
        myTime: 12,
        noUsed: true   // ✗ 没有用到
      }
      render () {
        const { myTime } = this.state
        return (
          <View className='test'>
            <Text className='test_text'>{myTime}</Text>
          </View>
        )
      }
    }
    
    组件最好定义 defaultProps
    import Taro, { Component } from '@tarojs/taro'
    import { View, Input } from '@tarojs/components'
    class MyComponent extends Component {
      static defaultProps = {
        isEnable: true
      }
      state = {
        myTime: 12
      }
      render () {
        const { isEnable } = this.props
        const { myTime } = this.state
    
        return (
          <View className='test'>
            {isEnable && <Text className='test_text'>{myTime}</Text>}
          </View>
        )
      }
    }
    
    值为 true 的属性可以省略书写值
    <Hello personal />
    <Hello personal={false} />
    
    JSX 属性或者表达式书写时需要注意空格
    属性书写不带空格，如果属性是一个对象，则对象括号旁边需要带上空格
    <Hello name={ firstname } />   // ✗ 错误
    <Hello name={ firstname} />   // ✗ 错误
    <Hello name={firstname } />   // ✗ 错误
    <Hello name={{ firstname: 'John', lastname: 'Doe' }} />      // ✓ 正确
    
    事件绑定均以 on 开头
    import Taro, { Component } from '@tarojs/taro'
    import { View, Input } from '@tarojs/components'
    class MyComponent extends Component {
      state = {
        myTime: 12
      }
      clickHandler (e) {
        console.log(e)
      }
      render () {
        const { myTime } = this.state
        return (
          <View className='test' onClick={this.clickHandler}>    // ✓ 正确
            <Text className='test_text'>{myTime}</Text>
          </View>
        )
      }
    }
    
    子组件传入函数时属性名需要以 on 开头
    import Taro, { Component } from '@tarojs/taro'
    import { View, Input } from '@tarojs/components'
    import Tab from '../../components/Tab/Tab'
    class MyComponent extends Component {
      state = {
        myTime: 12
      }
      clickHandler (e) {
        console.log(e)
      }
      render () {
        const { myTime } = this.state
        return (
          <View className='test'>
            <Tab onChange={this.clickHandler} />    // ✓ 正确
            <Text className='test_text'>{myTime}</Text>
          </View>
        )
      }
    }
    
(14) Taro 自身限制规范：
    不能使用 Array#map 之外的方法操作 JSX 数组
    先处理好需要遍历的数组，然后再用处理好的数组调用 map 方法。
    numbers.filter(isOdd).map((number) => <View />)
    for (let index = 0; index < array.length; index++) {
      // do you thing with array
    }
    const element = array.map(item => {
      return <View />
    })
```
### 4. 路由功能：
```python
(1) // 跳转到目的页面，打开新页面
    Taro.navigateTo({
      url: '/pages/page/path/name'
    })
    
    // 跳转到目的页面，在当前页面打开
    Taro.redirectTo({
      url: '/pages/page/path/name'
    })
(2) 路由传参:
    // 传入参数 id=2&type=test
    Taro.navigateTo({
      url: '/pages/page/path/name?id=2&type=test'
    })
    class C extends Taro.Component {
      componentWillMount () {
        console.log(this.$router.params) // 输出 { id: 2, type: 'test' }
      }
    }
```
### 5. 设计稿及尺寸单位：
```python
    在 Taro 中尺寸单位建议使用 px、 百分比 %，Taro 默认会对所有单位进行转换。在 Taro 中书写尺寸按照 1:1 的关系来进行书写，即从设计稿上量的长度 100px，那么尺寸书写就是 100px，当转成微信小程序的时候，尺寸将默认转换为 100rpx，当转成 H5 时将默认转换为以 rem 为单位的值。
    如果你希望部分 px 单位不被转换成 rpx 或者 rem ，最简单的做法就是在 px 单位中增加一个大写字母，例如 Px 或者 PX 这样，则会被转换插件忽略。
    结合过往的开发经验，Taro 默认以 750px 作为换算尺寸标准，如果设计稿不是以 750px 为标准，则需要在项目配置 config/index.js 中进行设置，例如设计稿尺寸是 640px，则需要修改项目配置 config/index.js 中的 designWidth 配置为 640：
    const config = {
      projectName: 'myProject',
      date: '2018-4-18',
      designWidth: 640,
      ....
    }
    const DEVICE_RATIO = {
      '640': 2.34 / 2,
      '750': 1,
      '828': 1.81 / 2
    }
    建议使用 Taro 时，设计稿以 iPhone 6 750px 作为设计尺寸标准。
    
    
    在编译时，Taro 会帮你对样式做尺寸转换操作，但是如果是在 JS 中书写了行内样式，那么编译时就无法做替换了，针对这种情况，Taro 提供了 API Taro.pxTransform 来做运行时的尺寸转换。
    
    Taro.pxTransform(10) // 小程序：rpx，H5：rem
```
### 6. 静态资源引用：
```python
    (1) 引用图片、音频、字体等文件：可以直接通过 ES6 的 import 语法来引用此类文件，拿到文件引用后直接在 JSX 中进行使用
        // 引用文件
        import namedPng from '../../images/path/named.png'
        
        // 使用
        <View>
          <Image src={namedPng} />
        </View>
    
    (2) 引用 JSON 文件：
        // 引用 json 文件
        /**
        * named.json
        * {
        *   x: 1
        * }
        **/
        import namedJson from '../../json/path/named.json'
        
        console.log(namedJson.x)
```
### 7. 组件的外部样式和全局样式：
```python
    (1) 自定义组件对应的样式文件，只对该组件内的节点生效。编写组件样式时，需要注意以下几点：

    组件和引用组件的页面不能使用 id 选择器（#a）、属性选择器（[a]）和标签名选择器，请改用 class 选择器。
    组件和引用组件的页面中使用后代选择器（.a .b）在一些极端情况下会有非预期的表现，如遇，请避免使用。
    子元素选择器（.a > .b）只能用于 View 组件与其子节点之间，用于其他组件可能导致非预期的情况。
    继承样式，如 font 、 color ，会从组件外（父组件）继承到组件内。但是引用组件时在组件节点上书写的 className 无效。 （具体解决方案请参见下面的外部和全局样式介绍。）
    除继承样式外， app.scss 中的样式、组件所在页面的样式，均对自定义组件无效。
    
    #a { } /* 在组件中不能使用 */
    [a] { } /* 在组件中不能使用 */
    button { } /* 在组件中不能使用 */
    .a > .b { } /* 除非 .a 是 view 组件节点，否则不一定会生效 */
    
    除此以外，组件可以指定它所在节点的默认样式，使用 :host 选择器（需要包含基础库 1.7.2 或更高版本的开发者工具支持）。
    
    /* 该自定义组件的默认样式 */
    :host {
      color: yellow;
    }
    
    (2) 外部样式类:
    /* CustomComp.js */
    export default class CustomComp extends Component {
      static externalClasses = ['my-class']
    
      render () {
        return <View className="my-class">这段文本的颜色由组件外的 class 决定</View>
      }
    }
    
    /* MyPage.js */
    export default class MyPage extends Component {
      render () {
        return <CustomComp my-class="red-text" />
      }
    }
    
    /* MyPage.scss */
    .red-text {
      color: red;
    }
    
    注意：externalClasses 需要使用 短横线命名法 (kebab-case)，而不是 React 惯用的 驼峰命名法 (camelCase)。否则无效。
    
    (3) 全局样式类:
    使用外部样式类可以让组件使用指定的组件外样式类，如果希望组件外样式类能够完全影响组件内部，可以将组件构造器中的 options.addGlobalClass 字段置为 true。这个特性从小程序基础库版本 2.2.3 开始支持。
    
    /* CustomComp.js */
    export default class CustomComp extends Component {
      static options = {
        addGlobalClass: true
      }
    
      render () {
        return <View className="red-text">这段文本的颜色由组件外的 class 决定</View>
      }
    }
    /* 组件外的样式定义 */
    .red-text {
      color: red;
    }
```
### 8. JSX 简介：
```python
    在 Taro 中，我们使用 JSX 作为一种 DSL 进而编译成各端通用的语法。 JSX 是一种看起来很像 XML 的 JavaScript 语法扩展，比起模板语言，它具有以下优点：

    各大编辑器和 IDE 都能提供非常良好的支持；
    可以做到类型安全，在编译期就能发现错误；
    提供语义化并且可以移动的标签；
    背后的社区支持非常强力；
    如果你是一名新手的话，可能一开始学习一种新语法会产生一些抵触。但当你熟悉了之后，就能发现 JSX 更符合程序语言的书写逻辑，在处理一些精细复杂需求的时候也会比模板语言更为得心应手。
    
    (1) 首字母大写与驼峰式命名：
    在 Taro 中，所有组件都应当首字母大写并且使用大驼峰式命名法（Camel-Case）。
    import Taro, { Component } from '@tarojs/taro'
    // 引入一个自定义组件组件
    import HomePage from './page'
    class App extends Component {
      render () {
        return (
          <HomePage message="Hello World!" />
        )
      }
    }
    
    (2) 属性：
    1) 使用 JavaScript 表达式：
    <MyComponent foo={1 + 2 + 3 + 4} />
    2) if 语句和 for 循环在 JavaScript 中不是表达式，因此它们不能直接在 JSX 中使用，所以你可以将它们放在周围的代码中：
    import Taro, { Component } from '@tarojs/taro'
    class App extends Components {
      render () {
        let description
        if (this.props.number % 2 == 0) {
          description = <Text>even</Text>
        } else {
          description = <Text>odd</Text>
        }
        return <View>{this.props.number} is an {description} number</View>
      }
    }
    3) 字符串常量：
    你可以将字符串常量作为属性值传递。下面这两个 JSX 表达式是等价的：
    <MyComponent message="hello world" />
    <MyComponent message={'hello world'} />
    4) 默认为 True
    如果你没有给属性传值，它默认为 true。因此下面两个 JSX 是等价的：
    <MyTextBox autocomplete />
    <MyTextBox autocomplete={true} />
    
    (3) 嵌套：
    JavaScript 表达式也可以嵌套：
    render () {
      const todos = ['finish doc', 'submit pr', 'nag dan to review'];
      return (
        <ul>
          {todos.map((todo) => <Text>{todo}</Text>)}
        </ul>
      )
    }
    
    (4) 布尔值、Null 和 Undefined 被忽略：
    false、null、undefined 和 true 都是有效的 children，但它们不会直接被渲染。下面的表达式是等价的：
    <View />
    <View></View>
    <View>{false}</View>
    <View>{null}</View>
    <View>{undefined}</View>
    <View>{true}</View>
    
    (5) 这在根据条件来确定是否渲染 元素时非常有用。以下的 JSX 只会在 showHeader 为 true 时渲染 <Header /> 组件。
    <View>
      {showHeader && <Header />}
      <Content />
    </View>
    
```
### 9. 组件化 & Props：
```python
    (1) Props 的只读性：
    所有的 Taro 组件必须像纯函数那样使用它们的 props。
    (2) 使用 PropTypes 检查类型：
    import PropTypes from 'prop-types';
    class Greeting extends Component {
      render() {
        return (
          <h1>Hello, {this.props.name}</h1>
        );
      }
    }
    Greeting.propTypes = {
      name: PropTypes.string
    };
    
```
### 10. 生命周期 & State：
```python
    (1) 注意我们如何在 this 中保存定时器 ID。
    虽然 this.props 由 Taro 本身设置以及 this.state 具有特殊的含义，但如果需要存储不用于视觉输出的东西，则可以手动向类中添加其他字段。
    如果你不在 render() 中使用某些东西，它就不应该在状态中。
    我们将在 componentWillUnmount() 生命周期钩子中卸载计时器：
    
    import Taro, { Component } from '@tarojs/taro'
    class Clock extends Component {
      constructor (props) {
        super(props)
        this.state = { date: new Date() }
      }
      componentDidMount () {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }
      componentWillUnmount () {
        clearInterval(this.timerID)
      }
      tick () {
        this.setState({
          date: new Date()
        });
      }
      render() {
        return (
          <View>
            <Text>Hello, world!</Text>
            <Text>现在的时间是 {this.state.date.toLocaleTimeString()}.</Text>
          </View>
        )
      }
    }
    (2) 正确地使用 State：
    // 假设我们之前设置了 this.state.counter = 0
    updateCounter () {
      this.setState({
        counter: 1
      }, () => {
        // 在这个函数内你可以拿到 setState 之后的值
      })
    }
    (3) state 更新会被合并：
    componentDidMount() {
      fetchPosts().then(response => {
        this.setState({
          posts: response.posts
        });
      });
    
      fetchComments().then(response => {
        this.setState({
          comments: response.comments
        })
      })
    }
```
### 11. 事件处理
```python
    (1) Taro 元素的事件处理和 DOM 元素的很相似。但是有一点语法上的不同:
    Taro 事件绑定属性的命名采用驼峰式写法，而不是小写。 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串 (DOM 元素的写法)。 例如，传统的微信小程序模板：
    <button onclick="activateLasers">
      Activate Lasers
    </button>
    Taro 中稍稍有点不同：
    <button onClick={this.activateLasers}>
      Activate Lasers
    </button>
    
    在 Taro 中另一个不同是你不能使用 catchEvent 的方式阻止事件冒泡。你必须明确的使用 stopPropagation。例如，阻止事件冒泡你可以这样写：
    class Toggle extends Component {
      constructor (props) {
        super(props)
        this.state = {isToggleOn: true}
      }
      onClick = (e) => {
        e.stopPropagation()
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }))
      }
      render () {
        return (
          <button onClick={this.onClick}>
            {this.state.isToggleOn ? 'ON' : 'OFF'}
          </button>
        )
      }
    }
    (1) 向事件处理程序传递参数
    通常我们会为事件处理程序传递额外的参数。例如，传入欲删除行的 id：
    <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
    
    当你通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面。
    class Popper extends Component {
      constructor () {
        super(...arguments)
        this.state = { name:'Hello world!' }
      }
      // 你可以通过 bind 传入多个参数
      preventPop (name, test, e) {    //事件对象 e 要放在最后
        e.stopPropagation()
      }
      render () {
        return <Button onClick={this.preventPop.bind(this, this.state.name, 'test')}></Button>
      }
    }
    
    (2) 柯里化:
    除了 bind 和匿名函数之外，事件参数也可以使用柯里化传参。
    
    class Title extends Component{
      handleClick = (index) => (e) => {
        e.stopPropagation()
        this.setState({
          currentIndex: index
        })
      }
      render() {
        const { currentIndex } = this.props;
        return (
          {/* 调用 `this.handleClick(currentIndex)` 会返回一个函数，这个函数可以访问到 `currentIndex` 同时也能满足 `onClick` 的签名 */}
          <View onClick={this.handleClick(currentIndex)}>
          </View>
        )
      }
     }
     
     注意： 使用通过 usingComponents 的第三方组件不支持匿名函数
     
     (3) 在函数式组件中，事件传参可以传入事件的引用也可以传入匿名函数，以下是函数式组件配合 useCallback 的一个例子：
     const App = () => {
      const [c1, setC1] = useState(0);
      const [c2, setC2] = useState(0);
      const [c3, setC3] = useState(0);
      const increment = c => c + 1
      // 只有 useCallback 对应的 c1 或 c2 的值改变时，才会返回新的函数
      const increment1 = useCallback(() => setC1(increment), [c1]);
      const increment2 = useCallback(() => setC2(increment), [c2]);
      return (<View>
        <Text> Counter 1 is {c1} </Text>
        <Text> Counter 2 is {c2} </Text>
        <Text> Counter 3 is {c3} </Text>
        <View>
          <Button onClick={increment1}>Increment Counter 1</Button>
          <Button onClick={increment2}>Increment Counter 2</Button>
          <Button onClick={() => setC3(increment)}>Increment Counter 3</Button>
        </View>
      </View>)
    }
    
    (4) 任何组件的事件传递都要以 on 开头:
    // 正确
    const element = <View onClick={this.onTag} />
    const element2 = <Input onFocus={this.onFocus} />
    const element3 = <CustomElement onAnimationEnd={this.props.onAnimationEnd} />
```
### 12. 条件渲染：
```python
    (1) 元素变量：
    所有的 Taro 组件必须像纯函数那样使用它们的 props。
    (2) 使用 PropTypes 检查类型：
    import PropTypes from 'prop-types';
    class Greeting extends Component {
      render() {
        return (
          <h1>Hello, {this.props.name}</h1>
        );
      }
    }
    Greeting.propTypes = {
      name: PropTypes.string
    };
```
### 13. 函数式组件：
```python
(1) 类函数式组件：
由于一个文件不能定义两个组件，但有时候我们需要组件内部的抽象组件，这时类函数式组件就是你想要答案。假设我们有一个 Class 组件，它包括了一个 Header 一个 Footer，我们可以这样定义：
class SomePage extends Taro.Component {
  renderHeader () {
    const { header } = this.state
    return <View>{header}</View>
  }
  renderFooter (footer) {
    return <View>{footer}</View>
  }
  render () {
    return (
      <View>
        {this.renderHeader()}
        {...}
        {this.renderFooter('footer')}
      </View>
    )
  }
}
在 renderHeader 或 renderFooter 函数中，我们可以访问类的 this，也可以传入不限量的参数，这类型的函数也可以调用无限次数。但这样的写法也存在一些限制：
函数的命名必须以 render 开头，render 后的第一个字母需要大写
函数的参数不得传入 JSX 元素或 JSX 元素引用
函数不能递归地调用自身

(2) 闭包函数式组件：
在一个普通的函数式组件中，我们需要一个另外的抽象组件多次调用，同时我们还希望这个抽象组件能访问到我们当前作用域的值，这时候我们就需要闭包函数式组件：
function Header ({ user }) {
  const name = user.name
  const renderTitle = () => {
    // renderTitle 每次都能获取到当前作用域 `name` 的值
    return <View>Welcome, {name}</View>
  }
  return (
    <View>
      {/* 重要人士我们要欢迎他三次 */ }
      {renderTitle()}
      {renderTitle()}
      {renderTitle()}
    </View>
  )
}
注：一般情况下只建议在普通函数式组件中使用闭包函数式组件，而在 Taro.Component 中可以显式地定义一个类函数式组件和它的参数和签名，这样函数的作用域更为清晰也更易维护。
```
### 14. Context：
```python
    在一个典型的 Taro 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），这些属性是应用程序中许多组件都需要的。Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。
    (1) Taro.createContext：
    const MyContext = Taro.createContext(defaultValue)
    创建一个 Context 对象。当 Taro 渲染一个订阅了这个 Context 对象的组件，这个组件会从最先渲染的 Provider 中读取到 Provider 的 value。
    (2) Context.Provider：
    <MyContext.Provider value={/* 某个值 */}>
    每个 Context 对象都会返回一个 Provider Taro 组件，它允许消费组件订阅 context 的变化。
    Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。
    当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部包含 contextType 或使用 useContext 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。
    通过新旧值检测来确定变化，使用了与 Object.is 相同的算法。
    
    由于现在 Taro 还没有 render props 的完整支持，所以无法使用 Context.Comsumer API，如果要消费 Context，可以使用 ContextType 或 useContext API。
    (3) Class.contextType：
    class MyClass extends Taro.Component {
      componentDidMount() {
        let value = this.context;
        /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
      }
      componentDidUpdate() {
        let value = this.context;
        /* ... */
      }
      componentWillUnmount() {
        let value = this.context;
        /* ... */
      }
      render() {
        let value = this.context;
        /* 基于 MyContext 组件的值进行渲染 */
      }
    }
    MyClass.contextType = MyContext;
    
    挂载在 class 上的 contextType 属性会被重赋值为一个由 Taro.createContext() 创建的 Context 对象。这能让你使用 this.context 来消费 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。
    
    注意： 你只通过该 API 订阅单一 context。如果你想订阅多个，阅读使用多个 Context 章节 如果你正在使用实验性的 public class fields 语法，你可以使用 static 这个类属性来初始化你的 contextType。
    
    class MyClass extends React.Component {
      static contextType = MyContext;
      render() {
        let value = this.context;
        /* 基于这个值进行渲染工作 */
      }
    }
    (4) 动态 Context:
    // counter-context.js
    export const CounterContext = React.createContext(0);
    
    // index.js
    class Index extends Component {
      render () {
        const [ count, setCount ] = useState(0)
        return (
          <CounterContext.Provider value={count}>
            <View className='container'>
              <Test />
              <Button onClick={() => setCount(0)}>Reset</Button>
              <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
              <Button onClick={() => setCount(prevCount => prevCount - 1)}>-</Button>
            </View>
          </CounterContext.Provider>
        )
      }
    }
    
    // child.js
    class Child extends Taro.Component {
      shouldComponentUpdate () {
        // 即便返回 false 也不会阻止 CounterContext 更新消费它的组件
        return false
      }
    
      render () {
        return <Counter />
      }
    }
    
    // counter.js
    import { CounterContext } from './counter-context.js'
    class Counter extends Taro.Component {
      static contextType = CounterContext
    
      render () {
        const value = this.context
        return (
          <View>
            Count: {value}
          </View>
        )
      }
    }
    (5) 消费多个 Context：
    const ThemeContext = Taro.createContext('light');

    // 用户登录 context
    const UserContext = Taro.createContext({
      name: 'Guest',
    });
    
    class App extends Taro.Component {
      render() {
        const {signedInUser, theme} = this.props;
        // 提供初始 context 值的 App 组件
        return (
          <ThemeContext.Provider value={theme}>
            <UserContext.Provider value={signedInUser}>
              <Layout />
            </UserContext.Provider>
          </ThemeContext.Provider>
        );
      }
    }
    function Layout() {
      return (
        <div>
          <Sidebar />
          <Content />
        </div>
      );
    }
    // 一个组件可能会消费多个 context
    function Content() {
      const theme = useContext(ThemeContext)
      const user =  useContext(UserContext)
      return (
        <ProfilePage user={user} theme={theme} />
      )
    }
```
### 15. Hooks：
```python
(1) 在 Taro 中使用 Hooks API 很简单，只需要从 @tarojs/taro 中引入即可。
import { useEffect, useLayoutEffect, useReducer, useState, useRef, useCallback, useMemo } from '@tarojs/taro'
(2) useState：

```
### 16. Children 与组合：
```python
经测试，由于微信小程序的 <slot /> 无法在循环中使用，因此 Children 和组合在微信小程序中也无法在循环中使用。百度小程序、支付宝小程序、H5、React Native 都可以在循环中使用此功能。
(1) Children：
在我们设计组件时，有些组件通常不知道自己的子组件会有什么内容，例如 Sidebar 和 Dialog 这样的容器组件。

我们建议在这样的情况使用 this.props.children 来传递子元素：
class Dialog extends Component {
  render () {
    return (
      <View className='dialog'>
        <View className='header'>Welcome!</View>
        <View className='body'>
          {this.props.children}
        </View>
        <View className='footer'>-- divider --</View>
      </View>
    )
  }
}
这样就能允许其它组件在 JSX 中嵌套任意子组件传递给 Dialog:
class App extends Component {
  render () {
    return (
      <View className='container'>
        <Dialog>
          <View className="dialog-message">
            Thank you for using Taro.
          </View>
        </Dialog>
      </View>
    )
  }
}
在 <Dialog /> JSX 标签内的任何内容都会作为它的子元素(Children)都会传递到它的组件。
(2) 注意事项：
请不要对 this.props.children 进行任何操作。Taro 在小程序中实现这个功能使用的是小程序的 slot 功能，也就是说你可以把 this.props.children 理解为 slot 的语法糖，this.props.children 在 Taro 中并不是 React 的 ReactElement 对象，因此形如 this.props.children && this.props.children、this.props.children[0] 在 Taro 中都是非法的。
this.props.children 无法用 defaultProps 设置默认内容。由于小程序的限制，Taro 也无法知道组件的消费者是否传入内容，所以无法应用默认内容。
不能把 this.props.children 分解为变量再使用。由于普通的 props 有一个确切的值，所以当你把它们分解为变量运行时可以处理，this.props.children 则不能这样操作，你必须显性地把 this.props.children 全部都写完整才能实现它的功能。
(3) 组合：
有些情况你不仅仅需要只传递一个子组件，可能会需要很多个「占位符」。例如在这个 Dialog 组件中，你不仅需要自定义它的 body，你希望它的 header 和 footer 都是给 Dialog 组件的使用者自由定制。这种情况可以这样做：
class Dialog extends Component {
  render () {
    return (
      <View className='dialog'>
        <View className='header'>
          {this.props.renderHeader}
        </View>
        <View className='body'>
          {this.props.children}
        </View>
        <View className='footer'>
          {this.props.renderFooter}
        </View>
      </View>
    )
  }
}

class App extends Component {
  render () {
    return (
      <View className='container'>
        <Dialog
          renderHeader={
            <View className='welcome-message'>Welcome!</View>
          }
          renderFooter={
            <Button className='close'>Close</Button>
          }
        >
          <View className="dialog-message">
            Thank you for using Taro.
          </View>
        </Dialog>
      </View>
    )
  }
}
在我们声明 Dialog 组件时，header 和 footer 部分我们分别增加了 this.props.renderHeader 和 this.props.renderFooter 作为占位符。相应地，我们在使用 Dialog 组件时，就可以给 renderHeader 和 renderFooter 传入 JSX 元素，这两个分别传入的 JSX 元素将会填充它们在 Dialog 组件中的位置——就像在 Dialog JSX 标签里写入的内容，会填充到 this.props.children 的位置一样。
(4) 注意事项：
组件的组合需要遵守 this.props.children 的所有规则。组合这个功能和 this.props.children 一样是通过 slot 实现的，也就是说 this.props.children 的限制对于组件组合也都同样适用。
所有组合都必须用 render 开头，且遵守驼峰式命名法。和我们的事件规范以 on 开头一样，组件组合使用 render 开头。
组合只能传入单个 JSX 元素，不能传入其它任何类型。当你需要进行一些条件判断或复杂逻辑操作的时候，可以使用一个 Block 元素包裹住，然后在 Block 元素的里面填充其它复杂的逻辑。
```
### 17. Refs 引用：
```python
Refs 提供了一种访问在 render 方法中创建的 DOM 节点（小程序原生组件）或 Taro 组件实例的方式。
在常规的 Taro 数据流中，props 是父组件与子组件交互的唯一方式。要修改子元素，你需要用新的 props 去重新渲染子元素。然而，在少数情况下，你需要在常规数据流外强制修改子元素。被修改的子元素可以是 Taro 组件实例，或者是一个 DOM 元素。在这种情况下，Taro 提供了解决办法。
(1) 不要过度使用 Refs：
(2) 使用字符串创建 ref：
class MyComponent extends Component {
  componentDidMount () {
    // 如果 ref 的是小程序原生组件，那只有在 didMount 生命周期之后才能通过
    // this.refs.input 访问到小程序原生组件
    if (process.env.TARO_ENV === 'weapp') {
      // 这里 this.refs.input 访问的时候通过 `wx.createSeletorQuery` 取到的小程序原生组件
    } else if (process.env.TARO_ENV === 'h5') {
      // 这里 this.refs.input 访问到的是 `@tarojs/components` 的 `Input` 组件实例
    }
  }
  render () {
    return <Input ref='input' />
  }
}
(2) 通过函数创建 ref：
你也可以通过传递一个函数创建 ref, 在函数中被引用的组件会作为函数的第一个参数传递。如果是被引用的组件是自定义组件，那可以在任意的生命周期访问引用。
不管在任何情况下，Taro 都推荐你使用函数的方式创建 ref。
class MyComponent extends Component {
  roar () {
    // 会打印 `miao, miao, miao~`
    this.cat.miao()
  }
  refCat = (node) => this.cat = node // `this.cat` 会变成 `Cat` 组件实例的引用

  render () {
    return <Cat ref={this.refCat} />
  }
}
class Cat extends Component {
  miao () {
    console.log('miao, miao, miao~')
  }
  render () {
    return <View />
  }
}
(3) 通过 createRef 创建 ref:
Refs 还是使用 Taro.createRef() 创建的，并通过 ref 属性附加到 Taro 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。
当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问。
class MyComponent extends Component {
  this.cat = Taro.createRef()
  roar () {
    // 会打印 `miao, miao, miao~`
    this.cat.current.miao()
  }
  render () {
    return <Cat ref={this.cat} />
  }
}
class Cat extends Component {
  miao () {
    console.log('miao, miao, miao~')
  }
  render () {
    return <View />
  }
}
```
### 18. 跨平台开发：
```python
(1) 内置环境变量
process.env.TARO_ENV: 用于判断当前编译类型，目前有 weapp / swan / alipay / h5 / rn / tt 六个取值，可以通过这个变量来书写对应一些不同环境下的代码，在编译时会将不属于当前编译类型的代码去掉，只保留当前编译类型下的代码，例如想在微信小程序和 H5 端分别引用不同资源：
if (process.env.TARO_ENV === 'weapp') {
  require('path/to/weapp/name')
} else if (process.env.TARO_ENV === 'h5') {
  require('path/to/h5/name')
}

同时也可以在 JSX 中使用，决定不同端要加载的组件：
render () {
  return (
    <View>
      {process.env.TARO_ENV === 'weapp' && <ScrollViewWeapp />}
      {process.env.TARO_ENV === 'h5' && <ScrollViewH5 />}
    </View>
  )
}
(2) 统一接口的多端文件：
 1) 多端组件：
 假如有一个 Test 组件存在微信小程序、百度小程序和 H5 三个不同版本，那么就可以像如下组织代码
test.js 文件，这是 Test 组件默认的形式，编译到微信小程序、百度小程序和 H5 三端之外的端使用的版本
test.h5.js 文件，这是 Test 组件的 H5 版本
test.weapp.js 文件，这是 Test 组件的 微信小程序 版本
test.swan.js 文件，这是 Test 组件的 百度小程序 版本
四个文件，对外暴露的是统一的接口，它们接受一致的参数，只是内部有针对各自平台的代码实现
而我们使用 Test 组件的时候，引用的方式依然和之前保持一致，import 的是不带端类型的文件名，在编译的时候会自动识别并添加端类型后缀

import Test from '../../components/test'
<Test argA={1} argA={2} />

(3) 多端脚本逻辑：
与多端组件类似，假如有需要针对不同的端写不同的脚本逻辑代码，我们也可以类似的进行处理，遵守的唯一原则就是多端文件对外的接口保持一致。
例如微信小程序上使用 Taro.setNavigationBarTitle 来设置页面标题，H5 使用 document.title，那么可以封装一个 setTitle 方法来抹平两个平台的差异。
增加 set_title.h5.js，代码如下:
export default function setTitle (title) {
  document.title = title
}
增加 set_title.weapp.js，代码如下：
import Taro from '@tarojs/taro'
export default function setTitle (title) {
  Taro.setNavigationBarTitle({
    title
  })
}
调用的时候，如下使用:
import setTitle from '../utils/set_title'

setTitle('页面标题')

(4) 使用要点
统一接口的多端文件这一跨平台兼容写法有如下三个使用要点：
    1) 不同端的对应文件一定要统一接口，统一调用方式
    2) 最好有一个平台无关的默认文件，这样在使用 ts 的时候也不会出现报错
    3) 引用文件的时候，只需要写默认文件名，不用带文件后缀
```
### 19. 小程序原生作用域获取：
```python
(1) 在 Taro 的页面和组件类中，this 指向的是 Taro 页面或组件的实例，例如
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
export default class Menu extends Component {
  static defaultProps = {
    data: []
  }
  constructor(props) {
    super(props)
    this.state = {
      checked: props.checked
    }
  }
  componentWillMount () {
    console.log(this) // this -> 组件 Menu 的实例
  }
  render () {
    return <View />
  }
}
(2) 但是一般我们需要获取 Taro 的页面和组件所对应的小程序原生页面和组件的实例，这个时候我们可以通过 this.$scope 就能访问到它们。
所以当调用一些 API 需要传入小程序的页面或者组件实例时，可以直接传入 this.$scope，例如 Taro.createCanvasContext(canvasId, this) 这个 API，第二个参数就是自定义组件实例 this，在 Taro 中就可以如下使用：
Taro.createCanvasContext(canvasId, this.$scope)
```
### 20. 基于 Taro 开发第三方多端 UI 库：
```python
(1) 通过 Taro 提供的多端 UI 库打包能力，可以打包出一个多端运行的 UI 库，目前已经支持 微信/支付宝/百度小程序以及 H5，RN 端的支持还在调研中，示例项目 taro-ui-sample
(2) 多端 UI 库项目结构：
多端 UI 库的项目目录结构与普通 Taro 项目基本一致，不同点如下：
    1) 增加一个 UI 库入口文件：
    需要在 src 目录下添加 index.js 或者 index.ts 来作为 UI 库的入口文件，用于输出 UI 组件，如果有多个 UI 组件，可以如下书写：
    export { default as A } from './components/A/A'
export { default as B } from './components/B/B'
这样的话，这个组件库使用起来，会是如下的方式：
import { A } from 'taro-ui-sample'
<A />
如果只有 UI 组件，也可以如下书写：
import A from './components/A/A'
export default A
这样的话，这个组件库使用起来，会是如下的方式
import A from 'taro-ui-sample'
<A />
(2) 配置文件改造：
为了打包出可以在 H5 端使用的组件库，需要在 config/index.js 文件中增加一些配置：
if (process.env.TARO_BUILD_TYPE === 'ui') {
  Object.assign(config.h5, {
    enableSourceMap: false,
    enableExtract: false,
    enableDll: false
  })
  config.h5.webpackChain = chain => {
    chain.plugins.delete('htmlWebpackPlugin')
    chain.plugins.delete('addAssetHtmlWebpackPlugin')
    chain.merge({
      output: {
        path: path.join(process.cwd(), 'dist', 'h5'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'taro-ui-sample'
      },
      externals: {
        nervjs: 'commonjs2 nervjs',
        classnames: 'commonjs2 classnames',
        '@tarojs/components': 'commonjs2 @tarojs/components',
        '@tarojs/taro-h5': 'commonjs2 @tarojs/taro-h5',
        'weui': 'commonjs2 weui'
      }
    })
  }
}
(3) 打包命令：
在完成以上项目结构改造后，你就可以获得一个 Taro 的多端 UI 库的项目了

这时候你可以通过如下命令来进行打包

$ TARO_BUILD_TYPE=ui taro build --ui
打包之后的文件在 dist 目录下

里面会包含一个 index.js 的入口文件，内容如下，需要注意的是，这个内容是 Taro 自动生成的，不可修改

if (process.env.TARO_ENV === 'h5') {
  module.exports = require('./h5/index')
  module.exports.default = module.exports
} else {
  module.exports = require('./weapp/index')
  module.exports.default = module.exports
}
H5 端以及小程序类（微信/支付宝/百度）的文件分别在 h5 和 weapp 目录下，通过入口文件就能在不同的端内进行引用。
```
### 20. 微信小程序转 Taro：
```python
(1) Taro 可以将你的原生微信小程序应用转换为 Taro 代码，进而你可以通过 taro build 的命令将 Taro 代码转换为对应平台的代码，或者对转换后的 Taro 代码进行用 React 的方式进行二次开发。

微信原生小程序转 Taro 的操作非常简单，首先必须安装使用 npm i -g @tarojs/cli 安装 Taro 命令行工具，其次在命令行中定位到小程序项目的根目录，根目录中运行：

$ taro convert
即可完成转换。转换后的代码保存在根目录下的 taroConvert 文件夹下。你需要定位到 taroConvert 目录执行 npm install 命令之后就可以使用 taro build 命令编译到对应平台的代码。
(2) 二次开发：
假设已有一个转换后文件如下：

import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {}

  componentWillMount(e) {
    var orderId = e.id
    this.data.orderId = orderId
  }

  componentDidShow() {
    var that = this
    Taro.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/detail',
      data: {
        token: Taro.getStorageSync('token'),
        id: that.data.orderId
      },
      success: res => {
        Taro.hideLoading()
        if (res.data.code != 0) {
          Taro.showModal({
            title: '错误',
            content: res.data.msg,
            showCancel: false
          })
          return
        }
        that.setData({
          orderDetail: res.data.data,
          logisticsTraces: res.data.data.logisticsTraces.reverse()
        })
      }
    })
  }

  config = {
    navigationBarTitleText: '物流详情'
  }

  render() {
    const {
      orderDetail: orderDetail,
      logisticsTraces: logisticsTraces
    } = this.state
    return (
      <View className="container">
        <View className="top-sec">
          <View className="a-row">
            <View className="label">物流单号</View>
            <View className="text">{orderDetail.logistics.trackingNumber}</View>
          </View>
          <View className="a-row">
            <View className="label">物流公司</View>
            <View className="text">{orderDetail.logistics.shipperName}</View>
          </View>
        </View>
        <View className="sec-wrap">
          <View className="details-info">
            <View className="line-box" />
            {logisticsTraces.map((item, index) => {
              return (
                <View className="a-row" key={index}>
                  <View className="dot">
                    <View
                      className="active-dot"
                      hidden={index == 0 ? false : true}
                    >
                      <View className="yuan-red" />
                    </View>
                    <View
                      className="default-dot"
                      hidden={index == 0 ? true : false}
                    />
                  </View>
                  <View className="info">
                    <View className="date-box">{item.AcceptTime}</View>
                    <View className="text">{item.AcceptStation}</View>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}

export default _C
它看起来就像普通的 Taro 组件，最重要的区别就在于 @withWeapp() 这个装饰器，你可以将它理解为转换代码的运行时，@withWeapp() 会增加一些原来 Taro 没有方法和属性，例如：
this.setData
转换后的 this.setData 的 API 相当于小程序的 this.setData 的 polyfill，他和 this.setState 最大的区别就在于，this.setData 之后 data 的数据是同步更新，而渲染是异步更新，而 setState 两者都是异步的。

this.data 和 this.properties
this.data 和 this.properties 相当于 Taro 的 this.state 和 this.props 的 alias，当它们的数据更新时，对应的 state 和 props 也会同步更新。

生命周期
Taro 会将原始文件的生命周期钩子函数转换为 Taro 的生命周期，完整对应关系如下：
    Page.onLoad	componentWillMount
    onShow	componentDidShow
    onHide	componentDidHide
    onReady	componentDidMount
    onUnload	componentWillUnmount
    onError	componentDidCatchError
    App.onLaunch	componentWillMount
    Component.created	componentWillMount
    attached	componentDidMount
    ready	componentDidMount
    detached	componentWillUnmount
    moved	保留
    
(2) 常见问题
在小程序 IDE 显示 _createData 错误
这个错误通常是由于原始代码的初始 data 中没有对应的数据，后来通过 this.setData 补充数据造成的。在 Taro 中推荐不管是 state(data) 还是 properties(props) 都要设置一个默认值。你可以在类构造器或修改原始代码提供一个默认值解决这个问题，这也应该是编写代码的最佳实践。

转换 wxParse 报错不存在文件
这是由于 wxParse 的源码使用了一个不存在的 template 声明造成的。你可以修改 wxParse 的源码文件 wxParse.wxml 134 行到 207 行：

<!--循环模版-->
<template name="wxParse1">
  <!--<template is="wxParse1" data="{{item}}" />-->
  <!--判断是否是标签节点-->
  <block wx:if="{{item.node == 'element'}}">
    <block wx:if="{{item.tag == 'button'}}">
      <button type="default" size="mini">
        <block wx:for="{{item.nodes}}" wx:for-item="item" wx:key="">
          <template is="wxParse0" data="{{item}}" />
        </block>
      </button>
    </block>
    <!--li类型-->
    <block wx:elif="{{item.tag == 'li'}}">
      <view class="{{item.classStr}} wxParse-li" style="{{item.styleStr}}">
        <view class="{{item.classStr}} wxParse-li-inner">
          <view class="{{item.classStr}} wxParse-li-text">
            <view class="{{item.classStr}} wxParse-li-circle"></view>
          </view>
          <view class="{{item.classStr}} wxParse-li-text">
            <block wx:for="{{item.nodes}}" wx:for-item="item" wx:key="">
              <template is="wxParse0" data="{{item}}" />
            </block>
          </view>
        </view>
      </view>
    </block>

    <!--video类型-->
    <block wx:elif="{{item.tag == 'video'}}">
      <template is="wxParseVideo" data="{{item}}" />
    </block>

    <!--img类型-->
    <block wx:elif="{{item.tag == 'img'}}">
      <template is="wxParseImg" data="{{item}}" />
    </block>

    <!--a类型-->
    <block wx:elif="{{item.tag == 'a'}}">
      <view bindtap="wxParseTagATap" class="wxParse-inline {{item.classStr}} wxParse-{{item.tag}}" data-src="{{item.attr.href}}" style="{{item.styleStr}}">
        <block wx:for="{{item.nodes}}" wx:for-item="item" wx:key="">
          <template is="wxParse0" data="{{item}}" />
        </block>
      </view>
    </block>
    <block wx:elif="{{item.tag == 'table'}}">
      <view class="{{item.classStr}} wxParse-{{item.tag}}" style="{{item.styleStr}}">
        <block wx:for="{{item.nodes}}" wx:for-item="item" wx:key="">
          <template is="wxParse0" data="{{item}}" />
        </block>
      </view>
    </block>

    <block wx:elif="{{item.tag == 'br'}}">
      <template is="WxParseBr"></template>
    </block>
    <!--其他块级标签-->
    <block wx:elif="{{item.tagType == 'block'}}">
      <view class="{{item.classStr}} wxParse-{{item.tag}}" style="{{item.styleStr}}">
        <block wx:for="{{item.nodes}}" wx:for-item="item" wx:key="">
          <template is="wxParse0" data="{{item}}" />
        </block>
      </view>
    </block>

    <!--内联标签-->
    <view wx:else class="{{item.classStr}} wxParse-{{item.tag}} wxParse-{{item.tagType}}" style="{{item.styleStr}}">
      <block wx:for="{{item.nodes}}" wx:for-item="item" wx:key="">
        <template is="wxParse0" data="{{item}}" />
      </block>
    </view>

  </block>

  <!--判断是否是文本节点-->
  <block wx:elif="{{item.node == 'text'}}">
    <!--如果是，直接进行-->
    <template is="WxEmojiView" data="{{item}}" />
  </block>

</template>
把 <template name="wxParse1"> 的模板内所有 <template is="wxParse2" data="{{item}}" /> 修改为 <template is="wxParse0" data="{{item}}" /> 再运行 taro convert 即可。这样修改之后还会取消原来 wxParse 只能处理 11 级 HTML 嵌套的问题，理论上内存不爆栈可以处理无限级 HTML 嵌套。

不支持 relations 和 Behavior
目前转换暂只支持转换 Page、Component 、App 三种构造器创造的小程序组件实例。 relations 和 Behavior 在其他许多小程序端中还没有对应的实现，我们认为实现这两个功能意义不大。

转换 wepy 文件不成功
目前只能支持转换使用原生微信小程序开发的应用。
```
### 20. 最佳实践：
```python
(1) 关于 JSX 支持程度补充说明：
由于 JSX 中的写法千变万化，我们不能支持到所有的 JSX 写法，同时由于微信小程序端的限制，也有部分 JSX 的优秀用法暂时不能得到很好地支持，特在此补充说明一下对于 JSX 的支持程度:
    不能使用 Array#map 之外的方法操作 JSX 数组
    暂不支持在 render() 之外的方法定义 JSX (自 v1.3.0-beta.0 起支持)
    不能在 JSX 参数中使用对象展开符 (自 v1.3.0-beta.0 起，自定义组件可以使用对象展开符，内置组件仍然需要分别单独传入参数)
    不支持无状态组件 (自 v1.3.0-beta.0 起支持)

以上的规则在 Taro 默认生成的模板都有 ESLint 检测，无需做任何配置。
(2) 组件传递函数属性名以 on 开头：
在 Taro 中，父组件要往子组件传递函数，属性名必须以 on 开头

// 调用 Custom 组件，传入 handleEvent 函数，属性名为 onTrigger
class Parent extends Component {
  handleEvent () {
  }
  render () {
    return (
      <Custom onTrigger={this.handleEvent}></Custom>
    )
  }
}
这是因为，微信小程序端组件化是不能直接传递函数类型给子组件的，在 Taro 中是借助组件的事件机制来实现这一特性，而小程序中传入事件的时候属性名写法为 bindmyevent 或者 bind:myevent

<!-- 当自定义组件触发 myevent 事件时，调用 onMyEvent 方法 -->
<component-tag-name bindmyevent="onMyEvent" />
<!-- 或者可以写成 -->
<component-tag-name bind:myevent="onMyEvent" />
所以 Taro 中约定组件传递函数属性名以 on 开头，同时这也和内置组件的事件绑定写法保持一致了。
(3) 小程序端不要在组件中打印传入的函数:
前面已经提到小程序端的组件传入函数的原理，所以在小程序端不要在组件中打印传入的函数，因为拿不到结果，但是 this.props.onXxx && this.props.onXxx() 这种判断函数是否传入来进行调用的写法是完全支持的。

(4) 小程序端不要将在模板中用到的数据设置为 undefined：
由于小程序不支持将 data 中任何一项的 value 设为 undefined ，在 setState 的时候也请避免这么用。你可以使用 null 来替代。

(5) 小程序端不要在组件中打印 this.props.children：
在微信小程序端是通过 <slot /> 来实现往自定义组件中传入元素的，而 Taro 利用 this.props.children 在编译时实现了这一功能， this.props.children 会直接被编译成 <slot /> 标签，所以它在小程序端属于语法糖的存在，请不要在组件中打印它。

(6) 支持 props 传入 JSX：
支持 props 传入 JSX，但是元素传入 JSX 的属性名必须以 render 开头

例如，子组件写法

class Dialog extends Component {
  render () {
    return (
      <View className='dialog'>
        <View className='header'>
          {this.props.renderHeader}
        </View>
        <View className='body'>
          {this.props.children}
        </View>
        <View className='footer'>
          {this.props.renderFooter}
        </View>
      </View>
    )
  }
}
父组件调用子组件是传入 JSX

class App extends Component {
  render () {
    return (
      <View className='container'>
        <Dialog
          renderHeader={
            <View className='welcome-message'>Welcome!</View>
          }
          renderFooter={
            <Button className='close'>Close</Button>
          }
        >
          <View className="dialog-message">
            Thank you for using Taro.
          </View>
        </Dialog>
      </View>
    )
  }
}

(7) 组件属性传递注意：
不要以 id、class、style 作为自定义组件的属性与内部 state 的名称，因为这些属性名在微信小程序小程序中会丢失。

(8) 组件 state 与 props 里字段重名的问题
不要在 state 与 props 上用同名的字段，因为这些被字段在微信小程序中都会挂在 data 上。

(9) 小程序中页面生命周期 componentWillMount 不一致问题：
// 错误写法
render () {
  // 在 willMount 之前无法拿到路由参数
  const abc = this.$router.params.abc
  return <Custom adc={abc} />
}

// 正确写法
componentWillMount () {
  const abc = this.$router.params.abc
  this.setState({
    abc
  })
}
render () {
  // 增加一个兼容判断
  return this.state.abc && <Custom adc={abc} />
}
对于不需要等到页面 willMount 之后取路由参数的页面则没有任何影响。
很多细心的开发者应该已经注意到了，在 Taro 编译到小程序端后，组件的 constructor 与 render 默认会多调用一次，表现得与 React 不太一致。

这是因为，Taro 的组件编译后就是小程序的自定义组件，而小程序的自定义组件的初始化时是可以指定 data 来让组件拥有初始化数据的。开发者一般会在组件的 constructor 中设置一些初始化的 state，同时也可能会在 render 中处理 state 与 props 产生新的数据，在 Taro 中多出的这一次提前调用，就是为了收集组件的初始化数据，给自定义组件提前生成 data ，以保证组件初始化时能带有数据，让组件初次渲染正常。

所以，在编码时，需要在处理数据的时候做一些容错处理，这样可以避免在 constructor 与 render 提前调用时出现由于没有数据导致出错的情况。

(10) JS 编码必须用单引号
在 Taro 中，JS 代码里必须书写单引号，特别是 JSX 中，如果出现双引号，可能会导致编译错误。

(11) 环境变量 process.env 的使用
不要以解构的方式来获取通过 env 配置的 process.env 环境变量，请直接以完整书写的方式 process.env.NODE_ENV 来进行使用

// 错误写法，不支持
const { NODE_ENV = 'development' } = process.env
if (NODE_ENV === 'development') {
  ...
}
// 正确写法
if (process.env.NODE_ENV === 'development') {
}
使用 this.$componentType 来判断当前 Taro.Component 是页面还是组件
this.$componentType 可能取值分别为 PAGE 和 COMPONENT，开发者可以根据此变量的取值分别采取不同逻辑。

(12) 全局变量：
在 Taro 中推荐使用 Redux 来进行全局变量的管理，但是对于一些小型的应用， Redux 就可能显得比较重了，这时候如果想使用全局变量，推荐如下使用。

新增一个自行命名的 JS 文件，例如 global_data.js，示例代码如下

const globalData = {}

export function set (key, val) {
  globalData[key] = val
}

export function get (key) {
  return globalData[key]
}
随后就可以在任意位置进行使用啦

import { set as setGlobalData, get as getGlobalData } from './path/name/global_data'
setGlobalData('test', 1)
getGlobalData('test')
```
### 13. 性能优化实践：
```python
(1) 开发者手动优化
1) 预加载：
  在微信小程序、支付宝小程序、字节跳动小程序和QQ轻应用中，从调用 Taro.navigateTo、Taro.redirectTo 或 Taro.switchTab 后，到页面触发 componentWillMount 会有一定延时。因此一些网络请求可以提前到发起跳转前一刻去请求。

Taro 提供了 componentWillPreload 钩子，它接收页面跳转的参数作为参数。可以把需要预加载的内容通过 return 返回，然后在页面触发 componentWillMount 后即可通过 this.$preloadData 获取到预加载的内容。

注意：调用跳转方法时需要使用绝对路径，相对路径不会触发此钩子。

class Index extends Component {
  componentWillMount () {
    console.log('isFetching: ', this.isFetching)
    this.$preloadData
      .then(res => {
        console.log('res: ', res)
        this.isFetching = false
      })
  }

  componentWillPreload (params) {
    return this.fetchData(params.url)
  }

  fetchData () {
    this.isFetching = true
    ...
  }
}

2) 在小程序中，可以使用 this.$preload 函数进行页面跳转传参：
用法：this.$preload(key: String | Object, [ value: Any ])

之所以命名为 $preload，因为它也有一点预加载数据的意味。

如果觉得每次页面跳转传参时，需要先把参数 stringify 后加到 url 的查询字符串中很繁琐，可以利用 this.$preload 进行传参。

另外如果传入的是下一个页面的数据请求 promise，也有上一点提到的“预加载”功能，也能够绕过 componentWillMount 延时。不同点主要在于代码管理，开发者可酌情使用。

例子:

// 传入单个参数

// A 页面
// 调用跳转方法前使用 this.$preload
this.$preload('key', 'val')
Taro.navigateTo({ url: '/pages/B/B' })

// B 页面
// 可以于 this.$router.preload 中访问到 this.$preload 传入的参数
componentWillMount () {
  console.log('preload: ', this.$router.preload.key)
}
// 传入多个参数

// A 页面
this.$preload({
  x: 1,
  y: 2
})
Taro.navigateTo({ url: '/pages/B/B' })

// B 页面
componentWillMount () {
  console.log('preload: ', this.$router.preload)
  
 3) shouldComponentUpdate
当你清楚在某些情况下组件不需要被重新渲染时，可以通过在 shouldComponentUpdate 钩子里返回 false 来跳过本次渲染流程。

shouldComponentUpdate (nextProps, nextState) {
  if (this.props.color !== nextProps.color) {
    return true
  }
  if (this.state.count !== nextState.count) {
    return true
  }
  return false
}
4) Taro.PureComponent
在大多数情况下，开发者可以让组件继承于 Taro.PureComponent 类，而无需手动实现 shouldComponentUpdate。Taro.PureComponent 里实现了 shouldComponentUpdate，它会把新旧 props 和新旧 state 分别做一次浅对比，以避免不必要的渲染。

(2) Taro 框架层面优化:
1) 小程序数据 diff：
2) diff 逻辑：
全等 => 跳过
新增字段 => 使用新值
类型不同 => 使用新值
类型相同、基础数据类型 => 使用新值
其中一方为数组，另一方不是 => 使用新值
都为数组、新数组比旧数组短 => 使用新值
都为数组、新数组长度大于等于旧数组的长度 => 逐项 diff、按路径更新
其中一方为 null，另一方不是 => 使用新值
都为对象，新对象缺少旧对象某些属性 => 使用新值
都为对象，新对象拥有旧对象所有的属性 => 逐项 diff、按路径更新
例子：

// 新值
const state = {
  a: 1,
  b: 22,
  d: 4,
  list: [1],
  arr: [1, 'a', true, null, 66],
  obj: {
    x: 5
  },
  foo: {
    x: 8,
    y: 10,
    z: 0
  }
}

// 旧值
const data = {
  a: 1,
  b: 2,
  c: 3,
  list: [1, 2, 3],
  arr: [1, 2, 3],
  obj: {
    x: 10,
    y: 8
  },
  foo: {
    x: 'xxx',
    y: 10
  }
}

diff(data, state)
/**
 * diff 结果
{
  b: 22,
  d: 4,
  list: [ 1 ],
  'arr[1]': 'a',
  'arr[2]': true,
  'arr[3]': null,
  'arr[4]': 66,
  obj: { x: 5 },
  'foo.x': 8,
  'foo.z': 0
}
*/

```
### 14. 异步编程：
```python
Taro 支持使用 async functions 来让开发者获得不错的异步编程体验，开启 async functions 支持需要安装包 @tarojs/async-await

$ yarn add @tarojs/async-await
# 或者使用 npm
$ npm install --save @tarojs/async-await
随后在项目入口文件 app.js 中直接 import ，就可以开始使用 async functions 功能了

// src/app.js
import '@tarojs/async-await'
值得注意的事，使用 @tarojs/async-await 一定要记得按照开发前注意中提示的内容进行操作，否则会出现报错

```
### 15. 使用Redux：
```python
(1) 在 Taro 中可以自由地使用 React 生态中非常流行的数据流管理工具 Redux 来解决复杂项目的数据管理问题。而为了更方便地使用 Redux ，Taro 提供了与 react-redux API 几乎一致的包 @tarojs/redux 来让开发人员获得更加良好的开发体验。

首先请安装 redux 、 @tarojs/redux 和 @tarojs/redux-h5，以及一些需要用到的 redux 中间件

$ yarn add redux @tarojs/redux @tarojs/redux-h5 redux-thunk redux-logger
# 或者使用 npm
$ npm install --save redux @tarojs/redux @tarojs/redux-h5 redux-thunk redux-logger
随后可以在项目 src 目录下新增一个 store 目录，在目录下增加 index.js 文件用来配置 store，按自己喜好设置 redux 的中间件，例如下面例子中使用 redux-thunk 和 redux-logger 这两个中间件

// src/store/index.js
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

const middlewares = [
  thunkMiddleware,
  createLogger()
]

export default function configStore () {
  const store = createStore(rootReducer, applyMiddleware(...middlewares))
  return store
}

接下来在项目入口文件 app.js 中使用 @tarojs/redux 中提供的 Provider 组件将前面写好的 store 接入应用中

// src/app.js
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import configStore from './store'
import Index from './pages/index'

import './app.scss'

const store = configStore()

class App extends Component {
  config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      navigationBarTitleText: 'Test'
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

然后就可以开始使用了。如 redux 推荐的那样，可以增加

constants 目录，用来放置所有的 action type 常量
actions 目录，用来放置所有的 actions
reducers 目录，用来放置所有的 reducers
例如我们要开发一个简单的加、减计数器功能

新增 action type

// src/constants/counter.js
export const ADD = 'ADD'
export const MINUS = 'MINUS'

新增 reducer 处理

// src/reducers/counter.js
import { ADD, MINUS } from '../constants/counter'

const INITIAL_STATE = {
  num: 0
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
    case MINUS:
      return {
        ...state,
        num: state.num - 1
      }
    default:
      return state
  }
}
// src/reducers/index.js
import { combineReducers } from 'redux'
import counter from './counter'

export default combineReducers({
  counter
})

新增 action 处理

// src/actions/counter.js
import {
  ADD,
  MINUS
} from '../constants/counter'

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

// 异步的 action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}

最后，我们可以在页面（或者组件）中进行使用，我们将通过 tarojs/redux 提供的 connect 方法将 redux 与我们的页面进行连接

// src/pages/index/index.js
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'

import { add, minus, asyncAdd } from '../../actions/counter'

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  render () {
    return (
      <View className='todo'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View>{this.props.counter.num}</View>
      </View>
    )
  }
}

export default Index
connect 方法接受两个参数 mapStateToProps 与 mapDispatchToProps

mapStateToProps，函数类型，接受最新的 state 作为参数，用于将 state 映射到组件的 props
mapDispatchToProps，函数类型，接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法

(2) Hooks：
在 Redux 中使用 Hooks
使用 hooks 的基本设置和使用 connect 的设置是一样的，你需要设置你的 store，并把你的应用放在 Provider 组件中。

const store = configreStore(rootReducer)

class App extends Components {
    render () {
        return (
            <Provider store={store}>
                <Index />
            </Provider>
        )
    }
}
在这样的情况下，你就可以使用 taro-redux 提供的 Hooks API 在函数式组件中使用。

useSelector
const result : any = useSelector(selector : Function, equalityFn? : Function)
useSelector 允许你使用 selector 函数从一个 Redux Store 中获取数据。

Selector 函数大致相当于 connect 函数的 mapStateToProps 参数。Selector 会在组件每次渲染时调用。useSelector 同样会订阅 Redux store，在 Redux action 被 dispatch 时调用。

但 useSelector 还是和 mapStateToProps 有一些不同：

不像 mapStateToProps 只返回对象一样，Selector 可能会返回任何值。
当一个 action dispatch 时，useSelector 会把 selector 的前后返回值做一次浅对比，如果不同，组件会强制更新。
Selector 函数不接受 ownProps 参数。但 selector 可以通过闭包访问函数式组件传递下来的 props。
使用案例
基本使用：

import Taro, { Components } from '@tarojs/taro'
import { useSelector } from 'taro-redux'

export const CounterComponent = () => {
  const counter = useSelector(state => state.counter)
  return <View>{counter}</View>
}
使用闭包决定如何 select 数据：

export const TodoListItem = props => {
  const todo = useSelector(state => state.todos[props.id])
  return <View>{todo.text}</View>
}

进阶使用
你还可以访问 react-redux 文档 了解如何使用 reselect 缓存 selector。

useDispatch
const dispatch = useDispatch()
这个 Hook 返回 Redux store 的 dispatch 引用。你可以使用它来 dispatch actions。

使用案例
import Taro, { Components } from '@tarojs/taro'
import { useDispatch } from 'taro-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()

  return (
    <View>
      <Text>{value}</Text>
      <Button onClick={() => dispatch({ type: 'increment-counter' })}>
        Increment counter
      </Button>
    </View>
  )
}
当我们使用 dispatch 传递回调到一个子组件时，推荐使用 useCallback 把回调缓存起来，因为组件可能因为引用改变而重新渲染。

// CounterComponent.js
export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()
  const incrementCounter = useCallback(
    () => dispatch({ type: 'increment-counter' }),
    [dispatch]
  )

  return (
    <View>
      <Text>{value}</Text>
      <MyIncrementButton onIncrement={incrementCounter} />
    </View>
  )
}

// IncrementButton.js
const MyIncrementButton = ({ onIncrement }) => (
  <Button onClick={onIncrement}>Increment counter</Button>
)

export default Taro.memo(MyIncrementButton)
useStore
const store = useStore()
useStore 返回一个 store 引用和 Provider 组件引用完全一致。

这个 hook 可能并不经常使用。useSelector 大部分情况是你的第一选择，如果需要替换 reducers 的情况下可能会使用到这个 API。

使用案例
import Taro, { Components } from '@tarojs/taro'
import { useStore } from 'taro-redux'

export const CounterComponent = ({ value }) => {
  const store = useStore()

  // EXAMPLE ONLY! Do not do this in a real app.
  // The component will not automatically update if the store state changes
  return <div>{store.getState()}</div>
}
```
### 15. 使用key, keys, taroKey：
```python
    偏向于使用key.
    (1) Keys 可以在 DOM 中的某些元素被增加或删除的时候帮助 Nerv/小程序 识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。
    (2) taroKey 适用于循环渲染原生小程序组件，赋予每个元素唯一确定标识，转换为小程序的 wx:key。
    (3) key: 数组元素中使用的 key 在其兄弟之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key：
```
