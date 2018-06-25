import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
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
import TextPingFang from '../../components/TextPingFang'
import RecommendMsg from '../../components/RecommendMsg'
import HttpUtils from '../../network/HttpUtils'
import { FEED } from '../../network/Urls'
import SeperatorLine from '../../components/SeperatorLine'
import { SCENE_CHATHIS, SCENE_NEWDONG } from '../../constants/scene'
import { Actions } from 'react-native-router-flux'

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isRefreshing: false,
    recomlist: []
  }

  _leftButton() {
    return (
      <TouchableOpacity onPress={() => {
        Actions.jump(SCENE_CHATHIS)
      }}>
        <Image source={require('../../../res/images/ic_navbar_mail.png')} />
      </TouchableOpacity>
    )
  }

  _rightButton() {
    return (
      <TouchableOpacity onPress={() => {
        Actions.jump(SCENE_NEWDONG)
      }}>
        <Image source={require('../../../res/images/ic_navbar_camera.png')} />
      </TouchableOpacity>
    )
  }

  async componentDidMount() {
    this._fetchRecommendItem()
  }

  async _fetchRecommendItem() {
    this.setState({ isRefreshing: true })
    const res = await HttpUtils.post(FEED.personalUpdate)
    let recomItems = res.data
    var recomlist = []
    recomItems.forEach(item => {
      item.key = item.id
      if (item.type != 'SECTION_HEADER') {
        recomlist.push(item)
      }
    })

    this.setState({
      recomlist,
      isRefreshing: false
    })
  }

  _renderMsgItem({ item }) {
    return <RecommendMsg data={item}/>
  }

  _header = () => {
    return (
      // 发布动态
      <TouchableOpacity style={styles.sendBox} activeOpacity={0.6} onPress={() => {
        Actions.jump(SCENE_NEWDONG)
      }}>
        <View style={styles.sendBg}>
          <Image style={styles.sendAvatar} source={{ uri: 'https://cdn.ruguoapp.com/Fk87XQk7xJnXEUVumfoUzL3Ce2wV.jpg?imageView2/0/w/800/h/800' }}/>
          <Text style={styles.sendPlaceholder}>发布动态...</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _listFooter() {
    return (
      <View style={[styles.list_footer, { display: this.state.recommendData.length === 0 ? 'none' : 'flex' }]}/>
    )
  }

  _footer = () => {
    return <Text style={{width: 10}}></Text>;
  }

  _separator = () => {
    return <View style={{width: 0}}/>;
  }

  _emptyDiary() {
    return (
      <View style={styles.none_container}>
        <TextPingFang style={styles.text_none}>空空如也，{'\n'}刷一刷附近的人吧～</TextPingFang>
      </View>
    )
  }

  render() {
    return(
      <View style={styles.container}>
        // 导航栏
        <View style={styles.nav}>
          <View style={{marginTop: 20, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <NavBar
              title='动态'
              leftButton={this._leftButton()}
              rightButton={this._rightButton()}
            />
          </View>
        </View>

        // 容器
        <FlatList
          ref={ref => this.fhl = ref}
          style={styles.msgBox}
          data={this.state.recomlist}
          extraData={this.state}
          renderItem={this._renderMsgItem}
          getItemLayout={(data, index) => (
            {length: 120, offset: 120 * index, index}
          )}
          ListHeaderComponent={() => this._header()}
          ListFooterComponent={() => this._footer()}
          ListEmptyComponent={() => this._emptyDiary()}
          ItemSeparatorComponent={() => this._separator()}
          onRefresh={() => this._fetchRecommendItem()}
          refreshing={this.state.isRefreshing}
        />
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
  sendBox: {
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#eee',
  },
  sendBg: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  sendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginLeft: 20,
  },
  sendPlaceholder: {
    color: '#aaa',
    fontSize: 17,
    marginLeft: 15,
  },
  none_container: {
    alignItems: 'center',
    paddingTop: getResponsiveHeight(150),
    backgroundColor: 'transparent',
    zIndex: -10
  },
  text_none: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center'
  },
})
