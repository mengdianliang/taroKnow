import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtDrawer } from 'taro-ui';
import { connect } from '@tarojs/redux';

import { showDrawer, changeCata, hideDrawer } from '../../actions/menu';

import { validateUser } from '../../actions/user';
import './menu.scss';

@connect(
  function({ menu, user }) {
    return { ...menu, user: user };
  },
  function(dispatch) {
    return {
      showMenu() {
        dispatch(showDrawer());
      },
      hideMenu() {
        dispatch(hideDrawer());
      },
      changeData(cata) {
        dispatch(changeCata(cata));
      }
    };
  }
)
class Menu extends Component {
  //显示抽屉
  showDrawer() {
    const { showMenu } = this.props;
    showMenu && showMenu();
  }
  // 隐藏抽屉
  closeDrawer() {
    const { hideMenu } = this.props;
    hideMenu && hideMenu();
  }
  // 遍历获取数据列表
  getItems() {
    const { cataData } = this.props;
    return cataData.map(item => item.value);
  }
  // 选择菜单
  selectCata(index) {
    let { cataData, currentCata, changeData } = this.props;
    let clickData = cataData[index]; // 获取菜单点击项的数据
    if (clickData.key !== currentCata.key) {
      changeData && changeData(clickData); // 点击分类 触发切换分类的方法
    }
  }
  // 用户页
  toUser() {
    let { user } = this.props;
    validateUser(user).then(res => {
      if (res) {
        // 成功跳转到用户详情
        Taro.navigateTo({ url: '/pages/user/user' });
      }
    });
  }
  render() {
    let { currentCata, isShowDrawer } = this.props;
    return (
      <View className='topiclist-menu'>
        <Image
          onClick={() => this.showDrawer()}
          className='image left'
          src={require('../../assets/img/cata.png')}
        />
        <View style='position: absolute;top: 40px;left: 20px;background: #fff;z-index: 99;padding: 10px;border-radius: 4px;box-shadow: 0 0 3px #ddd;'>
          <AtDrawer
            show={isShowDrawer}
            onItemClick={index => this.selectCata(index)}
            onClose={() => this.closeDrawer()}
            items={this.getItems()}
          ></AtDrawer>
        </View>
        <Text>{currentCata ? currentCata.value : ''}</Text>
        <Image
          className='image right'
          src={require('../../assets/img/login.png')}
          onClick={() => this.toUser()}
        />
      </View>
    );
  }
}

export default Menu;
