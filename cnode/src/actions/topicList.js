import Taro from '@tarojs/taro';
import api from '../constants/api';
import { getJSON, postJSON } from '../utils/request';
import { connectableObservableDescriptor } from 'C:/Users/Zailairen/AppData/Local/Microsoft/TypeScript/3.6/node_modules/rxjs/internal/observable/ConnectableObservable';

// 请求首页数据
export function getTopicList(params) {
  return async dispatch => {
    let result = await getJSON(api.getTopics, params);
    if (result && result.data && result.data.success) {
      dispatch({
        type: 'getTopicList',
        list: result.data.data
      });
    }
  };
}
// 请求下页数据
export function getNextList(params) {
  return async dispatch => {
    let result = await getJSON(api.getTopics, params);
    if (result && result.data && result.data.success) {
      if (result.data.data.length > 0) {
        dispatch({
          type: 'appendTopicList',
          list: result.data.data,
          page: params.page
        });
      }
    }
  };
}

// 请求话题详情
export function getTopicInfo(params) {
  return async dispatch => {
    let result = await getJSON(api.getTopicInfo + params.id, params);
    if (result && result.data && result.data.success) {
      dispatch({ type: 'getTopicInfo', infoData: result.data.data });
    } else {
      console.error('请求话题详情失败！');
    }
  };
}

// 点赞话题回复(不依赖dispatch触发)
export async function admireTopic(params) {
  let result = await postJSON(api.upReply + params.replyid + '/ups', params);
  if (result && result.data && result.data.success) {
    // 成功点赞
    return result.data;
  } else {
    // 点赞失败
    Taro.showToast({ title: '点赞失败', icon: 'none' });
  }
  return false;
}

// 回复
export async function replyContent(params) {
  let result = await postJSON(
    api.replyTopic + params.topicId + '/replies',
    params
  );
  if (result && result.data && result.data.success) {
    //成功评论
    return result.data;
  } else {
    //评论失败
    Taro.showToast({ title: '评论失败!', icon: 'none' });
  }
  return false;
}

// 创建话题
export async function submitTopic(params) {
  let result = await postJSON(api.createTopic, params);
  if (result && result.data && result.data.success) {
    // 成功评论
    return result.data;
  } else {
    // 评论失败
    Taro.showToast({ title: '发布话题失败', icon: 'none' });
  }
  return false;
}
// 更新话题
export async function updateTopic(params) {
  let result = await postJSON(api.updateTopic, params);
  if (result && result.data && result.data.success) {
    // 成功更新话题
    return result.data;
  } else {
    // 更新话题失败
    Taro.showToast({ title: '更新话题失败', icon: 'none' });
  }
  return false;
}
