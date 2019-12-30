import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import {
  getTopicInfo,
  admireTopic,
  replyContent
} from '../../actions/topicList';
import { validateUser } from '../../actions/user';

import TopicInfo from '../../components/topicInfo/topicInfo';
import Replies from '../../components/topicInfo/replies';
import ReplyContent from '../../components/topicInfo/replyContent';
import './detail.scss';

@connect(
  function({ user, topicList }) {
    return {
      user: user,
      topicInfo: topicList.topicInfo,
      replies: topicList.replies
    };
  },
  function(dispatch) {
    return {
      getTopicDetail(params) {
        dispatch(getTopicInfo(params));
      },
      admireTopicDetail(params) {
        dispatch(admireTopic(params));
      }
    };
  }
)
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReplyContent: false, // 显示回复组件
      currentReply: ''
    };
  }
  componentWillMount() {
    this.getDetail();
  }
  // componentWillReceiveProps(nextState) {
  //   if (this.props.admireState !== nextState.admireState) {
  //     this.getDetail();
  //   }
  // }
  // 获取话题详情
  getDetail() {
    const { user, getTopicDetail } = this.props;
    let params = {
      id: this.$router.params.topicId,
      mdrender: true,
      accesstoken: user.accesstoken
    };
    getTopicDetail && getTopicDetail(params);
  }
  // 回复
  replyToReply(reply) {
    this.setState({ currentReply: reply, showReplyContent: true });
  }
  reply() {
    let { user } = this.props;
    validateUser(user).then(res => {
      if (res) {
        this.setState({
          showReplyContent: true
        });
      }
    });
  }
  // 评价
  admire(reply) {
    let { user, admireTopicDetail } = this.props;
    let params = { replyid: reply.id, accesstoken: user.accessUserToken };
    admireTopicDetail &&
      admireTopicDetail(params).then(res => {
        if (res.success) {
          this.getDetail();
        }
      });
  }
  // 关闭评论
  closeReplyContent() {
    this.setState({ showReplyContent: false });
  }
  // 评论 方法名不能跟包名重复，否则会导致参数移位
  replyContentValue(content) {
    let { user } = this.props;
    let { currentReply } = this.state;
    let reply_id = currentReply ? currentReply.id : null;
    let preName = currentReply ? '@' + currentReply.author.loginname + ' ' : ''; // 评论人的名称
    let params = {
      reply_id: reply_id,
      content: preName + content,
      accesstoken: user.accesstoken,
      topicId: this.$router.params.topicId
    };
    replyContent(params).then(res => {
      if (res.success) {
        this.getDetail();
        this.closeReplyContent();
      }
    });
  }
  config = {
    navigationBarTitleText: '话题详情'
  };
  render() {
    const { user, topicInfo, replies } = this.props;
    let { showReplyContent } = this.state;
    return (
      <View className='detail'>
        {showReplyContent ? (
          <ReplyContent
            onOKReplyContent={content => this.replyContentValue(content)}
            onCancelReplyContent={() => this.closeReplyContent()}
          />
        ) : null}
        <TopicInfo topicInfo={topicInfo} />
        <Replies
          user={user}
          replies={replies}
          onReplyToReply={reply => this.replyToReply(reply)}
          onAdmire={reply => this.admire(reply)}
        />
        <Button className='replyBtn' onClick={() => this.reply()}>
          回复
        </Button>
      </View>
    );
  }
}
export default Detail;
