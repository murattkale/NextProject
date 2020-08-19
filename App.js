import React from 'react';
import Root from './src/components/Root';
import Storage from './src/components/Storage';
import {StyleSheet, Modal, ActivityIndicator, View, Text} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';

import SideBar from './src/widget/SideBar';
import {Container, Content} from 'native-base';

import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

//import Login from './src/views/Login';
// import Detail from './src/views/Detail';
// import ProductList from './src/views/ProductList';
// import Camera from './src/views/Camera';
// import Dashboard from './src/views/Dashboard';
// import Sube from './src/views/Sube';
// import SearchList from './src/views/SearchList';

// import Spinner from 'react-native-loading-spinner-overlay';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingVisible: false,
      isLogined: false,
      // ApiUrl: 'http://localhost:51246/',
      ApiUrl: 'http://next.zirhlioglugida.com.tr:8084',
      // ApiUrl: 'http://176.236.208.102:8084',
    };
  }

  getApiUrl() {
    return this.state?.ApiUrl;
  }

  LoadingShowHide = (deger) => {
    this.setState({
      loadingVisible: deger,
    });
  };

  async componentDidMount() {}

  login = () => {
    this.setState({isLogined: true});
  };

  logout = async () => {
    await Storage.del('user');
    this.setState({isLogined: false});
  };

  formatMoney(str, decPlaces, thouSeparator, decSeparator) {
    var n = str,
      decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces,
      decSeparator = decSeparator == undefined ? '.' : decSeparator,
      thouSeparator = thouSeparator == undefined ? ',' : thouSeparator,
      sign = n < 0 ? '-' : '',
      i = parseInt((n = Math.abs(+n || 0).toFixed(decPlaces))) + '',
      j = (j = i.length) > 3 ? j % 3 : 0;
    return (
      sign +
      (j ? i.substr(0, j) + thouSeparator : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thouSeparator) +
      (decPlaces
        ? decSeparator +
          Math.abs(n - i)
            .toFixed(decPlaces)
            .slice(2)
        : '')
    );
  }

  render() {
    return (
      <>
        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.loadingVisible}
          // style={{zIndex: 1100}}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View style={styles1.modalBackground}>
            <View style={styles1.activityIndicatorWrapper}>
              <ActivityIndicator animating={this.state.loadingVisible} />
            </View>
          </View>
        </Modal>

        <Root
          formatMoney={this.formatMoney.bind(this)}
          logout={this.logout.bind(this)}
          LoadingShowHide={this.LoadingShowHide.bind(this)}
          getApiUrl={this.getApiUrl.bind(this)}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

const styles1 = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
