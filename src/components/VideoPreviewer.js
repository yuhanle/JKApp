/**
 * Created by yuhanle on 2018/6/26.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { CachedImage } from "react-native-img-cache";
import PropTypes from 'prop-types';

export default class VideoPreviewer extends Component {
  static props = {
    source: PropTypes.object,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    source: {
      uri: '',
      duration: 0,
    },
    onPress: () => {},
  }

  constructor() {
    super()

    this.state = {

    }
  }

  render() {
    function padNumber(num, fill) {
      var len = ('' + num).length;
      return (Array(
        fill > len ? fill - len + 1 || 0 : 0
      ).join(0) + num);
    }

    let datestr = '00:00'
    let duration = Math.floor(this.props.source.duration/1000)

    let mm = Math.floor(duration/3600)
    let ss = Math.floor(duration%60)
    datestr = padNumber(mm, 2).toString() + ':' + padNumber(ss, 2).toString()

    return (
      <View style={[styles.container, this.props.style]}>
        <CachedImage style={styles.bg} source={this.props.source} />
        <Text style={styles.duration}>{datestr}</Text>>
        <TouchableOpacity style={styles.playBox} onPress={this.props.onPress}>
          <Image style={styles.play} source={require('../../res/images/ic_mediaplayer_videoplayer_play.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  bg: {
    height: '100%',
    width: '100%',
  },
  playBox: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  play: {
    width: 30,
    height: 30,
  },
  duration: {
    position: 'absolute',
    color: '#fff',
    bottom: 15,
    right: 15,
  }
})