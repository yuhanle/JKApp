import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { PropTypes } from 'prop-types'
import TextPingFang from './TextPingFang'
import { WIDTH, getResponsiveWidth } from '../common/styles'
import SeperatorLine from './SeperatorLine'

const NAVBAR_HEIGHT = 44
const STATUS_BAR_HEIGHT = 20

const StatusBarShape = {
  backgroundColor: PropTypes.string,
  barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
  hidden: PropTypes.bool
}

export default class NavBar extends Component {
  static propTypes = {
    title: PropTypes.string,
    titleView: PropTypes.element,
    hide: PropTypes.bool,
    leftButton: PropTypes.element,
    rightButton: PropTypes.element,
    statusBar: PropTypes.shape(StatusBarShape),
    showBottomLine: PropTypes.bool
  }

  static defaultProps = {
    statusBar: {
      hidden: false,
    },
    showBottomLine: true,
  }

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      hide: false
    }
  }

  render() {
    let titleView = this.props.titleView
      ? this.props.titleView
      : <Text style={[styles.title, this.props.titleStyle]}>
        {this.props.title}
      </Text>
    return (
      <View style={[styles.container, this.props.navStyle]}>
        <View style={[styles.navBar, this.props.navBarStyle]}>
          {this.props.leftButton}
          <View style={[styles.titleViewContainer, this.props.titleViewStyle]}>
            {titleView}
          </View>
          {this.props.rightButton}
        </View>
        <SeperatorLine style={{opacity: this.props.showBottomLine == true ? 1.0 : 0.0}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  navBar: {
    width: WIDTH,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: getResponsiveWidth(24),
    paddingRight: getResponsiveWidth(24),
    backgroundColor: '#fff'
  },
  titleViewContainer: {
    flex: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center'
  },
})
