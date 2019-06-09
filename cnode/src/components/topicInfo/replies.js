import  Taro,{Component} from '@tarojs/taro';
import  {View,Text,Button,Image,RichText} from  '@tarojs/components';
import {connect} from '@tarojs/redux';

import {myTimeToLocal}  from '../../utils/date';
import {validateUser}  from '../../actions/user';

import  './replies.less'

const isweapp = process.env.TARO_ENV=="weapp"  //小程序环境

class Replies extends Component{
   admire(reply){
      const { user, onAdmire } = this.props;
      validateUser(user).then(result=>{
         if(result){
            onAdmire && onAdmire(reply);
         }
      })
   }
   replyToReply(reply){
      const { user, onReplyToReply } = this.props;
      validateUser(user).then(result=>{
         if(result){
           onReplyToReply && onReplyToReply(reply)
         }
      })
   }
   render(){
      const { replies } = this.props;
      return (<View className='topicinfo-replies'>{replies && replies.length > 0 && replies.map((item,index)=>{
         return (<View key={item.id} className='topicinfo-repliy'>
                  <Image className='topicinfo-repliy-image'  src={item.author?item.author.avatar_url:''} />
                  <View className='topicinfo-repliy-right'>
                  <View  className='topicinfo-repliy-right-body'>
                   <View className='topicinfo-repliy-right-pie'>
                   <Text className='loginname'>{item.author?item.author.loginname:''}</Text>
                   <Text className='floor'>{(index+1)+'楼'}</Text>
                   <Text className='time'>{myTimeToLocal(item.create_at)}</Text>
                   </View>
                   <View className='topicinfo-repliy-right-content'>
                   {
                      isweapp ? <RichText nodes={item.content} />:<View dangerouslySetInnerHTML={{__html:item.content}} ></View>
                   }
                   </View>
                  </View>
                  <View className='topicinfo-repliy-right-zan'>
                   <Image onClick={() => this.admire(item)} className='topicinfo-repliy-image' src={item.is_uped ? require('../../assets/img/myzan.png') : require('../../assets/img/zan.png')} />
                   <Text>{item.ups.length}</Text>
                   <Image onClick={() => this.replyToReply(item)} className='topicinfo-repliy-image' src={require('../../assets/img/zhuan.png')} />
                  </View>
                  </View>
         </View>)
      })}</View>)
   }
}
export default Replies;