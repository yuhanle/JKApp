import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import PropTypes from 'prop-types'
import {
  WIDTH
} from '../common/styles'

export default class SeperatorLine extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    backgroundColor: PropTypes.string,
  }
  static defaultProps = {
    height: 1,
    width: WIDTH,
    backgroundColor: '#eee',
  }

  render() {
    return (
      <View style={[styles.line, this.props.style, {height: this.props.height, width: this.props.width, backgroundColor: this.props.backgroundColor}]}></View>
    )
  }
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: '#eee',
  }
})
