// 即刻小报
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
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
} from '../../common/styles';
import PropTypes from 'prop-types'
import ReactNativeParallaxHeader from '../../components/ParallaxHeader'
import Container from '../../components/Container'
import CommonNav from '../../components/CommonNav'
import HttpUtils from '../../network/HttpUtils'
import { FEED } from '../../network/Urls'
import SharePopup from '../../components/SharePopup'
import { Actions } from 'react-native-router-flux'
import { SCENE_DAILIESHIS, SCENE_WEB } from '../../constants/scene'
import { CachedImage } from "react-native-img-cache"
import SeperatorLine from '../../components/SeperatorLine'
import ImageView from '../../components/ImageView'

export default class Dailies extends Component {
  static propTypes = {
    id: PropTypes.string
  }

  static defaultProps = {
    id: ''
  }

  constructor() {
    super()

    this.state = {
      data: {},
      modalVisible: false,
    }
  }

  async componentDidMount() {
    this._featchData()
  }

  async _featchData() {
    const res = await HttpUtils.getJK(FEED.dailies, { id: this.props.id })
    if (res.data == null) {
      return
    }

    var index = 1
    res.data.messages.forEach((item) => {
      item.key = item.id
      item.index = index
      index++
    })

    this.setState({
      data: res.data
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

    return (
      <TouchableOpacity style={styles.itemBox} onPress={() => {
        if (item.linkUrl.indexOf('http') == 0) {
          Actions.jump(SCENE_WEB, { url: item.linkUrl })
        }else {
           console.log('暂不支持该链接')
        }
      }}>
        <View style={styles.itemIndexB}></View>
        <Text style={styles.itemIndex}>{item.index}</Text>
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
        <Text style={styles.itemContent}>{item.content}</Text>
        <Text style={styles.itemComments}>{item.comments}</Text>
        <Text style={styles.itemVia}>via {item.topic.content}</Text>
        <SeperatorLine />
      </TouchableOpacity>
    )
  }

  renderNavBar() {
    return <CommonNav
      showBottomLine={false}
      navStyle={{marginTop: 20}}
      leftbtnStyle={{tintColor: '#fff'}}
      navBarStyle={{backgroundColor: 'transparent'}}
      rightButton={
        this.props.id.length == 0 ? (
          <TouchableOpacity
            style={{width: getResponsiveWidth(24)}}
            onPress={() => {
              Actions.jump(SCENE_DAILIESHIS)
            }}
          >
            <Image style={{tintColor: '#fff'}} source={require('../../../res/images/ic_navbar_daily_history.png')} />
          </TouchableOpacity>
        ) : null
      }
    />
  }

  renderContent() {
    return (
      <FlatList
        ref={ref => this.fvl = ref}
        data={this.state.data.messages}
        extraData={this.state}
        renderItem={this._renderItem.bind(this)}
      />
    )
  }

  renderSubView() {
    let item = this.state.data
    var date = new Date(item.date)
    return (
      <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
        <Text style={{ fontSize: 24, color: '#fff', marginBottom: 5 }}>{item.title}</Text>
        <Text style={{ color: '#fff' }}>即刻小报 {date.toDateString()}</Text>
      </View>
    )
  }

  render() {
    let source = this.state.data.picture ? {uri: this.state.data.picture} : require('../../../res/images/placeholder_save_data_image.png')
    return (
      <Container
        hidePadding={true}
        style={styles.container}
        barStyle={"light-content"}
      >
        <ReactNativeParallaxHeader
          headerMinHeight={64}
          headerMaxHeight={400}
          extraScrollHeight={200}
          navbarColor={'#fff'}
          title={'即刻小报'}
          titleStyle={styles.titleStyle}
          backgroundImage={source}
          backgroundImageScale={1.2}
          renderNavBar={this.renderNavBar.bind(this)}
          renderContent={this.renderContent.bind(this)}
          renderSubView={this.renderSubView.bind(this)}
        />
        <TouchableOpacity style={styles.shareBox} onPress={() => {
          this.setState({ modalVisible: true })
        }}>
          <Image source={require('../../../res/images/ic_comment_share.png')}/>
          <Text style={styles.shareText}>分享</Text>
        </TouchableOpacity>
        <SharePopup
          modalVisible={this.state.modalVisible}
          cancelOnPress={() => {
            this.setState({ modalVisible: false })
          }}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  shareBox: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5,
    paddingLeft: 12,
    paddingRight: 12,
  },
  shareText: {
    color: '#fff',
    marginLeft: 5,
  },
  itemBox: {
    width: WIDTH,
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemIndex: {
    fontSize: 14,
    color: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    height: 24,
    width: 24,
    lineHeight: 24,
    textAlign: 'center',
    backgroundColor: '#000',
  },
  itemIndexB: {
    position: 'absolute',
    top: 14,
    left: 20,
    borderRadius: 12,
    overflow: 'hidden',
    height: 24,
    width: 24,
    backgroundColor: '#2e7fb9',
  },
  itemImage: {
    marginTop: 15,
    width: WIDTH - 40,
    height: (WIDTH - 40)/2.0,
  },
  itemContent: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 25,
  },
  itemComments: {
    marginTop: 10,
    fontSize: 12,
    color: '#939393',
    lineHeight: 18,
  },
  itemVia: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    color: '#2cb0ee',
  }
});
