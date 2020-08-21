import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from 'react-native';

import {
  Content,
  Item,
  Input,
  Button,
  Text,
  Body,
  ListItem,
  CheckBox,
  Card,
  CardItem,
  H1,
  H3,
  Container,
  Right,
  Label,
  Left,
  Picker,
} from 'native-base';
import color from '../assets/css/style';
const {width} = Dimensions.get('window');
import logo from '../assets/img/logo.png';
import phoneImage from '../assets/img/phoneImage.png';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';

import Storage from '../components/Storage';

import LinearGradient from 'react-native-linear-gradient';

// import NetInfo from '@react-native-community/netinfo';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remember: false,
      UserName: '',
      Password: '',
      loadingVisible: false,
    };

    // Subscribe
  }

  // CheckConnectivity() {
  //   // For Android devices
  //   if (Platform.OS === 'android') {
  //     NetInfo.isConnected.fetch().then((isConnected) => {
  //       if (isConnected) {
  //         alert('You are online!');
  //       } else {
  //         alert('You are offline!');
  //       }
  //     });
  //   } else {
  //     // For iOS devices
  //     NetInfo.isConnected.addEventListener(
  //       'connectionChange',
  //       this.handleFirstConnectivityChange,
  //     );
  //   }
  // }

  // handleFirstConnectivityChange = (isConnected) => {
  //   NetInfo.isConnected.removeEventListener(
  //     'connectionChange',
  //     this.handleFirstConnectivityChange,
  //   );

  //   if (isConnected === false) {
  //     alert('You are offline!');
  //   } else {
  //     alert('You are online!');
  //   }
  // };

  async componentDidMount() {
    // this.CheckConnectivity();
    var user = await Storage.get('user');
    if (user && user.Id > 0) {
      this.setState({isLogined: true});
      // alert(JSON.stringify(user));
      // alert(user.Username);
      this.setState({UserName: user.Username});
      //  Actions.Sube();
    }
  }

  LoadingShowHide = (deger) => {
    this.setState({
      loadingVisible: deger,
    });
  };

  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  async Login() {
    // this.CheckConnectivity();
    if (this.state.UserName == '' || this.state.Password == '') {
      alert('Lütfen kullanıcı adınızı ve şifrenizi giriniz.');
      return;
    }
    this.LoadingShowHide(true);

    var api =
      this.props.getApiUrl() +
      '/api/User/Login?username=' +
      this.state.UserName +
      '&password=' +
      this.state.Password;

    console.log(api);

    var getAxios = await axios.get(api).catch(function (error) {
      alert('Lütfen internet bağlantınızı kontrol ediniz.');
      this.LoadingShowHide(false);
    });
    this.LoadingShowHide(false);

    var result = await getAxios;
    console.log(JSON.stringify(result));
    result = result.data;

    // alert(JSON.stringify(result.user));
    if (result.user != null && result.user.Id > 0) {
      await Storage.set('user', result.user);
      Actions.Sube();
    } else {
      alert('Lütfen kullanıcı adı yada şifrenizi doğru giriniz');
    }
  }

  changeUsername = (value) => {
    this.setState({UserName: value});
  };

  changePassword = (value) => {
    this.setState({Password: value});
  };

  rememberCheck() {
    if (!this.state.remember) {
      this.setState({remember: true});
    } else this.setState({remember: false});
  }

  handleKeyDown(e) {
    alert(e.nativeEvent.key);
    if (e.nativeEvent.key == 'Enter') {
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
        <LinearGradient
          colors={['#5e72eb', '#120c6e']}
          style={styles.linearGradient}>
          <Content style={{padding: '3%'}}>
            <Card>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    resizeMode: 'contain',
                    height: 200,
                    flex: 1,
                  }}
                  source={logo}
                />
              </View>

              <CardItem>
                <Body>
                  <Text
                    style={{
                      textAlign: 'left',
                      fontSize: 37,
                    }}>
                    Giriş Yap
                  </Text>

                  <H3
                    note
                    style={{
                      fontSize: 18,
                      textAlign: 'left',
                      marginBottom: 10,
                      marginTop: 10,
                      color: '#ccc',
                    }}>
                    Giriş yapmak için Zırhlıoğlu emailin ve daha önce emaline
                    gönderdiğimiz şifreyi kullan.
                  </H3>
                  <Item regular style={{marginBottom: 5, marginTop: 5}}>
                    <Input
                      placeholder="Email"
                      placeholderTextColor="#000"
                      value={this.state.UserName}
                      onChangeText={this.changeUsername.bind(this)}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.secondTextInput._root.focus();
                      }}
                      blurOnSubmit={false}
                    />
                  </Item>
                  <Item regular style={{marginBottom: 5}}>
                    <Input
                      secureTextEntry={true}
                      placeholder="Şifre"
                      placeholderTextColor="#000"
                      value={this.state.Password}
                      onChangeText={this.changePassword.bind(this)}
                      returnKeyType="next"
                      onSubmitEditing={(event) => this.Login()}
                      ref={(input) => {
                        this.secondTextInput = input;
                      }}
                    />
                  </Item>
                  <ListItem>
                    <View style={{borderBottomColor: 'white'}}>
                      <Text
                        style={{
                          textDecorationLine: 'underline',
                          color: 'blue',
                          position: 'absolute',
                          right: 0,
                          bottom: -5,
                        }}
                        onPress={() => console.log('Şifremi unuttum')}>
                        Şifremi unuttum
                      </Text>
                    </View>
                  </ListItem>

                  <Button
                    full
                    onPress={this.Login.bind(this)}
                    style={{
                      marginTop: 10,
                      marginBottom: 0,
                      backgroundColor: color.ButtonColor,
                      height: 60,
                      borderRadius: 5,
                    }}>
                    <Text style={{color: 'white'}}>Giriş Yap</Text>
                  </Button>

                  <Card
                    style={{
                      borderRadius: 2,
                      borderColor: 'blue',
                      textAlign: 'left',
                      marginTop: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CardItem>
                      <Left style={{flex: 0.3}}>
                        <TouchableOpacity
                          style={{flexDirection: 'row'}}
                          onPress={() => {
                            this.dialCall(4447918);
                          }}>
                          <Image
                            style={{
                              resizeMode: 'contain',
                              height: 50,
                              flex: 1,
                            }}
                            source={phoneImage}
                          />
                        </TouchableOpacity>
                      </Left>

                      <Right style={{flex: 0.7}}>
                        <Text
                          onPress={() => {
                            console.log('tıkla');
                          }}
                          style={{
                            flex: 1,
                            color: '#889099',
                            textAlign: 'left',
                          }}>
                          Yardıma mı ihtiyacınız var?
                        </Text>

                        <Text
                          style={{
                            flex: 1,
                            marginTop: 10,
                            textAlign: 'left',
                          }}>
                          Bizimle iletişime geç.
                        </Text>
                      </Right>
                    </CardItem>
                  </Card>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </LinearGradient>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  linearGradient: {
    // alignItems: 'center',
    // justifyContent: 'center',

    height: '100%',
    width: '100%',
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
