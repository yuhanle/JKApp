import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import {
  HEIGHT,
  WIDTH,
  getResponsiveHeight,
  getResponsiveWidth
} from '../common/styles'
import PropTypes from 'prop-types'
import SeperatorLine from './SeperatorLine'
import TextPingFang from './TextPingFang'

export default class SharePopup extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool
  }
  render() {
    return (
      <Modal
        visible={this.props.modalVisible}
        animationType={'none'}
        transparent = {true}
        onRequestClose={()=> this.onRequestClose()}
      >
        <View style={styles.container}>
          <View style={styles.actionBox}>
            <Text style={styles.textSmall}>分享到</Text>
            <ScrollView horizontal={true} style={styles.scContainer}>
              <TouchableOpacity style={styles.actionBtnBox}>
                <Image source={require('../../res/images/ic_share_card.png')} />
                <TextPingFang style={styles.textSmall}>制作卡片</TextPingFang>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnBox}>
                <Image source={require('../../res/images/ic_share_wechat_timeline.png')} />
                <TextPingFang style={styles.textSmall}>朋友圈</TextPingFang>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnBox}>
                <Image source={require('../../res/images/ic_share_wechat.png')} />
                <TextPingFang style={styles.textSmall}>微信</TextPingFang>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnBox}>
                <Image source={require('../../res/images/ic_share_qzone.png')} />
                <TextPingFang style={styles.textSmall}>QQ空间</TextPingFang>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnBox}>
                <Image source={require('../../res/images/ic_share_qq.png')} />
                <TextPingFang style={styles.textSmall}>QQ</TextPingFang>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnBox}>
                <Image source={require('../../res/images/ic_share_weibo.png')} />
                <TextPingFang style={styles.textSmall}>微博</TextPingFang>
              </TouchableOpacity>
            </ScrollView>
            <SeperatorLine />
            <ScrollView horizontal={true} style={styles.scContainer}>
              <TouchableOpacity style={styles.actionBtnBox}>
                <Image source={require('../../res/images/ic_share_copylink.png')} />
                <TextPingFang style={styles.textSmall}>复制链接</TextPingFang>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnBox}>
                <Image source={require('../../res/images/ic_share_safari.png')} />
                <TextPingFang style={styles.textSmall}>浏览器</TextPingFang>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnBox}>
                <Image source={require('../../res/images/ic_share_more.png')} />
                <TextPingFang style={styles.textSmall}>更多</TextPingFang>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <TouchableOpacity style={styles.cancelBox} onPress={() => {
            this.props.cancelOnPress()
          }}>
            <Text style={styles.textCancle}>取消</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
  },
  actionBox: {
    width: WIDTH - 20,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scContainer: {
    width: WIDTH - 20,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'column',
  },
  actionBtnBox: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 15,
  },
  cancelBox: {
    height: 50,
    width: WIDTH - 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  textSmall: {
    marginTop: 5,
    fontSize: 12,
    color: '#555555',
  },
  textCancle: {
    fontSize: 20,
    lineHeight: 50,
    color: '#555555',
    alignSelf: 'center',
  },
})
