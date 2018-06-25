import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {
  HEIGHT,
  WIDTH,
  getResponsiveHeight,
  getResponsiveWidth
} from '../../common/styles'
import PropTypes from 'prop-types'
import CommonNav from '../../components/CommonNav';
import Container from '../../components/Container';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

export default class NewTopic extends Component {
  static propTypes = {
    item: PropTypes.object
  }

  constructor() {
    super()

  }

  renderNavBar() {
    return (
      <CommonNav
        title={'创建主题'}
        titleStyle={{color: '#fff'}}
        showBottomLine={false}
        navStyle={{marginTop: 20}}
        leftbtnStyle={{tintColor: '#fff'}}
        navBarStyle={{backgroundColor: 'transparent'}}
      />
    )
  }

  renderBg() {
    return (
      <View style={styles.bg}>
        <LinearGradient
          colors={['#3d504f', '#465845']}
          locations={[0, 1]}
          style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
        >
        </LinearGradient>
        <Image style={styles.bgImage} source={require('../../../res/images/illustration_custom_topic_edit_bg.png')} />
        <Image style={styles.bgShadow} source={require('../../../res/images/illustration_robot_shadow.png')} />
        <Image style={styles.bgRobot} source={require('../../../res/images/illustration_all_robot.png')} />
      </View>
    )
  }

  renderContent() {
    return (
      <View style={styles.contentBox}>
        <Text style={styles.clickText}>{'点击下面的按钮\n开始创建主题'}</Text>
        <TouchableOpacity style={styles.addBtnBox}>
          <Image style={styles.addBtnAdd} source={require('../../../res/images/ic_common_subscribe_follow.png')} />
          <Text style={styles.addBtnTitle}>添加一个追踪对象</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <Container
        barStyle={"light-content"}
        hidePadding={true}
      >
        {this.renderNavBar()}
        {this.renderBg()}
        {this.renderContent()}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bgImage: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    width: WIDTH - 40,
    marginLeft: "auto",
    marginRight: "auto",
  },
  bgRobot: {
    position: 'absolute',
    right: 20,
    bottom: 25,
    width: WIDTH - 40,
    marginLeft: "auto",
    marginRight: "auto",
  },
  bgShadow: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: WIDTH - 40,
    marginLeft: "auto",
    marginRight: "auto",
  },
  contentBox: {
    width: '100%',
    flexDirection: 'column',
  },
  clickText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 60,
    marginLeft: 20,
    lineHeight: 50,
  },
  addBtnBox: {
    backgroundColor: '#1eaaf1',
    borderRadius: 50,
    padding: 20,
    marginTop: 20,
    marginLeft: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addBtnAdd: {
    height: 15,
    width: 15,
  },
  addBtnTitle: {
    marginLeft: 5,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  }
})
