import Taro,{Component} from '@tarojs/taro';
import { View, Text, Button, Textarea } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './replycontent.less';
class ReplyContent extends Component {
    btnOK() {
        const { value } = this.state;
        const { onOKReplyContent } = this.props;
      if(value) {
          onOKReplyContent && onOKReplyContent(value)
      } else {
          Taro.showToast({title: '请输入评论内容', icon: 'none'})
      }
    }

    btnCancel(){
        const {onCancelReplyContent} = this.props;
        onCancelReplyContent && onCancelReplyContent();
    }

   changeContent(event){
      if(event && event.target){
        this.setState({value: event.target.value});
      }
   }
   render(){
      return (<View  className='replycontent'>
          <Textarea onInput={(e) => this.changeContent(e)} className='replycontent-text' placeholder='请输入回复内容'></Textarea>
          <View  className='replycontent-btngroup'>
              <Button onClick={() => this.btnOK()} className='btn'>确定</Button>
              <Button onClick={() => this.btnCancel()} className='btn'>取消</Button>
          </View>
      </View>)
   }
}
export default  ReplyContent;