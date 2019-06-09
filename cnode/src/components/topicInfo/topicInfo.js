import Taro,{ Component } from '@tarojs/taro';
import { View, Text, Button } from  '@tarojs/components';
import { connect } from '@tarojs/redux';

import {myTimeToLocal} from  '../../utils/date';

import './topicInfo.less';

class TopicInfo extends Component{
    
    // 删除话题
    delTopic(topicinfo) {
        const { onDelTopic } = this.props;
        onDelTopic && onDelTopic(topicinfo);
    }
    
    //编辑话题
    editTopic(topicinfo) {
        Taro.redirectTo({url: '/pages/publish/publish?edit=1'});
    }

    render() {
        let { topicInfo, selfPublish } = this.props;
        return (<View className='topic-info'>
                    <View className='topic-info-header'>
                        <View className='topic-info-header-title'>{topicInfo.top?<Text className='topic-up'>置顶</Text>:(topicInfo.tab=='share'?<Text className='topic-up blue'>分享</Text>:<Text className='topic-up blue'>问答</Text>)}
                            <Text>{topicInfo.title}</Text>
                        </View>
                        <View className='topic-info-header-pie'>
                            <Text>{myTimeToLocal(topicInfo.create_at)}</Text>
                            <Text>{topicInfo.author ? topicInfo.author.loginname : ''}</Text>
                            <Text>{topicInfo.visit_count+'次浏览'}</Text>
                        </View>
                        {
                            selfPublish ? 
                            <View className='topic-info-header-img'>
                                <Image onClick={() => this.delTopic(topicInfo)} className='img' src={require('../../assets/img/del.png')} />
                                <Image onClick={() => this.editTopic(topicInfo)} className='img' src={require('../../assets/img/edit.png')} />
                            </View>:null
                        }
                    </View>
                    <View className='topic-info-body'>
                        <RichText nodes={topicInfo.content} />
                    </View>
                </View>)
    }
}
TopicInfo.defaultProps = {
    topicInfo: {} // 为了消除myTimeToLocal(topicInfo.create_at)这种方法调用的警告
}
export default TopicInfo;