import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types'
import TextPingFang from '../../components/TextPingFang'
import { Actions } from 'react-native-router-flux'
import { SCENE_TOPICDETAILE } from '../../constants/scene'

export default class TopicItem extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  _renderIndexItem(item) {
    if (item.ladder) {
      if (item.index == 1) {
        return (<Image style={styles.ladderImage} source={require('../../../res/images/ic_topic_rank_first.png')}/>)
      }else if (item.index == 2) {
        return (<Image style={styles.ladderImage} source={require('../../../res/images/ic_topic_rank_second.png')}/>)
      }else if (item.index == 3) {
        return (<Image style={styles.ladderImage} source={require('../../../res/images/ic_topic_rank_third.png')}/>)
      }else {
         return (<Text style={styles.ladder}>{item.index}</Text>)
      }
    }

    return null
  }

  render() {
    let item = this.props.data
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={() => Actions.jump(SCENE_TOPICDETAILE, { item: item })}
      >
        { this._renderIndexItem(item) }
        <Image style={styles.avatar} source={{ uri: item.squarePicture.thumbnailUrl }}/>
        <View style={styles.textBox}>
          <TextPingFang style={styles.nick_name}>{item.content && item.content.length ? item.content : '赶紧加入我们吧'}</TextPingFang>
          <TextPingFang style={styles.subtitle}>{item.subscribersCount}人关注</TextPingFang>
        </View>
        <View style={{flex: 2}}/>
        <TouchableOpacity>
          <Text style={styles.arrow}>+</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 4,
  },
  textBox: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  nick_name: {
    fontSize: 16,
  },
  subtitle: {
    color: '#808080',
    marginTop: 5,
  },
  arrow: {
    height: 25,
    width: 45,
    color: '#fff',
    fontSize: 24,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderRadius: 4,
    lineHeight: 25,
    textAlign: 'center',
    backgroundColor: '#1eaff1',
  },
  ladder: {
    width: 30,
    height: 30,
    fontSize: 16,
    marginRight: 10,
    marginLeft: -10,
    lineHeight: 30,
    textAlign: 'center',
  },
  ladderImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginLeft: -10,
  }
})
