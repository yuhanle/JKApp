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
import { FEED } from '../../network/Urls'
import SeperatorLine from '../../components/SeperatorLine'
import ImageView from '../../components/ImageView'

export default class TopicBest extends Component {
  static propTypes = {
    item: PropTypes.object,
  }

  static defaultProps = {
    item: {}
  }

  state = {
    isRefreshing: false,
    topiclist: [],
  }

  async componentDidMount() {
    this._fetchRecommendItem()
  }

  async _fetchRecommendItem() {
    this.setState({ isRefreshing: true })

    var data = {
      	"topic": this.props.item.id,
      	"limit": 20
    }
    var res = await HttpUtils.postJK(FEED.messagesHistory, data)

    let tmp = res.data
    let topiclist = []

    var index = 1
    tmp.forEach(item => {
      item.key = item.id
      item.index = index
      topiclist.push(item)

      index++
    })

    this.setState({
      topiclist,
      isRefreshing: false
    })
  }

  _renderItem({ item }) {
    var uri = ''
    if (item.video && item.video.thumbnailUrl) {
      uri = item.video.thumbnailUrl
    }else if (item.pictures && item.pictures.length && item.pictures[0] && item.pictures[0].picUrl) {
      uri = item.pictures[0].picUrl
    }else if (item.pictureUrls && item.pictureUrls.length && item.pictureUrls[0] && item.pictureUrls[0].middlePicUrl) {
      uri = item.pictureUrls[0].middlePicUrl
    }else {
      uri = ''
    }

    var date = new Date(item.createdAt)

    return (
      <TouchableOpacity style={styles.itemBox}>
        <Text style={styles.itemDate}>{date.getHours() + ':' + date.getMinutes()}</Text>
        <Text style={styles.itemContent}>{item.content}</Text>
        {
          uri.length ? (
            <ImageView
              style={styles.itemImage}
              source={{ uri: uri }}
              images={[
                {
                  url: uri,
                  freeHeight: true
                }
              ]}
            />
          ) : null
        }
        {
          item.personalUpdate && item.personalUpdate.user && item.personalUpdate.user.screenName ? <Text style={styles.itemVia}>{item.personalUpdate.user.screenName}</Text> : null
        }
        <SeperatorLine style={{ width: WIDTH, marginTop: 10, marginLeft: 20 }}/>
        {
          item ?
            // 操作区域
            <View style={styles.actionBox}>
              // 喜欢
              <TouchableOpacity style={styles.actionBtn}>
                <Image source={require('../../../res/images/ic_messages_like.png')}/>
                <Text style={styles.actionBtn_text}>{item.popularity}</Text>
              </TouchableOpacity>
              // 评论
              <TouchableOpacity style={styles.actionBtn}>
                <Image source={require('../../../res/images/ic_messages_comment.png')}/>
                <Text style={styles.actionBtn_text}>{item.commentCount}</Text>
              </TouchableOpacity>
              // 转发
              <TouchableOpacity style={styles.actionBtn}>
                <Image source={require('../../../res/images/ic_messages_repost.png')}/>
                <Text style={styles.actionBtn_text}>{item.repostCount}</Text>
              </TouchableOpacity>
              <View style={{flex: 2}}/>
              // 分享
              <TouchableOpacity style={[styles.actionBtn, {flex: 0}]} onPress={() => {
                this.setState({ modalVisible: true })
              }}>
                <Image source={require('../../../res/images/ic_messages_share.png')}/>
              </TouchableOpacity>
            </View>
            : null
        }
        <SeperatorLine style={{width: WIDTH}}/>
      </TouchableOpacity>
    )
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
          renderItem={this._renderItem.bind(this)}
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
  itemBox: {
    width: WIDTH,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemDate: {
    color: '#555555',
    fontSize: 14,
    marginLeft: 20,
  },
  itemImage: {
    marginTop: 15,
    width: WIDTH/2.0,
    height: WIDTH/2.0,
    marginLeft: 20,
  },
  itemContent: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 25,
    marginLeft: 20,
  },
  itemVia: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    color: '#2cb0ee',
    marginLeft: 20,
  },
  actionBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  actionBtn: {
    flexDirection: 'row',
    flex: 1.5,
  },
  actionBtn_text: {
    marginLeft: 5,
    color: '#d8d8d8',
  },
})
