import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types'
import CommonNav from '../../components/CommonNav';
import Container from '../../components/Container';
import TopicHeader from '../../components/TopicHeader';
import { Actions } from 'react-native-router-flux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import DefaultTabBar from '../../components/DefaultTabBar'
import Topic from './Topic'

export default class Ladder extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Container>
        <CommonNav title={"排行榜"}/>
        // 分类图
        <ScrollableTabView
          style={{backgroundColor: '#fff'}}
          tabBarUnderlineStyle={{backgroundColor: '#1eaaf1', height: 2}}
          tabBarActiveTextColor='#1eaaf1'
          tabBarTextStyle={{fontSize: 14}}
          renderTabBar={() => <DefaultTabBar />}
          initialPage={0}
        >
        <Text tabLabel={"上升最快"}>
          <Topic ladder={true} trending={0}/>
        </Text>
        <Text tabLabel={"近期最热"}>
          <Topic ladder={true} trending={1}/>
        </Text>
        <Text tabLabel={"即友创建"}>
          <Topic ladder={true} trending={2}/>
        </Text>
        </ScrollableTabView>
      </Container>
    );
  }
}
