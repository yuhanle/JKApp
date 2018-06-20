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
    item: PropTypes.object
  }

  render() {
    let item = this.props.item
    return (
      <TouchableOpacity style={[styles.container, this.props.style]} onPress={this.props.onPress}>
        <Image style={styles.icon} source={item.icon}/>
        <TextPingFang style={styles.title}>{item.title}</TextPingFang>
        <TextPingFang style={styles.subtitle}>{item.subtitle}</TextPingFang>
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
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    height: 24,
    width: 24,
  },
  title: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  subtitle: {
    color: '#808080',
    marginTop: 6,
  },
  arrow: {

  }
})
