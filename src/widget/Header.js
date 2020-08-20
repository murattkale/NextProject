import React, {Component} from 'react';
import {
  Alert,
  StatusBar,
  Keyboard,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Input,
  Item,
} from 'native-base';

import {
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  BackHandler,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';

import OptionsMenu from 'react-native-options-menu';

import axios from 'axios';

import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default class HeaderWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      loadingVisible: false,
      sube: props.sube,
      toggleMenu: this.props.toggleMenu,
      toggleBack: this.props.toggleBack,
      treeDot: this.props.treeDot,
      toggleBackSearch: this.props.toggleBackSearch,
      title: this.props.title,
      search: '',
      Liste_Turu: 1,
      malzeme_kodu: this.props.malzeme_kodu,

      inputHide: false,
      IsSearch: false,
      active: false,
    };
  }

  LoadingShowHide = (deger) => {
    this.setState({
      loadingVisible: deger,
    });
  };

  // componentDidMount() {
  //   console.log(this.state.item?.malzeme_kodu);
  // }
  _getButton() {
    if (this.state.toggleBack) {
      return (
        <Button onPress={() => Actions.pop()} transparent>
          <Icon type="MaterialIcons" name="arrow-back" />
        </Button>
      );
    } else if (this.state.toggleMenu) {
      return (
        <Button onPress={() => Actions.drawerOpen()} transparent>
          <Icon type="Entypo" name="menu" />
        </Button>
      );
    }
  }

  logoutControl() {
    Alert.alert(
      'Çıkış yapmak üzeresiniz!',
      'Çıkış yapmak istediğinizden eminmisiniz ?',
      [
        {
          text: 'İptal',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Tamam', onPress: () => this.props.logout()},
      ],
      {cancelable: false},
    );
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    //this.props.navigation.goBack(null);
    // BackHandler.exitApp();
    this.setState({inputHide: false});
    this.setState({IsSearch: false});
    // return true;
  }

  setStateInput() {
    this.setState({inputHide: !this.state.inputHide});
  }

  setSearch() {
    this.setState({inputHide: true});

    if (this.state.search != '' && this.state.search.length >= 3) {
      this.LoadingShowHide(true);
      //
      var api2 =
        this.props.getApiUrl() +
        '/api/Urun/Search?aranan_kelime=' +
        this.state.search +
        '&user=Admin&SubeKodu=' +
        this.state.sube +
        '&Liste_Turu=' +
        1;

      console.log(api2);
      axios
        .get(api2)
        .then((response) => {
          response = response.data;
          this.LoadingShowHide(false);
          if (response != null && response.ResultList.length > 0) {
            console.log('api: ' + api2 + '\n' + JSON.stringify(response));
            Actions.SearchList({
              sube: this.state.sube,
              items: response.ResultList,
            });
          } else {
            this.setState({inputHide: true});

            alert('Arama yaptığınız ürün sistemde mevcut değildir');
          }
        })
        .catch(function (error) {
          alert('Lütfen internet bağlantınızı kontrol ediniz.');
          this.LoadingShowHide(false);
          // alert(JSON.stringify(error));
          // if (error.response) {
          //   console.log(error.response.data);
          //   console.log(error.response.status);
          //   console.log(error.response.headers);
          // } else if (error.request) {
          //   console.log(error.request);
          // } else {
          //   console.log('Error', error.message);
          // }
        });
    } else {
      // if (!this.state.IsSearch) {
      //   this.setState({IsSearch: true});
      // } else {
      //   this.setState({IsSearch: false});
      //   alert('Lütfen arama yapmak istediğiniz kelimeyi giriniz.');
      // }
    }
  }

  setValue = (value) => {
    this.setState({search: value});
  };

  setSearchMore() {
    this.setState({inputHide: false});

    if (this.state.malzeme_kodu != '') {
      //
      var api2 =
        this.props.getApiUrl() +
        '/api/Urun/Search?aranan_kelime=' +
        this.state.malzeme_kodu +
        '&user=Admin&SubeKodu=' +
        this.state.sube +
        '&Liste_Turu=' +
        9;

      console.log(api2);
      axios
        .get(api2)
        .then((response) => {
          response = response.data;
          if (response != null && response.ResultList.length > 0) {
            console.log('api: ' + api2 + '\n' + JSON.stringify(response));
            Actions.SearchList({
              sube: this.state.sube,
              items: response.ResultList,
            });
          }
        })
        .catch(function (error) {
          alert('Lütfen internet bağlantınızı kontrol ediniz.');
        });
    } else {
      // if (!this.state.IsSearch) {
      //   this.setState({IsSearch: true});
      // } else {
      //   this.setState({IsSearch: false});
      //   alert('Lütfen arama yapmak istediğiniz kelimeyi giriniz.');
      // }
    }
  }

  click_print() {
    this.LoadingShowHide(true);
    alert('print click');
    this.LoadingShowHide(false);

    var api2 =
      this.props.getApiUrl() +
      '/api/Urun/mob_okutulan_malzeme_etiket_basimi?sube=' +
      this.state.sube +
      '&malzeme_kodu=' +
      this.state.malzeme_kodu;

    console.log(api2);

    return;

    axios
      .get(api2)
      .then((response) => {
        this.LoadingShowHide(false);
        response = response.data;
        if (response != null && response.ResultList.length > 0) {
          console.log(JSON.parse(response));
          alert('Etiket basım onayına gönderildi.');
        } else {
          alert(
            'Etiket basımında beklenmeyen bir hata oluştu. Lütfen yetkililere bildiriniz.',
          );
        }
      })
      .catch(function (error) {
        alert('Lütfen internet bağlantınızı kontrol ediniz.');
      });
  }

  click_list() {
    // this.setSearchMore();
  }

  _getRMenu() {
    if (this.state.treeDot) {
      return (
        <View style={{marginLeft: 10, marginTop: -5}}>
          <MenuContext style={{position: 'relative', top: 20}}>
            <View style={{width: 50}}>
              <Menu style={{}}>
                <MenuTrigger
                  text={
                    <Icon
                      style={{
                        color: 'white',
                      }}
                      // onPress={() => this.setSearchMore()}
                      type="MaterialIcons"
                      name="more-vert"
                    />
                  }
                />
                <MenuOptions style={{}}>
                  <MenuOption
                    onSelect={() => this.click_print()}
                    text="Print"
                  />
                  <MenuOption onSelect={() => this.click_list()} text="List" />
                </MenuOptions>
              </Menu>
            </View>
          </MenuContext>
        </View>

        // <OptionsMenu
        //   customButton={
        //     <Icon
        //       style={{
        //         color: 'white',
        //         position: 'relative',
        //         top: -12,
        //         left: -5,
        //       }}
        //       type="MaterialIcons"
        //       name="more-vert"
        //     />
        //   }
        //   destructiveIndex={1}
        //   options={['Print', 'List']}
        //   actions={[this.click_print, this.click_list]}
        // />

        // <Icon
        //   style={{
        //     color: 'white',
        //     position: 'relative',
        //     top: -8,
        //     left: -5,
        //   }}
        //   onPress={() => this.setSearchMore()}
        //   type="MaterialIcons"
        //   name="more-vert"
        // />
      );
    }
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
        <Header
          // style={{backgroundColor: '#2357eb'}}
          searchBar
          rounded
          autoCorrect={false}>
          <Left style={{flex: 0.3}}>{this._getButton()}</Left>
          <Body style={{flex: 0.8, borderBottomColor: '#2357eb'}}>
            {!this.state.inputHide && <Title>{this.state.title}</Title>}

            <Item style={{borderBottomColor: '#2357eb'}}>
              {this.state.inputHide && (
                <Input
                  // onFocus={() => this.setStateInput()}
                  keyboardType="web-search"
                  onBlur={() => this.setStateInput()}
                  ref={this.inputRef}
                  autoFocus={true}
                  style={{
                    color: 'black',
                    backgroundColor: 'white',
                    opacity: 0.6,
                    borderRadius: 5,
                    borderBottomColor: '#2357eb',
                    marginTop: 5,
                    maxHeight: 40,
                  }}
                  onChangeText={this.setValue.bind(this)}
                  returnKeyType="next"
                  onSubmitEditing={(event) => this.setSearch()}
                  placeholderTextColor="#ccc"
                  placeholder="Barkod minimum 6 karakter"
                />
              )}
            </Item>
          </Body>
          <Right style={{flex: 0}}>
            <Button style={{marginRight: 0, top: -5}} transparent>
              <Icon
                active
                name="search"
                type="FontAwesome"
                onPress={() => this.setSearch()}
              />
            </Button>
            {this._getRMenu()}
          </Right>
        </Header>
      </>
    );
  }
}

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
