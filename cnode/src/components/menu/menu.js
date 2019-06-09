import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from  '@tarojs/components';
import { AtDrawer, AtProgress } from 'taro-ui';
import { connect } from '@tarojs/redux';

import  { showDrawer, changeCata, hideDrawer } from  '../../actions/menu';
import { validateUser } from '../../actions/user';

import './menu.less';

@connect(function(store){
  return  {...store.menu, user: store.user}
},function(dispatch){
  return {
  showMenu(){
      dispatch(showDrawer())
  },
  hideDrawer(){
      dispatch(hideDrawer())
  },
  changeCata(cata){
      dispatch(changeCata(cata))
  }
}
})
class Menu extends Component {

   //显示抽屉
   showDrawer(){
       const { showMenu } = this.props;
       showMenu && showMenu();
   }
   //关闭抽屉
   closeDrawer(){
       const { hideDrawer } = this.props;
       hideDrawer && hideDrawer();
  }
  // 遍历获取数据列表
  getItems(){
    const { cataData } = this.props;
    return cataData.map( item => item.value );
  }
  // 选择菜单项
  clickCata(index) {
    let { cataData, currentCata, changeCata } = this.props;
    let clickCata = cataData[index];//获取点击项的数据
    
    if(clickCata.key !== currentCata.key) {
       changeCata && changeCata(clickCata);//点击分类 触发切换分类方法
    }
  }
  // 到用户
  toUser(){
       let { user } = this.props;
       validateUser(user).then(result=>{
           if(result){
            //成功跳转到用户详情
             Taro.navigateTo({url:'/pages/user/user'});
           }
       })
   }
   render() {
    const { showDrawer, currentCata } = this.props;

      return (
      <View className='topiclist-menu'>
            <Image onClick={() => this.showDrawer()} className='image left' src={require('../../assets/img/cata.png')} />
            <Text>{currentCata ? currentCata.value : ''}</Text>
            <Image className='image right' src={require('../../assets/img/login.png')} onClick={() => this.toUser()}/>
            <AtDrawer 
                show={showDrawer}
                style='position: absolute;' 
                onItemClick={(index) => this.clickCata(index)}
                onClose={() => this.closeDrawer()} 
                items={this.getItems()}
            ></AtDrawer>
        </View>)
   }
}
export default Menu;