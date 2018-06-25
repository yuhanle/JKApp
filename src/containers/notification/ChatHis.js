import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Container from '../../components/Container'
import CommonNav from '../../components/CommonNav'

export default class ChatHis extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      isRefreshing: false
    }
  }

  async _fetchItem() {

  }

  _renderItem({ item }) {
    return <View />
  }

  _emptyDiary() {
    return (
      <View style={styles.emptyBox}>
        <Image style={styles.emptyImage} source={require('../../../res/images/placeholder_no_follower.png')} />
        <Text style={styles.emptyText}>暂时没有聊天消息哦</Text>
        <TouchableOpacity style={styles.emptyBtnBox}>
          <Text style={styles.emptyBtnText}>去发现有趣的即友</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <Container>
        <CommonNav title={'聊天'}/>
        <FlatList
          ref={ref => this.fhl = ref}
          style={styles.msgBox}
          data={this.state.data}
          extraData={this.state}
          renderItem={this._renderItem}
          ListEmptyComponent={() => this._emptyDiary()}
          onRefresh={() => this._fetchItem()}
          refreshing={this.state.isRefreshing}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  emptyBox: {
    marginTop: 150,
    justifyContent: 'center',
    alignContent: 'center',
  },
  emptyImage: {
    alignSelf: 'center',
  },
  emptyText: {
    color: '#848484',
    fontSize: 14,
    margin: 20,
  },
  emptyBtnBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#404040',
    padding: 10,
  },
  emptyBtnText: {
    color: '#404040',
    fontSize: 14,
    textAlign: 'center',
  },

})
