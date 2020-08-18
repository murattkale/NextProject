import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import {CameraKitCameraScreen} from 'react-native-camera-kit';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import Storage from '../components/Storage';

import HeaderWidget from '../widget/Header';
import FooterWidget from '../widget/Footer';

export default class Camera extends React.Component {
  // state = {isPermitted: false};
  constructor(props) {
    super(props);
    this.state = {
      QR_Code_Value: '',
      isPermitted: false,
      sube: props.sube,
    };

    // this.scanComplate('8682397560460', 'Ada');
    // this.scanComplate('V.040762', 'Ada');
    // return;
    // this.setState({isPermitted: true});
  }

  componentDidMount() {
    this.onPress(this);
  }

  onPress() {
    var that = this;
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'CameraExample App Camera Permission',
              message: 'CameraExample App needs access to your camera ',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            //Calling the WRITE_EXTERNAL_STORAGE permission function
            requestExternalWritePermission();
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      async function requestExternalWritePermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'CameraExample App External Storage Write Permission',
              message:
                'CameraExample App needs access to Storage data in your SD Card ',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If WRITE_EXTERNAL_STORAGE Permission is granted
            //Calling the READ_EXTERNAL_STORAGE permission function
            requestExternalReadPermission();
          } else {
            alert('WRITE_EXTERNAL_STORAGE permission denied');
          }
        } catch (err) {
          alert('Write permission err', err);
          console.warn(err);
        }
      }
      async function requestExternalReadPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'CameraExample App Read Storage Read Permission',
              message: 'CameraExample App needs access to your SD Card ',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If READ_EXTERNAL_STORAGE Permission is granted
            //changing the state to re-render and open the camera
            //in place of activity indicator
            that.setState({isPermitted: true});
          } else {
            alert('READ_EXTERNAL_STORAGE permission denied');
          }
        } catch (err) {
          alert('Read permission err', err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    } else {
      this.setState({isPermitted: true});
    }
  }

  openLink_in_browser = () => {
    Linking.openURL(this.state.QR_Code_Value);
  };

  async onQR_Code_Scan_Done(QR_Code) {
    this.setState({QR_Code_Value: QR_Code});

    if (this.state.isPermitted) {
      this.scanComplate(QR_Code, this.state.sube);
    }
  }

  scanComplate(malzeme_barkod, sube) {
    var that = this;
    that.setState({isPermitted: false});
    console.log('Şube: ' + sube);
    console.log('Barcode: ' + malzeme_barkod);

    var api =
      this.props.getApiUrl() +
      '/api/Urun/Search?aranan_kelime=' +
      malzeme_barkod +
      '&user=Admin&SubeKodu=' +
      sube +
      '&Liste_Turu=3';
    console.log(api);
    axios
      .get(api)
      .then(function (response) {
        console.log('api: ' + api + '\n' + JSON.stringify(response));
        response = response.data;
        if (response.ResultType.RType == 2) {
          alert(response.ResultType.MessageList[0]);
          return;
        }
        if (response != null && response.ResultList.length > 0) {
          that.setState({isPermitted: false});
          Actions.ProductList({
            malzeme_barkod: malzeme_barkod,
            sube: sube,
            items: response.ResultList,
          });
        } else {
          that.setState({isPermitted: true});
          alert('Barkodunu okuttuğunuz ürün sistemde mevcut değildir');
        }
      })
      .catch(function (error) {
        alert('Lütfen internet bağlantınızı kontrol ediniz.');
      });
  }

  render() {
    if (this.state.isPermitted) {
      return (
        <View style={{flex: 1}}>
          <HeaderWidget {...this.props} toggleBack title={'Barcode'} />
          <CameraKitCameraScreen
            // onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}

            showFrame={true}
            scanBarcode={true}
            laserColor={'#FF3D00'}
            frameColor={'#00C853'}
            colorForScannerFrame={'black'}
            hideControls={false}
            offsetForScannerFrame={10} //(default 30) optional, offset from left and right side of the screen
            heightForScannerFrame={300} //(default 200) optional, change height of the scanner frame
            onReadCode={(event) =>
              this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
            }
          />
        </View>
      );
    } else {
      return (
        <>
          <View style={{flex: 1}}>
            <HeaderWidget {...this.props} toggleBack title={'Barcode'} />
            <CameraKitCameraScreen
              // onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}

              showFrame={true}
              scanBarcode={true}
              laserColor={'#FF3D00'}
              frameColor={'#00C853'}
              colorForScannerFrame={'black'}
              hideControls={false}
              offsetForScannerFrame={10} //(default 30) optional, offset from left and right side of the screen
              heightForScannerFrame={300} //(default 200) optional, change height of the scanner frame
              onReadCode={(event) =>
                this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
              }
            />
          </View>
        </>
      );
    }
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  QR_text: {
    color: '#000',
    fontSize: 19,
    padding: 8,
    marginTop: 12,
  },
  button: {
    backgroundColor: '#2979FF',
    alignItems: 'center',
    padding: 12,
    width: 300,
    marginTop: 14,
  },
});
