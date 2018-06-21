import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {
  HEIGHT,
  WIDTH,
  getResponsiveHeight,
  getResponsiveWidth
} from '../../common/styles'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux'
import { SCENE_WEB } from '../../constants/scene'
import TextPingFang from '../../components/TextPingFang'
import TopicItem from './TopicItem'
import HttpUtils from '../../network/HttpUtils'
import { USER, FEED } from '../../network/Urls'
import SeperatorLine from '../../components/SeperatorLine'

export default class Topic extends Component {
  static propTypes = {
    trending: PropTypes.number, // 0 话题 1 上升最快 2 近期最热 3 即友创建
    categories: PropTypes.string,
    ladder: PropTypes.bool,
    categoryAlias: PropTypes.string,
  }

  static defaultProps = {
    ladder: false,
    trending: -1,
    categoryAlias: 'RECOMMENDATION',
  }

  state = {
    isRefreshing: false,
    topiclist: [],
  }

  async componentDidMount() {
    this._fetchRecommendItem(this.props.categoryAlias)
  }

  async _fetchRecommendItem(categoryAlias) {
    this.setState({ isRefreshing: true })

    var res = {}
    let trending = this.props.trending
    if (trending == 0) {
      res = await HttpUtils.get(FEED.trending0)
    }else if (trending == 1) {
      res = await HttpUtils.get(FEED.trending1)
    }else if (trending == 2) {
      res = await HttpUtils.get(FEED.trending2)
    }else {
      res = await HttpUtils.postJK(USER.recommendation, { categoryAlias: categoryAlias })
    }

    let tmp = res.data
    let topiclist = []

    var index = 1
    tmp.forEach(item => {
      item.key = item.id
      item.index = index
      item.ladder = this.props.ladder
      topiclist.push(item)

      index++
    })

    this.setState({
      topiclist,
      isRefreshing: false
    })
  }

  _renderItem({ item }) {
    return <TopicItem data={item}/>
  }

  _listFooter() {
    return (
      <View style={[styles.list_footer, { display: this.state.topiclist.length === 0 ? 'none' : 'flex' }]}/>
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
        <TextPingFang style={styles.text_none}>空空如也</TextPingFang>
      </View>
    )
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <FlatList
          ref={ref => this.fhl = ref}
          style={styles.msgBox}
          data={this.state.topiclist}
          extraData={this.state}
          renderItem={this._renderItem}
          ListFooterComponent={() => this._footer()}
          ListEmptyComponent={() => this._emptyDiary()}
          ItemSeparatorComponent={() => this._separator()}
          scrollEventThrottle={16}
          onScroll={(e) => {
            // 获取原生事件
            var nativeEvent = e.nativeEvent
            //获取当前偏移量
            var contentY = nativeEvent.contentOffset.y
            if (contentY <= 0) {
              e.nativeEvent.contentOffset = { y: 0 }
            }

            this.props.onScroll && this.props.onScroll(contentY)
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  msgBox: {
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
})
