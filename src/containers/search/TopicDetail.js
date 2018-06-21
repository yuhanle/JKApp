import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {
  HEIGHT,
  WIDTH,
  getResponsiveHeight,
  getResponsiveWidth
} from '../../common/styles'
import PropTypes from 'prop-types'
import CommonNav from '../../components/CommonNav';
import Container from '../../components/Container';
import TopicHeader from '../../components/TopicHeader';
import { Actions } from 'react-native-router-flux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import DefaultTabBar from '../../components/DefaultTabBar'
import SeperatorLine from '../../components/SeperatorLine'
import HttpUtils from '../../network/HttpUtils'
import { FEED } from '../../network/Urls'

export default class TopicDetail extends Component {
  static propTypes = {
    item: PropTypes.object
  }

  constructor() {
    super()

    this.state = {
      headerHeight: WIDTH/1.5,
      titleOpacity: 0.0,
    }
  }

  async componentDidMount() {
    if (!this.props.item || !this.props.item.id) {
      return
    }

    this._featchData(this.props.item.id)
  }

  async _featchData(itemid) {
    let data = {
      limit: 20,
      topic: itemid,
    }
    const res = await HttpUtils.postJK(FEED.messagesHistory, data)

    // TODO: 添加精选和广场
    
  }

  render() {
    return (
      <Container barStyle={"light-content"}>
        <CommonNav
          title={this.props.item.content}
          navBarStyle={{backgroundColor: 'transparent'}}
          titleStyle={{color: '#fff', opacity: this.state.titleOpacity}}
          leftbtnStyle={{tintColor: '#fff'}}
          showBottomLine={false}
          rightButton={
            <TouchableOpacity
              style={{width: getResponsiveWidth(24)}}
            >
              <Image style={{tintColor: '#fff'}} source={require('../../../res/images/ic_messages_share.png')} />
            </TouchableOpacity>
          }
        />

        <ScrollView
          style={styles.scBox}
          scrollEventThrottle={60}
          onScroll={(e) => {
            // 获取原生事件
            var nativeEvent = e.nativeEvent
            //获取当前偏移量
            var contentY = nativeEvent.contentOffset.y

            var titleOpacity = 0
            if (contentY >= 64) {
              titleOpacity = 1.0
            }else if (contentY >= 0) {
              titleOpacity = 1/64 * contentY
            }else {
               titleOpacity = 0.0
            }

            this.setState({
              // headerHeight: this.state.headerHeight - contentY,
              titleOpacity: titleOpacity
            })
          }}
        >
          <TopicHeader style={styles.topicHeader} item={this.props.item}/>
          <SeperatorLine height={20}/>
          // 分类图
          <ScrollableTabView
            style={{backgroundColor: '#fff', height: HEIGHT - 64 - 44}}
            tabBarUnderlineStyle={{backgroundColor: '#1eaaf1', height: 2}}
            tabBarActiveTextColor='#1eaaf1'
            tabBarTextStyle={{fontSize: 14}}
            renderTabBar={() => <DefaultTabBar />}
            initialPage={0}
          >
          <Text tabLabel={"精选"}>

          </Text>
          <Text tabLabel={"广场"}>

          </Text>
          </ScrollableTabView>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  scBox: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
  },
  topicHeader: {
    // position: 'absolute',
  }
})
