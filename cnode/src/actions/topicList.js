import {getJSON,postJSON} from '../utils/request';
import api from  '../constants/api';
import  Taro from '@tarojs/taro';

//请求首页数据
export function getTopicList(params){
    return async dispatch=>{
      let result = await getJSON(api.gettopics,params);
      if(result && result.data){
          if(result.data.success){
              dispatch({type: 'getTopicList', list: result.data.data})
          }
      }
    }
}