import Taro, { Component } from '@tarojs/taro';
import { ScrollView, View, Text, Button } from  '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getTopicList, getNextList } from '../../actions/topicList';

import Topic from './topic';

@connect(function(store){
    return {...store.topicList, currentCata: store.menu.currentCata}
 },function(dispatch){
    return {getTopicList(params){
        dispatch(getTopicList(params))
    },
    getNextList(params){
     dispatch(getNextList(params))
    }
  }
 })
 class TopicList extends Component {

    componentWillMount() {
      let {page, limit, currentCata, getTopicList } = this.props;
      getTopicList && getTopicList({page, limit, tab: currentCata.key})
    }
    // 触发分页请求 肯定是要请求下一页的  没有总页码 
    onScrollToLower(){
     let {page, limit, currentCata, getNextList} = this.props;
     getNextList && getNextList({page: (page+1), limit, tab: currentCata.key})
    }
    render() {
        
        let { list } = this.props;

        return (<ScrollView style={{height:'650PX'}} onScrollToLower={() => this.onScrollToLower()} scrollY={true} >{
            list && list.length > 0 && list.map((item)=><Topic item={item} key={item.id}/>)
             }</ScrollView>)
    }
 }
 export default TopicList;