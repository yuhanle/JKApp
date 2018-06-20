import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet
 } from 'react-native';
import {
   HEIGHT,
   WIDTH,
   getResponsiveHeight,
   getResponsiveWidth
 } from '../common/styles'
import { BlurView, VibrancyView } from 'react-native-blur';
import PropTypes from 'prop-types'
import TextPingFang from './TextPingFang'

export default class TopicHeader extends Component {
  static propTypes = {
    item: PropTypes.object
  }

  constructor() {
    super()

    this.state = { viewRef: null };
  }

  render() {
    let item = this.props.item
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.blurBox}>
          <Image
            ref={(img) => { this.backgroundImage = img; }}
            source={{uri: this.props.item.squarePicture.middlePicUrl}}
            style={styles.blurImage}
          />
          <BlurView
            style={{position: "absolute", top: 0, left: 0, bottom: 0, right: 0}}
            viewRef={this.state.viewRef}
            blurType="dark"
            blurAmount={20}
          />
        </View>

        // 中间头像 以及 文案描述
        <View style={styles.mid}>
          <Image
            ref={(img) => { this.backgroundImage = img; }}
            source={{uri: this.props.item.squarePicture.thumbnailUrl}}
            style={styles.midImage}
          />
          <TextPingFang style={styles.title}>{item.content}</TextPingFang>
          <TextPingFang style={styles.brief} numberOfLines={2}>{item.briefIntro}</TextPingFang>
        </View>

        <TextPingFang style={styles.subscribeText}>{item.subscribersCount}人关注</TextPingFang>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    backgroundColor: '#fff',
  },
  blurBox: {
    width: WIDTH,
    height: WIDTH/2.8,
    position: 'absolute',
  },
  blurImage: {
    width: '100%',
    height: '100%',
  },
  mid: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: WIDTH/2.8 - 72,
    marginBottom: 30,
  },
  midImage: {
    height: 90,
    width: 90,
    borderRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
    textAlign: 'center',
  },
  brief: {
    fontSize: 15,
    color: '#555555',
    marginLeft: 40,
    marginRight: 40,
    textAlign: 'center',
  },
  subscribeText: {
    position: 'absolute',
    top: WIDTH/2.8 - 30,
    left: 20,
    fontSize: 14,
    color: '#fff',
    textAlign: 'left',
  }
})
