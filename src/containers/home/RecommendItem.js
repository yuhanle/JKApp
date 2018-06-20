import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux'
import { SCENE_WEB } from '../../constants/scene'
import TextPingFang from '../../components/TextPingFang'

export default class RecommendItem extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  render() {
    let recommendItem = this.props.data
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => Actions.jump(SCENE_WEB, { url: recommendItem.url })}
        >
          <View style={styles.recoItemBox}>
            <Image style={styles.bg} source={{ uri: recommendItem.picUrl }} />
            {
              recommendItem.type == 'topic' ? <View style={styles.mask}></View> : null
            }
            <Text style={styles.title}>{recommendItem.title}</Text>
            {
              recommendItem.tag ? <Text style={styles.tag}>{recommendItem.tag}</Text> : null
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 84,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recoItemBox: {
    width: 72,
    height: 72,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
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
    borderRadius: 4,
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
  }
})
