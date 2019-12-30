import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getUserInfo } from '../../actions/user';

import Head from '../../components/head/head';
import Panel from '../../components/user/panel';

import './user.scss';

@connect(function({ user }) {
  return { ...user };
})
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recent_topics: [],
      recent_replies: []
    };
  }
  componentWillMount() {
    let { loginname } = this.props;
    getUserInfo({ loginname: loginname }).then(res => {
      this.setState({
        recent_topics: res.data.recent_topics,
        recent_replies: res.data.recent_replies
      });
    });
  }
  config = {
    navigationBarTitleText: '用户信息'
  };
  // 发布话题 跳转到发布话题页面
  publishTopic() {
    Taro.redirectTo({ url: '/pages/publish/publish' });
  }
  render() {
    let { loginname, avatar_url } = this.props;
    let { recent_topics, recent_replies } = this.state;
    return (
      <View>
        <Head loginname={loginname} avatar_url={avatar_url} />
        <Panel listData={recent_topics} title='最近发布的话题' />
        <Panel listData={recent_replies} title='最近收到的回复' />
        <Button className='publish_btn' onClick={() => this.publishTopic()}>
          发布话题
        </Button>
      </View>
    );
  }
}
export default User;
