import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
class Child extends Component {
    render() {
        return (
            <View>
                <Button onClick={() => this.props.childHandle()}>调用上层事件</Button>
                <Text>{this.props.name}</Text>
            </View>
        )
    }
}

// Child.defaultProps={
//     name: '123'
// }

export default Child;