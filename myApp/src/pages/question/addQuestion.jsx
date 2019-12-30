import Taro, { Component } from '@tarojs/taro';
import { View, Input, Textarea, Button } from '@tarojs/components';
import Dialog from './dialog';

import './addQuestion.scss';

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: ''
    };
  }
  componentDidMount() {}
  componentWillReceiveProps() {}
  componentDidShow() {}
  componentDidHide() {}
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
    if (!(title && desc)) {
      Taro.showToast({ title: '请输入标题或描述', icon: 'none' });
      return false;
    }
    this.props.onSubmitQuestion({ title, desc });
  }
  render() {
    return (
      <Dialog>
        <View className='add-question'>
          <View className='question-body'>
            <Input
              onInput={e => this.changeTitle(e)}
              className='question-title'
              placeholder='请输入您的问题标题'
            />
            <Textarea
              onInput={e => this.changeDesc(e)}
              className='question-desc'
              placeholder='请输入您的问题描述'
            ></Textarea>
            <View className='btn-group'>
              <Button
                className='btn-questions ok'
                onClick={() => this.subHandle()}
              >
                确定
              </Button>
              <Button
                className='btn-questions cancel'
                onClick={() => this.props.onCancelQuestion()}
              >
                取消
              </Button>
            </View>
          </View>
        </View>
      </Dialog>
    );
  }
}

export default AddQuestion;
