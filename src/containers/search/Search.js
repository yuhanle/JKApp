import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  ScrollView,
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
import HttpUtils from '../../network/HttpUtils'
import { FEED, USER } from '../../network/Urls'
import { Actions } from 'react-native-router-flux'
import { SCENE_WEB, SCENE_LADDER, SCENE_DAILIES } from '../../constants/scene'
import Carousel from 'react-native-snap-carousel'
import TextPingFang from '../../components/TextPingFang'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { CachedImage } from 'react-native-img-cache'
import ScrollableTabBar from '../../components/ScrollableTabBar'
import Topic from './Topic'

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      categories: []
    }
  }

  async componentDidMount() {
    this._featchBannerList()
    this._featchCategories()
  }

  async _featchBannerList() {
    const res = await HttpUtils.get(FEED.bannerList)
    this.setState({
      entries: res.data
    })
  }

  async _featchCategories() {
    const res = await HttpUtils.post(USER.categories)
    let list = res.data
    list.forEach((item) => {
      item.key = item.alias
    })

    this.setState({
      categories: list
    })
  }

  _renderItem ({item, index}) {
    return (
      <View style={styles.slide}>
        <TouchableOpacity style={styles.banner}>
          <Image style={styles.bannerImage} source={{ uri: item.pictureUrl }} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return(
      <View style={styles.container}>
        // 导航栏
        <View style={styles.nav}>
          <View style={{marginTop: 20, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{width: WIDTH - 60, height: 40, paddingLeft: 12, paddingTop: 4, paddingBottom: 4}}>
              <SearchBar placeholder="国航航班返航"/>
            </View>
            <TouchableOpacity style={{width: 60, height: 40, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <CachedImage source={require('../../../res/images/ic_navbar_scan.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scBox} ref={ref => this.scBox = ref}>
          // 轮播图
          <View style={styles.bannerBox}>
            <Carousel
              layout={'default'}
              ref={(c) => { this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={WIDTH}
              itemWidth={WIDTH - 100}
            />
            <View style={styles.actionBox}>
              <TouchableOpacity style={styles.actionBtnBox} onPress={() => {
                Actions.jump(SCENE_LADDER)
              }}>
                <Image source={require('../../../res/images/ic_discovertab_entrance_rankinglist.png')} />
                <TextPingFang style={styles.actionTitle}>排行榜</TextPingFang>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnBox} onPress={() => {
                Actions.jump(SCENE_DAILIES)
              }}>
                <Image source={require('../../../res/images/ic_discovertab_entrance_daily.png')} />
                <TextPingFang style={styles.actionTitle}>即刻小报</TextPingFang>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnBox} onPress={() => {
                Actions.jump(SCENE_LADDER)
              }}>
                <Image source={require('../../../res/images/ic_discovertab_entrance_custom_topic.png')} />
                <TextPingFang style={styles.actionTitle}>创建主题</TextPingFang>
              </TouchableOpacity>
            </View>
          </View>

          // 分类图
          <ScrollableTabView
            style={{backgroundColor: '#fff', marginTop: 20, height: HEIGHT - 64 - 44}}
            tabBarUnderlineStyle={{backgroundColor: '#1eaaf1', height: 2}}
            tabBarActiveTextColor='#1eaaf1'
            tabBarTextStyle={{fontSize: 14}}
            renderTabBar={() => <ScrollableTabBar />}
            initialPage={0}
          >
            {
              this.state.categories.map((item, idx) => {
                return(
                  <Text key={item.key} tabLabel={item.name}>
                    <Topic onScroll={(contentY) => {
                      if (contentY >= 254) contentY = 254
                      this.scBox.scrollTo({animated: false, y: contentY})
                    }} />
                  </Text>
                )
              })
            }
          </ScrollableTabView>
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
    width: WIDTH,
  },
  bannerBox: {
    width: WIDTH,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  slide: {
    width: '100%',
    height: (WIDTH - 100)/(720/338.0),
    marginBottom: 20,
  },
  banner: {
    width: '100%',
    height: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    // shadowRadius: 0.6,
    shadowOffset: { width: 5, height: 5 },
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    // shadowColor: '#000',
    // shadowOpacity: 0.8,
    // shadowRadius: 30,
    // shadowOffset: { width: 100, height: 100 },
  },
  actionBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionBtnBox: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 14,
    marginTop: 5,
  }
})
