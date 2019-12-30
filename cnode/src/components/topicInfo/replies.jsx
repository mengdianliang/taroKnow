import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, RichText } from '@tarojs/components';

import { myTimeLocal } from '../../utils/date';
import { validateUser } from '../../actions/user';

import './replies.scss';

const isweapp = process.env.TARO_ENV === 'weapp';

class Replies extends Component {
  admire(reply) {
    const { user, onAdmire } = this.props;
    validateUser(user).then(res => {
      if (res) {
        onAdmire && onAdmire(reply);
      }
    });
  }
  replyToReply(reply) {
    const { user, onReplyToReply } = this.props;
    validateUser(user).then(res => {
      if (res) {
        onReplyToReply && onReplyToReply(reply);
      }
    });
  }
  render() {
    const { replies } = this.props;
    return (
      <View className='topicinfo-replies'>
        {replies &&
          replies.length > 0 &&
          replies.map((item, index) => {
            return (
              <View key={item.id} className='topicinfo-reply'>
                <Image
                  className='topicinfo-reply-image'
                  src={item.author ? item.author.avatar_url : ''}
                />
                <View className='topicinfo-reply-right'>
                  <View className='topicinfo-reply-right-body'>
                    <View className='topicinfo-reply-right-pie'>
                      <Text className='loginname'>
                        {item.author ? item.author.loginname : ''}
                      </Text>
                      <Text className='floor'>{`${index + 1}楼`}</Text>
                      <Text className='time'>
                        {myTimeLocal(item.create_at)}
                      </Text>
                    </View>
                    <View className='topicinfo-reply-right-content'>
                      {isweapp ? (
                        <RichText nodes={item.content} />
                      ) : (
                        <View
                          dangerouslySetInnerHTML={{ _html: item.content }}
                        ></View>
                      )}
                    </View>
                  </View>
                  <View className='topicinfo-reply-right-zan'>
                    <Image
                      className='topicinfo-reply-image'
                      src={
                        item.is_uped
                          ? require('../../assets/img/myzan.png')
                          : require('../../assets/img/zan.png')
                      }
                      onClick={() => this.admire(item)}
                    />
                    <Text>{item.ups.length}</Text>
                    <Image
                      className='topicinfo-reply-image'
                      src={require('../../assets/img/zhuan.png')}
                      onClick={() => this.replyToReply(item)}
                    />
                  </View>
                </View>
              </View>
            );
          })}
      </View>
    );
  }
}
export default Replies;
