import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  SectionList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Picker,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {
  Content,
  Item,
  Input,
  Button,
  Icon,
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
  Linking,
} from 'native-base';
import color from '../assets/css/style';
const {width} = Dimensions.get('window');
import dep from '../assets/img/dep.jpeg';
import phoneImage from '../assets/img/phoneImage.png';
import axios from 'axios';
import HeaderWidget from '../widget/Header';

import Storage from '../components/Storage';

import LinearGradient from 'react-native-linear-gradient';

export default class Sube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      sube: '',
      subeler: [],
    };
  }

  async componentDidMount() {
    var user = await Storage.get('user');
    this.setState({user: user});
    var api =
      this.props.getApiUrl() +
      '/api/Sube/GetUserSube?UserId=' +
      this.state.user.Id;
    console.log(api);
    axios
      .get(api)
      .then((response) => {
        console.log(response);
        response = response.data;
        if (response != null && response.Result.length > 0) {
          this.setState({
            subeler: response.Result,
          });
        }
      })
      .catch(function (error) {
        alert('Lütfen internet bağlantınızı kontrol ediniz.');
      });
    this.state.sube = null;
  }

  setDatas = () => {
    return this.state.subeler.map((x, i) => {
      return (
        <Picker.Item
          label={x.Sube.Name}
          key={x.Sube.Id}
          value={x.Sube.Name}
          key={i}
        />
      );
    });
  };

  async setSearch(val, key) {
    console.log(key);
    console.log(val);
    this.setState({sube: val});
    if (key != 0) {
      // alert(val + ' tesisi ile uygulamaya devam edeceksiniz ');
      // await Storage.setVal('sube', val);

      Actions.Dashboard({sube: val});
    } else {
      alert('Lütfen şube seçiniz.');
    }
  }

  render() {
    return (
      <LinearGradient
        colors={['#5e72eb', '#120c6e']}
        style={styles.linearGradient}>
        <Content
          style={{
            padding: '3%',
            // backgroundColor: 'white',
            // backgroundGradient: 'vertical',
            // backgroundGradientTop: '#ccc',
            // backgroundGradientBottom: '#666666',
          }}>
          <Card style={{backgroundColor: 'transparent'}}>
            <CardItem
              style={{
                // zIndex: 9999,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 278,
                }}>
                <Image
                  style={{
                    resizeMode: 'contain',
                    // width: '100%',
                    height: '100%',
                    // maxHeight: 300,
                    flex: 1,
                  }}
                  source={dep}
                />
              </View>
            </CardItem>

            <CardItem style={{backgroundColor: 'white'}}>
              <Body style={{}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 37,
                    marginTop: 20,
                  }}>
                  Şube Seçimi
                </Text>

                <H3
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    marginBottom: 10,
                    marginTop: 15,
                    color: '#ccc',
                  }}>
                  Bağlı olduğunuz ilçedeki şubeyi seçerek devam edin. Şubenizin
                  hangisini olduğunu bilmiyorsanız...
                </H3>

                <View
                  style={{
                    marginTop: 20,
                    width: '100%',
                    // flexDirection: 'row',
                    // justifyContent: 'center',

                    // paddingVertical: 5,
                    borderColor: '#c2c2c1',
                    borderWidth: 1,
                    borderRadius: 2,
                    // borderRadius: 5,
                    // textAlign: 'center',
                  }}>
                  <Picker
                    mode="dropdown"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    style={{
                      height: 40,
                      width: '100%',
                      color: '#747474',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                    selectedValue={this.state?.sube} //
                    onValueChange={(value, key) => this.setSearch(value, key)}>
                    <Picker.Item label="Şube Seçiniz" />

                    {this.setDatas()}
                  </Picker>
                </View>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </LinearGradient>
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
