import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  HEIGHT,
  WIDTH,
  getResponsiveHeight,
  getResponsiveWidth
} from '../common/styles'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux'
import { SCENE_WEB } from '../constants/scene'
import TextPingFang from './TextPingFang'
import SeperatorLine from './SeperatorLine'
import SharePopup from './SharePopup'
import ImageView from './ImageView'
import VideoPreviewer from './VideoPreviewer'

export default class RecommendMsg extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  state = {
    modalVisible: false,
  }

  _renderMiddle(item) {
    let uri = ''
    let videoUri = ''
    let videoDuration = 0

    if (item && item.pictures && item.pictures[0] && item.pictures[0].middlePicUrl) {
      uri = item.pictures[0].middlePicUrl

      return (
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
      )
    }

    if (item && item.video && item.video.image && item.video.image.picUrl) {
      videoUri = item.video.image.picUrl
      videoDuration = item.video.duration

      return (
        <VideoPreviewer
          style={styles.itemImage}
          source={{
            uri: videoUri,
            duration: videoDuration
          }}
          onPress={() => {
            if (!item || !item.linkInfo || !item.linkInfo.linkUrl) {
              return
            }
            Actions.jump(SCENE_WEB, { url: item.linkInfo.linkUrl })
          }}
        />
      )
    }

    return null
  }

  render() {
    let msgData = this.props.data

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            if (!msgData.item || !msgData.item.linkInfo || !msgData.item.linkInfo.linkUrl) {
              return
            }
            Actions.jump(SCENE_WEB, { url: msgData.item.linkInfo.linkUrl })
          }}
        >
          // 顶部title
          {
            msgData.frontPageTitle ?
            <View>
              <Text style={styles.topic}>{msgData.frontPageTitle}</Text>
              <SeperatorLine style={{width: WIDTH - 20, marginLeft: 20}}/>
            </View> : null
          }

          // 消息区域
          {
            msgData && msgData.item && msgData.item.topic ?
            <View style={styles.recoItemBox}>
              // 话题描述
              <TouchableOpacity style={styles.topicHeader}>
                <Image style={styles.topicAvatar} source={{ uri: msgData.item.topic.squarePicture.thumbnailUrl }} />
                <View style={styles.topicTextBox}>
                  <Text style={styles.topicContent}>{msgData.item.topic.content}</Text>
                  <Text style={styles.topicSubtitle}>{msgData.item.subtitle ? msgData.item.subtitle : (new Date()).toDateString()}</Text>
                </View>
              </TouchableOpacity>
              // 话题内容
              <View style={styles.content}>
                <Text style={styles.contentText}>{msgData.item.content}</Text>
              </View>
              // 话题配图或视频
              { this._renderMiddle(msgData.item) }
            </View>
            : null
          }

          <SeperatorLine style={{ width: WIDTH, marginTop: 10}}/>
          {
            msgData && msgData.item ?
              // 操作区域
              <View style={styles.actionBox}>
                // 喜欢
                <TouchableOpacity style={styles.actionBtn}>
                  <Image source={require('../../res/images/ic_messages_like.png')}/>
                  <Text style={styles.actionBtn_text}>{msgData.item.likeCount}</Text>
                </TouchableOpacity>
                // 评论
                <TouchableOpacity style={styles.actionBtn}>
                  <Image source={require('../../res/images/ic_messages_comment.png')}/>
                  <Text style={styles.actionBtn_text}>{msgData.item.commentCount}</Text>
                </TouchableOpacity>
                // 转发
                <TouchableOpacity style={styles.actionBtn}>
                  <Image source={require('../../res/images/ic_messages_repost.png')}/>
                  <Text style={styles.actionBtn_text}>{msgData.item.repostCount}</Text>
                </TouchableOpacity>
                <View style={{flex: 2}}/>
                // 分享
                <TouchableOpacity style={[styles.actionBtn, {flex: 0}]} onPress={() => {
                  this.setState({ modalVisible: true })
                }}>
                  <Image source={require('../../res/images/ic_messages_share.png')}/>
                </TouchableOpacity>
              </View>
              : null
          }
          <SeperatorLine style={{width: WIDTH}}/>
        </TouchableOpacity>
        <SharePopup
          modalVisible={this.state.modalVisible}
          cancelOnPress={() => {
            this.setState({ modalVisible: false })
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  topic: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  recoItemBox: {
    overflow: 'hidden',
    position: 'relative',
  },
  topicHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  topicAvatar: {
    height: 30,
    width: 30,
    borderRadius: 4,
    overflow: 'hidden',
    margin: 10,
    marginLeft: 20,
  },
  topicTextBox: {
    margin: 10,
    marginLeft: 0,
  },
  topicContent: {
    color: '#597ffb',
  },
  topicSubtitle: {
    marginTop: 5,
    color: '#c1c1c1',
    fontSize: 10,
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentText: {
    lineHeight: 24,
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
  bg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  title: {
    color: '#fff',
    fontSize: 13,
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
  },
  tag: {
    backgroundColor: '#fee237',
    borderRadius: 6,
    overflow: 'hidden',
    position: 'absolute',
    fontSize: 11,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 3,
    paddingBottom: 3,
    bottom: 6,
    left: 6,
  },
  mask: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  itemImage: {
    marginTop: 10,
    width: WIDTH - 40,
    height: WIDTH/2.0,
    alignSelf: 'center',
  }
})
