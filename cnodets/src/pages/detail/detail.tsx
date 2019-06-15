import Taro,{ Component } from '@tarojs/taro';
import { View, Button } from  '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getTopicInfo, admireTopic, replyContent } from '../../actions/topicList';
import {validateUser}  from '../../actions/user';

import TopicInfo from '../../components/topicInfo/topicInfo';
import Replies from  '../../components/topicInfo/replies';
import ReplyContent from '../../components/topicInfo/replycontent';

import { IDetailProps, IDetailState } from '../../interfaces/IDetail';

import  './detail.less';

@connect(
    function(store) {
        return { user: store.user, topicInfo: store.topicList.topicInfo, replies: store.topicList.replies }
    }, 
    function(dispatch){
        return { 
            getTopicInfo(params){
                dispatch(getTopicInfo(params));
            },
            // admireTopic(params) {
            //     dispatch(admireTopic(params));
            // }
        }
    }
)
class Detail extends Component<IDetailProps, IDetailState> {

    config={
        navigationBarTitleText: '话题详情'
    }

    state:IDetailState = {
        showReplyContent:false //显示回复组件
    }

    componentWillMount() {
        this.getDetail();
    }
    // componentWillReceiveProps(nextState) {
    //     if(this.props.admireState !== nextState.admireState) {
    //         this.getDetail();
    //     }
    // }
    // 获取话题详情
    getDetail() {
        const { user, getTopicInfo } = this.props;
        let params = {id: this.$router.params.topicId, mdrender: true, accesstoken: user.accesstoken}
        getTopicInfo && getTopicInfo(params);
    }
    // 回复
    replyToReply(reply){
        this.setState({currentReply: reply, showReplyContent: true})
     }
    
     reply(){
        validateUser(this.props.user).then(result=>{
            if(result){
               this.setState({showReplyContent:true});
            }
        })
      }

    // 评价
    admire(reply){
        let {user} = this.props;
        let params = {replyid: reply.id, accesstoken: user.accesstoken};
        admireTopic(params).then(result=>{
            if(result.success) {
                this.getDetail();
            }
        })
    }

    // 关闭评论
    closeReplyContent(){
        this.setState({showReplyContent:false});
    }

    //评论  方法名不能跟包名重复，否则会导致参数移位
    replyContentValue(content){
        let {user}=this.props;
        let { currentReply } = this.state;
        let reply_id = currentReply ? currentReply.id : null;
        let preName = currentReply ? '@' + currentReply.author.loginname + '   ' : '';//评论人的昵称
        let params = {reply_id: reply_id, content: preName + content, accesstoken: user.accesstoken, topicId: this.$router.params.topicId}
        replyContent(params).then(result => {
            if(result.success) {
                this.getDetail();
                this.closeReplyContent();
            }
        })
    }
    render() {
        console.log(this.props);
        let { topicInfo, replies } = this.props;
        let { showReplyContent } = this.state;
        return (<View className='detail'>
            {showReplyContent?
                <ReplyContent 
                    onOKReplyContent={(content) => this.replyContentValue(content)}  
                    onCancelReplyContent={() => this.closeReplyContent()} /> 
            :null}
            <TopicInfo topicInfo={topicInfo} />
            <Replies 
                replies={replies} 
                onReplyToReply={(reply) => this.replyToReply(reply)} 
                onAdmire={(reply) => this.admire(reply)} 
            />
            <Button className='replyBtn' onClick={() => this.reply()}>回复</Button>
        </View>)
    }
}
export default Detail;