import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  WebView
} from 'react-native'

import {
  WIDTH,
} from '../../common/styles'

import Container from '../../components/Container'
import CommonNav from '../../components/CommonNav'
import PropTypes from 'prop-types'

var WEBVIEW_REF = 'webview';
export default class Web extends Component {
  static props = {
    url: PropTypes.string,
  }

  static defaultProps = {
    url: 'https://m.ruguoapp.com/'
  }

  constructor() {
    super()

    this.state = {
      title: '即刻APP'
    }
  }

  render() {
    return (
      <Container>
        <CommonNav
          title={this.state.title}
          rightButton={
            <TouchableOpacity onPress={() => {
              console.log('是不是要分享网页呢');
            }}>
              <Image source={require('../../../res/images/ic_navbar_share.png')} />
            </TouchableOpacity>
          }
        />
        <WebView
          ref={WEBVIEW_REF}
          style={styles.web_container}
          source={{ uri: this.props.url }}
          onNavigationStateChange={(event) => {
            console.log(event)
            this.setState({
              title: event.title
            })
          }}
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  web_container: {
    width: WIDTH
  }
})
