import React, { Component } from 'react'
import {
  View,
  Image,
  TextInput,
  StyleSheet
} from 'react-native'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <View style={[styles.searchBar, this.props.style]}>
        <Image style={styles.searchIcon} source={require('../../res/images/ic_navbar_search.png')} />
        <TextInput style={styles.searchBox} placeholder={this.props.placeholder}></TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#efeff4',
    borderRadius: 6,
    paddingRight: 10,
    paddingLeft: 10,
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
  searchBox: {
    flex: 2,
    marginLeft: 8,
    overflow: 'hidden',
  }
})
