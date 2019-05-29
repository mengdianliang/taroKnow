import Taro from '@tarojs/taro';
export function getJSON(url, data) {
    Taro.showLoading();
    Taro.request({url, data, method: 'GET'}).then(result => {
        Taro.hideLoading();
        return result;
    })
}

export function postJSON(url, data) {
    Taro.showLoading();
    Taro.request({header: {'content-type': 'application/json'
      }, url, data, method: 'GET'}).then(result => {
        Taro.hideLoading();
        return result;
    })
}