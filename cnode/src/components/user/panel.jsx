import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './panel.scss';
import { myTimeLocal } from '../../utils/date';

class Panel extends Component {
  toDetail(item) {
    Taro.navigateTo({ url: `/pages/detail/detail?topicId=${item.id}` });
  }
  render() {
    let { listData, title } = this.props;
    return (
      <View className='topic-panel'>
        <View className='topic-panel-title'>{title}</View>
        {listData &&
          listData.length > 0 &&
          listData.map(item => {
            return (
              <View
                className='topic-panel-list'
                key={item.id}
                onClick={() => this.toDetail(item)}
              >
                <Image
                  className='topic-panel-list-img'
                  src={item.author.avatar_url}
                />
                <Text className='topic-panel-list-title'>{item.title}</Text>
                <Text className='topic-panel-list-date'>
                  {myTimeLocal(item.last_reply_at)}
                </Text>
              </View>
            );
          })}
      </View>
    );
  }
}
export default Panel;
