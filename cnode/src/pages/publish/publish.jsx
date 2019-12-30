import Taro, { Component } from '@tarojs/taro';
import {
  Input,
  View,
  Text,
  Button,
  Picker,
  Textarea
} from '@tarojs/components';
import { connect } from '@tarojs/redux';

import './publish.scss';
import { submitTopic, updateTopic } from '../../actions/topicList';

@connect(function({ menu, user, topicList }) {
  return { ...menu, ...user, topicInfo: topicList.topicInfo };
})
class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectCata: null,
      title: null,
      content: null,
      isEdit: false,
      topicInfo: null
    };
  }
  componentWillMount() {
    let { edit } = this.$router.params;
    let { topicInfo } = this.props;
    this.setState({
      isEdit: edit === '1',
      topicInfo: topicInfo,
      title: topicInfo ? topicInfo.title : '',
      content: topicInfo ? topicInfo.content : ''
    });
  }
  changeCata(event) {
    let { cataData } = this.props;
    this.setState({
      selectCata: cataData[event.detail.value]
    });
  }
  // 标题改变
  titleChange(event) {
    this.setState({
      title: event.target.value
    });
  }
  // 内容改变
  contentChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  // 提交
  submitTopic() {
    let { title, content, selectCata, isEdit } = this.state;
    let { accesstoken, topicInfo } = this.props;
    if (title && content && selectCata) {
      let params = {
        tab: 'dev',
        title,
        content,
        accesstoken,
        topic_id: topicInfo.id
      };
      if (isEdit) {
        updateTopic(params).then(res => {
          if (res) {
            Taro.navigateBack();
          }
        });
      } else {
        submitTopic(params).then(res => {
          if (res) {
            Taro.redirectTo({ url: '/pages/user/user' });
          }
        });
      }
    } else {
      Taro.showToast({ title: '分类或者标题内容都不能为空！', icon: 'none' });
    }
  }

  render() {
    let { cataData } = this.props;
    let { selectCata, topicInfo, isEdit } = this.state;
    return (
      <View className='publish-topic'>
        <Input
          type='text'
          className='publish-topic-title'
          placeholder='请输入你要发布的标题'
          value={isEdit ? (topicInfo ? topicInfo.title : '') : ''}
          onInput={e => this.titleChange(e)}
        />
        <Textarea
          className='publish-topic-content'
          placeholder='请输入你要发布的内容'
          value={isEdit ? (topicInfo ? topicInfo.content : '') : ''}
          onInput={e => this.contentChange(e)}
        />
        <Picker
          mode='selector'
          range={cataData}
          rangeKey='value'
          onChange={e => this.changeCata(e)}
        >
          <View className='publish-topic-cata'>
            {selectCata ? selectCata.value : '请选择'}
          </View>
        </Picker>
        <Button
          className='publish-topic-btn'
          onClick={() => this.submitTopic()}
        >
          提交
        </Button>
      </View>
    );
  }
}
export default Publish;
