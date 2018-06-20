// 即刻小报
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
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

export default class Dailies extends Component {
  constructor() {
    super()

    this.state = {
      data: {
        picture: 'https://cdn.ruguoapp.com/FpB0X8iDGj0VPl7cm77tHEpkERP_.jpg',
        title: '',
      }
    }
  }

  async componentDidMount() {
    this._featchData()
  }

  async _featchData() {
    const res = await HttpUtils.get(FEED.dailies)
    if (res.data == null) {
      return
    }

    this.setState({
      data: res.data
    })
  }

  renderNavBar() {
    return <CommonNav
      showBottomLine={false}
      navStyle={{marginTop: 20}}
      leftbtnStyle={{tintColor: '#fff'}}
      navBarStyle={{backgroundColor: 'transparent'}}
      rightButton={
        <TouchableOpacity
          style={{width: getResponsiveWidth(24)}}
        >
          <Image style={{tintColor: '#fff'}} source={require('../../../res/images/ic_navbar_pip.png')} />
        </TouchableOpacity>
      }
    />
  }

  renderContent() {
    return <Topic />
  }

  renderSubView() {
    let item = this.state.data
    return (
      <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
        <Text style={{ fontSize: 24, color: '#fff', marginBottom: 5 }}>{item.title}</Text>
        <Text style={{ color: '#fff' }}>即刻小报 {'2018.06.04'}</Text>
      </View>
    )
  }

  render() {
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
          backgroundImage={{uri: this.state.data.picture}}
          backgroundImageScale={1.2}
          renderNavBar={this.renderNavBar}
          renderContent={this.renderContent}
          renderSubView={this.renderSubView.bind(this)}
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
    color: '#fff',
  },
});
