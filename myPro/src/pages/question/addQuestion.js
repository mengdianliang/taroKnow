import Taro, { Component } from '@tarojs/taro'
import { View, Input, Textarea, Button } from '@tarojs/components'
import Dialog from './dialog'
import './addQuestion.less'

export default class AddQuestion extends Component {

  state={
    title: '',
    desc: '',
  }

  changeTitle(e) {
      this.setState({
          title: e.target.value
      });
  }

  changeDesc(e) {
    this.setState({
        desc: e.target.value
    });
  }

  subHandle() {
      const { title, desc } = this.state;
      if(!(title && desc)) {
          Taro.showToast({title: '请输入标题或描述', icon: 'none'});
          return false;
      }
      this.props.onubmitQuestion(this.state);
  }

  render () {
    
    return (
      <Dialog>
        <View className='add-question'>
            <View className='question-body'>
                <Input onInput={(e) => this.changeTitle(e)} className='question-title' placeholder='请输入您的问题标题' />
                <Textarea onInput={(e) => this.changeDesc(e)} className='question-desc' placeholder='请输入您的问题描述' />
                <View className='btn-group'>
                    <Button className='btn-questions ok' onClick={() => this.subHandle()}>确定</Button>
                    <Button className='btn-questions cancel' onClick={() => this.props.onCancelQuestion()}>取消</Button>
                </View>
            </View>
        </View>
      </Dialog>
    )
  }
}
