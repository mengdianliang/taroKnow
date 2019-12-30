import Taro, { Component } from '@tarojs/taro';
import { View, Button, Textarea } from '@tarojs/components';
import { connect } from '@tarojs/router';

import './replyContent.scss';

class ReplyContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  btnOK() {
    const { value } = this.state;
    const { onOKReplyContent } = this.props;
    if (value) {
      onOKReplyContent && onOKReplyContent(value);
    } else {
      Taro.showToast({ title: '请输入评论内容', icon: 'none' });
    }
  }
  btnCancel() {
    const { onCancelReplyContent } = this.props;
    onCancelReplyContent && onCancelReplyContent();
  }
  changeContent(event) {
    if (event && event.target) {
      this.setState({
        value: event.target.value
      });
    }
  }
  render() {
    return (
      <View className='replycontent'>
        <Textarea
          className='replycontent-text'
          placeholder='请输入回复内容'
          onInput={e => this.changeContent(e)}
        />
        <View className='replycontent-btngroup'>
          <Button className='btn' onClick={() => this.btnOK()}>
            确定
          </Button>
          <Button className='btn' onClick={() => this.btnCancel()}>
            取消
          </Button>
        </View>
      </View>
    );
  }
}
export default ReplyContent;
