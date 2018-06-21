import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { QRScannerView } from '../../components/ac-qrcode'
import Container from '../../components/Container'
import CommonNav from '../../components/CommonNav'

export default class QRScan extends Component {
  constructor() {
    super()
  }

  barcodeReceived(e) {

  }

  _renderTitleBar() {
    return (
      <CommonNav
        title={'扫一扫'}
        navStyle={{ height: 64, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        navBarStyle={{ backgroundColor: 'transparent', marginTop: 20 }}
        leftbtnStyle={{ tintColor: '#fff'}}
        titleStyle={{ color: '#fff'}}
        showBottomLine={false}
      />
    )
  }

  _renderMenu() {
    return (
      <Text style={{ color: 'yellow', textAlign: 'center', alignSelf: 'center' }}>
        {'电脑端登录 web.okjike.com\n抢先体验即刻网页版'}
      </Text>
    )
  }

  render() {
    return (
      <Container hidePadding={true} barStyle={'light-content'}>
        <QRScannerView
          onScanResultReceived={this.barcodeReceived.bind(this)}
          renderTopBarView={() => this._renderTitleBar()}
          hintText={'将二维码对准至框内，即可自动扫描'}
          hintTextStyle={{ fontSize: 12, color: '#fff' }}
          renderBottomMenuView={() => this._renderMenu()}
        />
      </Container>
    );
  }
}
