import Taro, { Component } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getTopicList, getNextList } from '../../actions/topicList';

import Topic from './topic';

@connect(
  function({ topicList, menu }) {
    return { ...topicList, currentCata: menu.currentCata };
  },
  function(dispatch) {
    return {
      getTopics(params) {
        dispatch(getTopicList(params));
      },
      getNextTopics(params) {
        dispatch(getNextList(params));
      }
    };
  }
)
class TopicList extends Component {
  componentWillMount() {
    let { page, limit, currentCata, getTopics } = this.props;
    getTopics && getTopics({ page, limit, tab: currentCata.key });
  }
  // 触发分页请求 肯定是要请求下一页的 没有总页码
  onScrollToLower() {
    let { page, limit, currentCata, getNextTopics } = this.props;
    getNextTopics &&
      getNextTopics({ page: page + 1, limit, tab: currentCata.key });
  }
  render() {
    let { list } = this.props;
    return (
      <ScrollView
        style={{ height: '1300px' }}
        onScrollToLower={() => this.onScrollToLower()}
        scrollY
      >
        {list &&
          list.length > 0 &&
          list.map(item => <Topic item={item} key={item.id} />)}
      </ScrollView>
    );
  }
}
export default TopicList;
