import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native'
import NavBar from '../../components/NavBar'
import {
  HEIGHT,
  WIDTH,
  getResponsiveHeight,
  getResponsiveWidth
} from '../../common/styles'
import AvatarCell from '../../components/AvatarCell'
import NormalCell from '../../components/NormalCell'
import HttpUtils from '../../network/HttpUtils'
import { USER } from '../../network/Urls'
import { Actions } from 'react-native-router-flux'
import { SCENE_WEB } from '../../constants/scene'

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [1],
      userinfo: {
        screenName: '加载中...',
        avatarImage: {
          smallPicUrl: 'https://avatars1.githubusercontent.com/u/10498756?s=400&u=dfe0ca5cdb74c9f4ed728f957cc6ade3c03f8b0a&v=4',
        }
      },
      itemsArray: [
        {
          icon: require('../../../res/images/ic_personal_tab_my_topic.png'),
          title: '我关注的主题'
        },
        {
          icon: require('../../../res/images/ic_personal_tab_collection.png'),
          title: '我的收藏'
        },
        {
          icon: require('../../../res/images/ic_personal_tab_activity_notification_no_new_messages.png'),
          title: '我的通知'
        },
        {
          icon: require('../../../res/images/ic_personal_tab_support_center.png'),
          title: '帮助与反馈'
        },
        {
          icon: require('../../../res/images/ic_personal_tab_custom_topic.png'),
          title: '我创建的主题'
        },
      ]
    }
  }

  async componentDidMount() {
    this._featchUserProfile()
  }

  async _featchUserProfile() {
    const res = await HttpUtils.post(USER.userProfile)
    this.setState({
      userinfo: res.user
    })
  }

  _leftButton() {
    return (
      <TouchableOpacity>
        <Image source={require('../../../res/images/ic_navbar_add_friends.png')} />
      </TouchableOpacity>
    )
  }

  _rightButton() {
    return (
      <TouchableOpacity>
        <Image source={require('../../../res/images/ic_navbar_setting.png')} />
      </TouchableOpacity>
    )
  }

  render() {
    return(
      <View style={styles.container}>
        // 导航栏
        <View style={styles.nav}>
          <View style={{marginTop: 20, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <NavBar
              title='我的'
              leftButton={this._leftButton()}
              rightButton={this._rightButton()}
            />
          </View>
        </View>

        // 容器
        <ScrollView style={styles.scBox}>
          <AvatarCell style={styles.avatarBox} userinfo={this.state.userinfo} />
          <NormalCell style={[styles.normalBox, {marginTop: 20,}]} item={this.state.itemsArray[0]}/>
          <NormalCell style={styles.normalBox} item={this.state.itemsArray[1]}/>
          <NormalCell style={styles.normalBox} item={this.state.itemsArray[2]}/>
          <NormalCell style={styles.normalBox} item={this.state.itemsArray[3]} onPress={() => {
            Actions.jump(SCENE_WEB, { url: 'https://ruguoapp.com/support' })
          }}/>
          <NormalCell style={[styles.normalBox, {marginTop: 20,}]} item={this.state.itemsArray[4]}/>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  nav: {
    height: 64,
    width: '100%',
    backgroundColor: '#fff',
  },
  scBox: {
    height: '100%',
    width: '100%',
  },
  avatarBox: {
    marginTop: 20,
    width: '100%',
  }
})
