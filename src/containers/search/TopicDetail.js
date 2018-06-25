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
import TopicBest from './TopicBest'

export default class TopicDetail extends Component {
  static propTypes = {
    item: PropTypes.object
  }

  constructor() {
    super()

    this.state = {
      titleOpacity: 0.0,
    }
  }

  renderNavBar() {
    return (
      <CommonNav
        showBottomLine={false}
        navStyle={{marginTop: 20}}
        leftbtnStyle={{tintColor: '#fff'}}
        navBarStyle={{backgroundColor: 'transparent'}}
        rightButton={
          <TouchableOpacity
            style={{width: getResponsiveWidth(24)}}
          >
            <Image style={{tintColor: '#fff'}} source={require('../../../res/images/ic_messages_share.png')} />
          </TouchableOpacity>
        }
      />
    )
  }

  renderContent() {
    return (
      <ScrollView
        style={styles.scBox}
        scrollEventThrottle={16}
        ref={ref => this.scBox = ref}
      >
        <TopicHeader item={this.props.item}/>
        <SeperatorLine height={20}/>
        <ScrollableTabView
          style={{backgroundColor: '#fff', height: HEIGHT}}
          tabBarUnderlineStyle={{backgroundColor: '#1eaaf1', height: 2}}
          tabBarActiveTextColor='#1eaaf1'
          tabBarTextStyle={{fontSize: 14}}
          renderTabBar={() => <DefaultTabBar />}
          initialPage={0}
        >
        <Text tabLabel={"精选"}>
          <TopicBest
            item={this.props.item}
            onScroll={(contentY) => {
              if (contentY >= 254) contentY = 254
              this.scBox.scrollTo({animated: false, y: contentY})
            }}
          />
        </Text>
        <Text tabLabel={"广场"}>

        </Text>
        </ScrollableTabView>
      </ScrollView>
    )
  }

  render() {
    return (
      <Container barStyle={"light-content"} hidePadding={true}>
        {this.renderNavBar()}
        {this.renderContent()}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  scBox: {
    top: 0,
    left: 0,
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
  }
})
