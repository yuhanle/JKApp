import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types'
import TextPingFang from './TextPingFang'

export default class AvatarCell extends Component {
  static propTypes = {
    userinfo: PropTypes.object
  }

  render() {
    let userinfo = this.props.userinfo
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}>
        <Image style={styles.avatar} source={{ uri: userinfo.avatarImage.smallPicUrl }}/>
        <View style={styles.textBox}>
          <TextPingFang style={styles.nick_name}>{userinfo.screenName ? userinfo.screenName : '赶紧加入我们吧'}</TextPingFang>
          <TextPingFang style={styles.subtitle}>查看个人主页</TextPingFang>
        </View>
        <View style={{flex: 2}}/>
        <Image style={styles.arrow} source={require('../../res/images/ic_common_arrow_right.png')}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  textBox: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  nick_name: {
    fontSize: 24,
  },
  subtitle: {
    color: '#808080',
    marginTop: 10,
  },
  arrow: {

  }
})
