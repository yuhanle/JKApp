// 即刻小报
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Animated,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {
  HEIGHT,
  WIDTH,
  getResponsiveHeight,
  getResponsiveWidth
} from '../../common/styles'
import ReactNativeParallaxHeader from '../../components/ParallaxHeader';
import Container from '../../components/Container';
import CommonNav from '../../components/CommonNav';
import Topic from './Topic';
import HttpUtils from '../../network/HttpUtils'
import { FEED } from '../../network/Urls'
import SharePopup from '../../components/SharePopup'
import { CachedImage } from "react-native-img-cache"
import { Actions } from 'react-native-router-flux'
import { SCENE_DAILIES } from '../../constants/scene'

export default class DailiesHis extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
    }
  }

  async componentDidMount() {
    this._featchData()
  }

  async _featchData() {
    const res = await HttpUtils.getJK(FEED.dailiesList)
    if (res.data == null) {
      return
    }

    var index = 1
    res.data.forEach((item) => {
      item.key = item.id
      item.index = index
      index++
    })
    this.setState({
      data: res.data
    })
  }

  _renderItem({ item }) {
    var date = new Date(item.date)
    return (
      <TouchableOpacity style={styles.itemBox} activeOpacity={0.6} onPress={() => {
        Actions.jump(SCENE_DAILIES, { id: item.id })
      }}>
        <CachedImage style={styles.itemImage} source={{ uri: item.picture }} />
        <View style={styles.itemMask}></View>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDate}>{date.toDateString()}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <Container style={styles.container}>
        <CommonNav title={'往期小报'}/>
        <FlatList
          ref={ref => this.fvl = ref}
          data={this.state.data}
          extraData={this.state}
          renderItem={this._renderItem.bind(this)}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  itemBox: {
    width: WIDTH,
    height: WIDTH/2.0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  itemTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemDate: {
    position: 'absolute',
    top: 10,
    right: 20,
    color: '#fff',
    fontSize: 14,
  },
  itemMask: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  }
});
