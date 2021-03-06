/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import Index from './containers/Index'
import Web from './containers/common/Web'
import TopicDetail from './containers/search/TopicDetail'
import Ladder from './containers/search/Ladder'
import Dailies from './containers/search/Dailies'
import DailiesHis from './containers/search/DailiesHis'
import QRScan from './containers/search/QRScan'
import ChatHis from './containers/notification/ChatHis'
import NewDong from './containers/notification/NewDong'
import NewTopic from './containers/search/NewTopic'

import { Scene, Router, ActionConst } from 'react-native-router-flux'
import * as scenes from './constants/scene'
import { Provider } from 'react-redux'
import store from './redux/store'

import { isDev } from './common/util'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key='root' hideNavBar>
            <Scene
              initial
              key={scenes.SCENE_INDEX}
              component={Index}
              type={ActionConst.REPLACE}
              duration={0}
            />
            <Scene
              key={scenes.SCENE_WEB}
              component={Web}
            />
            <Scene
              key={scenes.SCENE_TOPICDETAILE}
              component={TopicDetail}
            />
            <Scene
              key={scenes.SCENE_LADDER}
              component={Ladder}
            />
            <Scene
              key={scenes.SCENE_DAILIES}
              component={Dailies}
            />
            <Scene
              key={scenes.SCENE_DAILIESHIS}
              component={DailiesHis}
            />
            <Scene
              key={scenes.SCENE_QRSCAN}
              component={QRScan}
            />
            <Scene
              key={scenes.SCENE_CHATHIS}
              component={ChatHis}
            />
            <Scene
              key={scenes.SCENE_NEWDONG}
              component={NewDong}
            />
            <Scene
              key={scenes.SCENE_NEWTOPIC}
              component={NewTopic}
            />
          </Scene>
        </Router>
      </Provider>
    )
  }
}

if (isDev) {
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest
  global.FormData = global.originalFormData
    ? global.originalFormData
    : global.FormData
}

console.disableYellowBox = true

/**
 * RN-BUGS
 * 在Debug环境下console.dir有效，
 * 生产环境下console.dir为undefined。所以需要打个补丁
 * 以下补丁同理
 */
if (!(console.dir instanceof Function)) {
  console.dir = console.log
}

if (!(console.time instanceof Function)) {
  console.time = console.log
}

if (!(console.timeEnd instanceof Function)) {
  console.timeEnd = console.log
}

if (!global.URL) {
  global.URL = function() {}
}
