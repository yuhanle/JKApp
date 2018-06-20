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
import RecommendItem from './RecommendItem'
import RecommendMsg from '../../components/RecommendMsg'
import HttpUtils from '../../network/HttpUtils'
import { FEED } from '../../network/Urls'
import SeperatorLine from '../../components/SeperatorLine'

export default class Recommend extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
  }

  state = {
    placeholder: '拼多多违法商品',
    focused: false,
    value: '',
    isRefreshing: false,
    recomlist: [],
    recommendData: [],
  }

  async componentDidMount() {
    this._fetchRecommendItem()
  }

  async _fetchRecommendItem() {
    this.setState({ isRefreshing: true })
    const res = await HttpUtils.post(FEED.recommendList)
    let tmp = res.data
    let recomlist = []
    let recomItems = res.data[0].items
    tmp.forEach(item => {
      item.key = item.id
      if (item.type != 'HEADLINE_RECOMMENDATION') {
        recomlist.push(item)
      }
    })
    recomItems.forEach(item => {
      item.key = item.id
    })

    this.setState({
      recomlist,
      recommendData: recomItems,
      isRefreshing: false
    })
  }

  _renderItem({ item }) {
    return <RecommendItem data={item}/>
  }

  _renderMsgItem({ item }) {
    return <RecommendMsg data={item}/>
  }

  _listFooter() {
    return (
      <View style={[styles.list_footer, { display: this.state.recommendData.length === 0 ? 'none' : 'flex' }]}/>
    )
  }

  _header = () => {
    return (
      <View style={{height: 100, width: '100%'}}>
        <FlatList
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ref={ref => this.fvl = ref}
          data={this.state.recommendData}
          extraData={this.state}
          renderItem={this._renderItem.bind(this)}
          getItemLayout={(data, index) => (
            {length: 120, offset: 120 * index, index}
          )}
          ItemSeparatorComponent={() => this._separator()}
          refreshing={this.state.isRefreshing}
        />
        <SeperatorLine style={{width: WIDTH}}/>
      </View>
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
    return (
      <View style={styles.container}>
        <FlatList
          ref={ref => this.fhl = ref}
          style={styles.msgBox}
          data={this.state.recomlist}
          extraData={this.state}
          renderItem={this._renderMsgItem.bind(this)}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  msgBox: {
    width: '100%',
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
