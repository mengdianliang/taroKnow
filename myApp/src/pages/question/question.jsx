import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import './question.scss';
import AddQuestion from './addQuestion';

import Yes from '../../assets/zan.png';
import No from '../../assets/zhuan.png';

function getStore(key) {
  let str = Taro.getStorageSync(key);
  if (!str) {
    return [];
  }
  return JSON.parse(str);
}

function setStore(key, obj) {
  let str = obj;
  if (typeof obj === 'object') {
    str = JSON.stringify(obj);
  }
  Taro.setStorageSync(key, str);
}

export default class Question extends Component {
  config = {
    navigationBarTitleText: '首页'
  };

  state = {
    showQuestionModal: false,
    questionList: getStore('questionList')
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  // 提问
  addQuestion() {
    this.setState({
      showQuestionModal: true
    });
  }
  // 提交
  submitQuestion(obj) {
    const { questionList } = this.state;
    const tempObj = { id: parseInt(Math.random() * 10000), ...obj };
    setStore('questionList', [...questionList, tempObj]);
    this.setState({
      questionList: [...questionList, tempObj]
    });
    this.cancelQuestion();
  }
  // 取消
  cancelQuestion() {
    this.setState({
      showQuestionModal: false
    });
  }
  // 投票
  addVote(item) {
    const { questionList } = this.state;
    if (item) {
      item.vote = item.vote ? item.vote + 1 : 1;
    }

    let newList = questionList.map(itemQuestion => {
      if (itemQuestion.id === item.id) {
        itemQuestion = { ...item };
      }
      return itemQuestion;
    });

    this.setState({ questionList: newList }, () => {
      setStore('questionList', this.state.questionList);
    });
  }
  // 减票
  cutVote(item) {
    const { questionList } = this.state;
    if (item) {
      item.vote = item.vote ? item.vote - 1 : 0;
    }

    let newList = questionList.map(itemQuestion => {
      if (itemQuestion.id === item.id) {
        itemQuestion = { ...item };
      }
      return itemQuestion;
    });

    this.setState({ questionList: newList }, () => {
      setStore('questionList', this.state.questionList);
    });
  }

  render() {
    const { showQuestionModal, questionList } = this.state;
    const mylist = questionList.sort((a, b) => b.vote - a.vote);

    return (
      <View className='question'>
        <View className='title'>Taro问答实例</View>
        <View className='question-list'>
          {mylist.length > 0 &&
            mylist.map(item => {
              return (
                <View className='question' key={item.id}>
                  <View className='question-left'>
                    <View className='question-title'>{item.title}</View>
                    <View className='question-desc'>{item.desc}</View>
                  </View>
                  <View className='question-right'>
                    <Image
                      className='img'
                      src={Yes}
                      onClick={() => this.addVote(item)}
                    />
                    <Text>{item.vote ? item.vote : 0}</Text>
                    <Image
                      className='img'
                      src={No}
                      onClick={() => this.cutVote(item)}
                    />
                  </View>
                </View>
              );
            })}
        </View>
        {showQuestionModal ? (
          <AddQuestion
            onSubmitQuestion={obj => this.submitQuestion(obj)}
            onCancelQuestion={() => this.cancelQuestion()}
          />
        ) : null}
        <Button className='btn-question' onClick={() => this.addQuestion()}>
          提问
        </Button>
      </View>
    );
  }
}
