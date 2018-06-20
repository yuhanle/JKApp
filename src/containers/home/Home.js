import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native'
import SearchBar from '../../components/SearchBar'
import {
  HEIGHT,
  WIDTH,
  getResponsiveHeight,
  getResponsiveWidth
} from '../../common/styles'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import DefaultTabBar from '../../components/DefaultTabBar'
import { SCENE_WEB } from '../../constants/scene'
import { Actions } from 'react-native-router-flux'
import TextPingFang from '../../components/TextPingFang'
import Recommend from './Recommend'

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholder: '拼多多违法商品',
      focused: false,
      value: '',
      modalVisible: false,
    }
  }

  _emptyDiary() {
    return (
      <View style={styles.none_container}>
        <TextPingFang style={styles.text_none}>空空如也，{'\n'}去其他栏目看看？～</TextPingFang>
      </View>
    )
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={{marginTop: 20, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{width: WIDTH - 60, height: 40, paddingLeft: 12, paddingTop: 4, paddingBottom: 4}}>
              <SearchBar placeholder="拼多多违法商品"/>
            </View>
            <TouchableOpacity
              style={{width: 60, height: 40, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
              onPress={() => Actions.jump(SCENE_WEB, { url: 'https://www.baidu.com/' })}
            >
              <Image source={require('../../../res/images/ic_navbar_camera.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollableTabView
          style={{backgroundColor: '#fff'}}
          tabBarUnderlineStyle={{backgroundColor: '#1eaaf1',height: 2}}
          tabBarActiveTextColor='#1eaaf1'
          tabBarTextStyle={{fontSize: 17}}
          initialPage={1}
          renderTabBar={() => <DefaultTabBar />}
        >
          <Text tabLabel='关注'>
          </Text>
          <Text tabLabel='推荐'>
            <Recommend />
          </Text>
          <Text tabLabel='附近'/>
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  recommendContainer: {
    width: WIDTH,
    height: '100%',
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
  list_footer: {
    width: WIDTH,
    height: getResponsiveHeight(50),
    backgroundColor: '#fff',
    zIndex: -10
  },
  nav: {
    height: 64,
    width: '100%',
    backgroundColor: '#fff',
  }
})
