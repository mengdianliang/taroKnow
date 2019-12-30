import Taro, { Component } from '@tarojs/taro';
import { View, Input, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import Head from '../../components/head/head';
import { accessUserToken } from '../../actions/user';
import './login.scss';

@connect(
  function({ user }) {
    return { user: user };
  },
  function(dispatch) {
    return {
      getUserToken(params) {
        return dispatch(accessUserToken(params));
      }
    };
  }
)
class Login extends Component {
  changeToken(event) {
    if (event && event.target) {
      this.setState({
        token: event.target.value
      });
    }
  }
  // 验证token
  loginToken() {
    let { getUserToken } = this.props;
    let { token } = this.state;
    if (token) {
      getUserToken &&
        getUserToken({ accesstoken: token }).then(res => {
          Taro.redirectTo({ url: '/pages/user/user' });
        });
    } else {
      Taro.showToast({ title: '请输入密钥再进行登录验证！', icon: 'none' });
    }
  }
  config = {
    navigationBarTitleText: '登录'
  };
  render() {
    return (
      <View className='login-body'>
        <Head />
        <View className='form'>
          <Input
            type='text'
            className='access_input'
            placeholder='请输入accesstoken'
            onInput={e => this.changeToken(e)}
          />
          <Button onClick={() => this.loginToken()} className='btn_login'>
            登录
          </Button>
        </View>
      </View>
    );
  }
}
export default Login;
