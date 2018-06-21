import React, { Component } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { CachedImage } from "react-native-img-cache"
import PropTypes from 'prop-types'

export default class ImageView extends Component {
  static props = {
    source: PropTypes.object.isRequired,
    images: [],
  }

  static defaultProps = {
    index: 0,
    images: [],
  }

  constructor() {
    super()

    this.state = {
      index: 0,
      images: [],
      isImageViewVisible: false,
    }
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity onPress={() => this.setState({ isImageViewVisible: true }) }>
          <CachedImage
            style={styles.image}
            source={this.props.source}
          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          visible={this.state.isImageViewVisible}
          transparent={true}
          onRequestClose={() => this.setState({ isImageViewVisible: false })}
        >
          <ImageViewer
            imageUrls={this.props.images}
            index={this.props.index}
            onSwipeDown={() => {
              this.setState({ isImageViewVisible: false })
            }}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  image: {
    width: '100%',
    height: '100%',
  }
})
