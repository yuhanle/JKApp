import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  DeviceEventEmitter
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { connect } from 'react-redux'

import Home from './home/Home'
import Notification from './notification/Notification'
import Search from './search/Search'
import Profile from './profile/Profile'

function mapStateToProps(state) {
  return {
    user: state.user,
    partner: state.partner
  }
}

@connect(mapStateToProps)
export default class Index extends Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	selectedTab: 'home',
	  	unread: this.props.user.unread
	  };
	}

	componentWillMount() {

	}

	componentDidMount() {

	}

	icons = {
    home: {
      default: (
        <Image source={require('../../res/images/ic_tabbar_home_unselected.png')}/>
      ),
      selected: <Image source={require('../../res/images/ic_tabbar_home_selected.png')}/>
    },
    notification: {
      default: (
        <Image source={require('../../res/images/ic_tabbar_activity_unselected.png')}/>
      ),
      selected: (
        <Image source={require('../../res/images/ic_tabbar_activity_selected.png')}/>
      )
    },
    search: {
      default: (
        <Image source={require('../../res/images/ic_tabbar_discovery_unselected.png')}/>
      ),
      selected: <Image source={require('../../res/images/ic_tabbar_discovery_selected.png')}/>
    },
    profile: {
      default: (
        <Image source={require('../../res/images/ic_tabbar_personal_unselected.png')}/>
      ),
      selected: <Image source={require('../../res/images/ic_tabbar_personal_selected.png')}/>
    }
  }

	render() {
		return (
			<View style={styles.tabs_container}>
        <TabNavigator tabBarStyle={styles.tabbar}>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title='首页'
            titleStyle={styles.text_title}
            selectedTitleStyle={styles.text_title_selected}
            renderIcon={() => this.icons.home.default}
            renderSelectedIcon={() => this.icons.home.selected}
            onPress={() => this.setState({ selectedTab: 'home' })}
          >
            <Home />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'notification'}
            title='动态'
            titleStyle={styles.text_title}
            badgeText={this.state.unread}
            selectedTitleStyle={styles.text_title_selected}
            renderIcon={() => this.icons.notification.default}
            renderSelectedIcon={() => this.icons.notification.selected}
            onPress={() => {
              // JPushModule.clearAllNotifications()
              this.setState({ selectedTab: 'notification', unread: 0 })
            }}
          >
            <Notification />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'search'}
            title='发现'
            titleStyle={styles.text_title}
            selectedTitleStyle={styles.text_title_selected}
            renderIcon={() => this.icons.search.default}
            renderSelectedIcon={() => this.icons.search.selected}
            onPress={() => this.setState({ selectedTab: 'search' })}
          >
            <Search />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            title='我的'
            titleStyle={styles.text_title}
            selectedTitleStyle={styles.text_title_selected}
            renderIcon={() => this.icons.profile.default}
            renderSelectedIcon={() => this.icons.profile.selected}
            onPress={() => this.setState({ selectedTab: 'profile' })}
          >
            <Profile />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
			)
	}
}

const styles = StyleSheet.create({
  tabs_container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: 'rgba(255,255,255,.95)',
    ...ifIphoneX({
      height: 84,
      paddingBottom: 34
    })
  },
  text_title: {
    color: '#aaa',
    fontSize: 10
  },
  text_title_selected: {
    color: '#444',
    fontSize: 10
  },
})
