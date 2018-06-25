import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Animated,
  Easing
} from 'react-native';
import {
  HEIGHT,
  WIDTH,
  getResponsiveHeight,
  getResponsiveWidth
} from '../../common/styles'
import Container from '../../components/Container'
import CommonNav from '../../components/CommonNav'
import SeperatorLine from '../../components/SeperatorLine'
import ImagePicker from 'react-native-image-picker'

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class NewDong extends Component {
  constructor() {
    super()

    this.keyboardDidShowListener = null;
    this.keyboardDidHideListener = null;
    this.state = { KeyboardShown: false};

    this.state = {
      data: [],
      bottomMargin: 0,
      allowSend: false,
    }

    this.animatedValue = new Animated.Value(0)
  }

  componentWillMount() {
    //监听键盘弹出事件
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
    this.keyboardDidShowHandler.bind(this));
    //监听键盘隐藏事件
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
    this.keyboardDidHideHandler.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillShow',
    this.keyboardWillShowHandler.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide',
    this.keyboardWillHideHandler.bind(this));
  }

  componentWillUnmount() {
    //卸载键盘弹出事件监听
    if(this.keyboardDidShowListener != null) {
      this.keyboardDidShowListener.remove();
    }
    //卸载键盘隐藏事件监听
    if(this.keyboardDidHideListener != null) {
      this.keyboardDidHideListener.remove();
    }
  }

  componentDidMount() {
    this.tx.focus()
  }

  //键盘弹出事件响应
  keyboardDidShowHandler(event) {
    this.setState({KeyboardShown: true});
    console.log(event.endCoordinates.height);
  }

  //键盘隐藏事件响应
  keyboardDidHideHandler(event) {
    this.setState({KeyboardShown: false});
  }

  keyboardWillShowHandler(event) {
    this.setState({ bottomMargin: event.endCoordinates.height })
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.ease
      }
    ).start()
  }

  keyboardWillHideHandler(event) {
    this.setState({ bottomMargin: 0 })
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 300,
        easing: Easing.ease
      }
    ).start()
  }

  //强制隐藏键盘
  dissmissKeyboard() {
    Keyboard.dismiss();
    console.log("输入框当前焦点状态：" + this.refs.bottomInput.isFocused());
  }

  async _fetchItem() {

  }

  onChangeText(e) {
    if (e.length == 0) {
      this.setState({ allowSend: false })
      return
    }

    this.setState({ allowSend: true })
  }

  render() {
    const movingMargin = this.animatedValue.interpolate({
      inputRange: [0,  1],
      outputRange: [0, this.state.bottomMargin]
    })

    return (
      <Container>
        <CommonNav title={'发布新动态'}/>
        <ScrollView style={styles.scBox}>
          <TextInput
            ref={ref => this.tx = ref}
            multiline={true}
            numberOfLines={4}
            maxLength = {140}
            style={styles.tx}
            placeholder={'加个主题，动态就能被更多人看到噢'}
            onChangeText={this.onChangeText.bind(this)}
          >
          </TextInput>
          <TouchableOpacity style={styles.addBtnBox}>
            <Text style={styles.addBtnText}>{'添加主题▶'}</Text>
          </TouchableOpacity>
        </ScrollView>
        <Animated.View style={[styles.bottomBox, {bottom: movingMargin}]}>
          <View style={styles.locationBox}>
            <Image style={styles.locationIcon} source={require('../../../res/images/ic_personaltab_activity_add_location.png')} />
            <Text style={styles.locationDesc}>你在哪里？</Text>
          </View>
          <SeperatorLine />
          // send
          <View style={styles.sendBox}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => {
              ImagePicker.launchImageLibrary(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                  console.log('User cancelled image picker');
                }
                else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                }
                else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                }
                else {
                  let source = { uri: response.uri };

                  // You can also display the image using data:
                  // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                  this.setState({
                    avatarSource: source
                  });
                }
              });
            }}>
              <Image source={require('../../../res/images/ic_personaltab_activity_add_pic.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Image source={require('../../../res/images/ic_personaltab_activity_add_link.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Image source={require('../../../res/images/ic_personaltab_activity_question.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={this.state.allowSend ? 0.6 : 1.0}
              style={[styles.actionSendBtn, {flex: 0, backgroundColor: this.state.allowSend ? '#1eaaf1' : '#bfbfbf'}]}
              onPress={() => {
                if (this.state.allowSend == false) {
                  return
                }

              }}
            >
              <Text style={styles.sendText}>发布</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  scBox: {
    width: WIDTH,
    height: HEIGHT - 64,
  },
  tx: {
    marginTop: 10,
    width: WIDTH,
    height: 100,
    padding: 20,
    fontSize: 15,
  },
  addBtnBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1eaaf1',
    marginLeft: 20,
    padding: 8,
    width: 90,
  },
  addBtnText: {
    color: '#1eaaf1',
    fontSize: 14,
    textAlign: 'center',
  },
  bottomBox: {
    position: 'absolute',
    width: WIDTH,
    left: 0,
    bottom: 0,
  },
  locationBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  locationDesc: {
    marginLeft: 10,
    color: '#bfbfbf',
  },
  sendBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  actionBtn: {
    flex: 2,
  },
  actionSendBtn: {
    borderRadius: 16,
    backgroundColor: '#bfbfbf',
    padding: 24,
    paddingTop: 8,
    paddingBottom: 8,
  },
  sendText: {
    color: '#fff',
  }
})
