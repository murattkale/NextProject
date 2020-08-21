import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';

import {
  Container,
  Fab,
  Content,
  Card,
  CardItem,
  H1,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Thumbnail,
  Picker,
  Tabs,
  Tab,
  TabHeading,
  ScrollView,
} from 'native-base';

import HeaderWidget from '../widget/Header';
import FooterWidget from '../widget/Footer';
import pImage from '../assets/img/pImage.png';
import axios from 'axios';
import color from '../assets/css/style';
import {Actions} from 'react-native-router-flux';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sube: props.sube,
      malzeme_barkod: props.malzeme_barkod,
      item: props.item,
      index: 0,
      active: false,
      DonusumBirimiList: [],
      DonusumBirimi: props.item.birimi,
      stok: null,
      currentTab: 0,
      loadingVisible: false,
    };
  }

  LoadingShowHide = (deger) => {
    this.setState({
      loadingVisible: deger,
    });
  };

  onlyUnique(arr) {
    var a = [];
    var b = [];
    for (var i = 0; i < arr.length; i++) {
      if (a.indexOf(arr[i].Name) == -1) a.push(arr[i].Name);
    }

    for (var i = 0; i < a.length; i++) {
      b.push({Name: a[i]});
    }
    return b;
  }

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
  componentDidMount() {
    var DonusumBirimiList = [];
    DonusumBirimiList.push({Name: this.state.item.malzeme_ana_birimi.trim()});
    DonusumBirimiList.push({Name: this.state.item.malzeme_satis_birimi.trim()});
    DonusumBirimiList.push({
      Name: this.state.item.malzeme_satinalma_birimi.trim(),
    });

    var DonusumBirimiListDistinct = this.onlyUnique(DonusumBirimiList);

    this.setState({DonusumBirimiList: DonusumBirimiListDistinct});

    this.setBirim(this.state.item.birimi);
  }

  setDatas = () => {
    return this.state.DonusumBirimiList.map((x, i) => {
      return <Picker.Item label={x.Name} value={x.Name} key={x.Name} />;
    });
  };

  setBirim(val) {
    this.LoadingShowHide(true);
    this.setState({DonusumBirimi: val});
    var api =
      this.props.getApiUrl() +
      '/api/Urun/Stok?' +
      'UserName=Admin' +
      '&SubeKodu=' +
      this.state.sube +
      '&malzeme_barkod=' +
      this.state.item.malzeme_kodu +
      '&DonusumBirimi=' +
      val;
    console.log(api);
    axios
      .get(api)
      .then((response) => {
        this.LoadingShowHide(false);
        response = response.data;
        if (response != null && response.ResultList.length > 0) {
          this.setState({
            stok: response.ResultList[0],
          });
          console.log('stok: ' + JSON.stringify(this.state.stok));
        }
      })
      .catch(function (error) {
        alert(JSON.stringify(error));
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });

    var api2 =
      this.props.getApiUrl() +
      '/api/Urun/Search?aranan_kelime=' +
      this.state.item.malzeme_kodu +
      '&user=Admin&SubeKodu=' +
      this.state.sube +
      '&Liste_Turu=9' +
      '&Birimi=' +
      val;
    console.log(api2);
    axios
      .get(api2)
      .then((response) => {
        response = response.data;
        if (response != null && response.ResultList.length > 0) {
          this.setState({
            item: response.ResultList[0],
          });
          console.log('item: ' + JSON.stringify(this.state.item));
        }
      })
      .catch(function (error) {
        alert('Lütfen internet bağlantınızı kontrol ediniz.');
      });
  }

  switchScreen(index) {
    this.setState({currentTab: index});
  }

  setSearchMore() {
    this.LoadingShowHide(true);
    this.setState({inputHide: false});

    if (this.state.item?.malzeme_kodu != '') {
      //
      var api2 =
        this.props.getApiUrl() +
        '/api/Urun/Search?aranan_kelime=' +
        this.state.item?.malzeme_kodu +
        '&user=Admin&SubeKodu=' +
        this.state.sube +
        '&Liste_Turu=' +
        9;

      console.log(api2);
      axios
        .get(api2)
        .then((response) => {
          this.LoadingShowHide(false);
          response = response.data;
          if (response != null && response.ResultList.length > 0) {
            console.log(JSON.stringify(response));
            Actions.SearchList({
              sube: this.state.sube,
              items: response.ResultList,
            });
          }
        })
        .catch(function (error) {
          alert('Lütfen internet bağlantınızı kontrol ediniz.');
          this.LoadingShowHide(false);
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

    var api2 =
      this.props.getApiUrl() +
      '/api/Urun/mob_okutulan_malzeme_etiket_basimi?sube=' +
      this.state.sube +
      '&malzeme_kodu=' +
      this.state.item?.malzeme_kodu;

    console.log(api2);

    axios
      .get(api2)
      .then((response) => {
        console.log(JSON.stringify(response));
        this.LoadingShowHide(false);
        if (response != null && response.ResultList.length > 0) {
          alert('Etiket basım onayına gönderildi.');
        } else {
          alert('Etiket basılamadı. Lütfen yetkililere ulaşınız.');
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
        alert('Lütfen internet bağlantınızı kontrol ediniz.');
        this.LoadingShowHide(false);
      });
  }

  render() {
    return (
      <>
        <Container>
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
          <HeaderWidget
            malzeme_kodu={this.state.item?.malzeme_kodu}
            {...this.props}
            treeDot
            toggleBack
            title={'Ürün Detay'}
          />
          <Card
            style={{borderColor: 'white', paddingBottom: 0, marginBottom: 0}}>
            <CardItem>
              <Left style={{flex: 0.68}}>
                <Text style={{fontSize: 16}}>
                  {this.state.item?.malzeme_adi}
                </Text>
              </Left>
              <Right style={{flex: 0.32}}>
                <View
                  style={{
                    width: '98%',
                    borderWidth: 1,
                    borderColor: '#c2c2c1',
                    borderRadius: 2,
                  }}>
                  <Picker
                    mode="dropdown"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    style={{
                      width: '100%',
                      color: '#747474',
                      justifyContent: 'center',
                      textAlign: 'center',
                      height: 35,
                    }}
                    // itemTextStyle={{height: 35}}
                    // itemTextStyle={{fontFamily: 'IRANSans', fontSize: 10}}
                    // activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                    selectedValue={
                      this.state.DonusumBirimi == null
                        ? ''
                        : this.state.DonusumBirimi
                    } //
                    onValueChange={(value, key) => this.setBirim(value)}>
                    {this.setDatas()}
                  </Picker>
                </View>
              </Right>
            </CardItem>

            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={pImage} />
              </Left>

              <Body>
                <List>
                  <View>
                    <ListItem
                      style={{
                        height: Platform.OS === 'ios' ? 40 : 40,
                        borderTopColor: 'white',
                      }}>
                      <Left style={{flex: 0.6}}>
                        <Text note>Ürün Kodu</Text>
                      </Left>

                      <Right style={{flex: 0.4}}>
                        <Text note style={{color: '#0055FF'}}>
                          {this.state.item?.malzeme_kodu}
                        </Text>
                      </Right>
                    </ListItem>

                    <ListItem style={{height: Platform.OS === 'ios' ? 40 : 40}}>
                      <Left style={{flex: 0.6}}>
                        <Text note>Malzeme Kodu</Text>
                      </Left>

                      <Right style={{flex: 0.4}}>
                        <Text note style={{color: '#0055FF'}}>
                          {this.state.item?.uretici_malzeme_kodu}
                        </Text>
                      </Right>
                    </ListItem>

                    <ListItem style={{height: Platform.OS === 'ios' ? 40 : 40}}>
                      <Left style={{flex: 0.6}}>
                        <Text note>Ana Birim</Text>
                      </Left>
                      <Right style={{flex: 0.4}}>
                        <Text note style={{color: '#0055FF'}}>
                          {this.state.item?.malzeme_ana_birimi}
                        </Text>
                      </Right>
                    </ListItem>

                    <ListItem
                      style={{
                        borderBottomColor: 'white',
                        height: Platform.OS === 'ios' ? 40 : 40,
                      }}>
                      <Left style={{flex: 0.6}}>
                        <Text note numberOfLines={1}>
                          Koli içi adedi
                        </Text>
                      </Left>
                      <Right style={{flex: 0.4}}>
                        <Text note style={{color: '#0055FF'}}>
                          {this.state.item?.ana_birim_cevrimi_miktari}
                        </Text>
                      </Right>
                    </ListItem>
                  </View>
                </List>
              </Body>
            </ListItem>
          </Card>

          <Tabs
            onChangeTab={({i}) => this.switchScreen(i)}
            style={{marginTop: 0}}>
            <Tab
              heading={
                <TabHeading
                  style={
                    this.state.currentTab === 0
                      ? {backgroundColor: '#120c6e', color: 'white'}
                      : {backgroundColor: '#ccc'}
                  }>
                  <Text style={{textAlign: 'center', color: 'white'}}>
                    Fiyat
                  </Text>
                </TabHeading>
              }>
              <List>
                <ListItem style={{height: Platform.OS === 'ios' ? 40 : 40}}>
                  <Left style={{flex: 0.6}}>
                    <Text note numberOfLines={1}>
                      KDV Oranı
                    </Text>
                  </Left>

                  <Right style={{flex: 0.4}}>
                    <Text note style={{color: '#0055FF'}}>
                      %{this.state.item?.kdv_orani}
                    </Text>
                  </Right>
                </ListItem>

                <ListItem style={{height: Platform.OS === 'ios' ? 40 : 40}}>
                  <Left style={{flex: 0.6}}>
                    <Text note>KDV Dahil Satış Fiyatı</Text>
                  </Left>

                  <Right style={{flex: 0.4}}>
                    <Text note style={{color: '#0055FF'}}>
                      {this.formatMoney(
                        this.state.item?.satis_fiyati,
                        2,
                        ',',
                        '.',
                      )}{' '}
                      TL
                    </Text>
                  </Right>
                </ListItem>
                <ListItem
                  style={{
                    borderBottomColor: 'white',
                    height: Platform.OS === 'ios' ? 40 : 40,
                  }}>
                  <Text note numberOfLines={1}>
                    Kampanya Bilgisi :{' '}
                  </Text>
                </ListItem>
                <ListItem style={{borderBottomColor: 'white'}}>
                  <Text note style={{color: '#0055FF'}}>
                    {this.state.item.kampanya}
                  </Text>
                </ListItem>
              </List>
            </Tab>
            <Tab
              heading={
                <TabHeading
                  style={
                    this.state.currentTab === 1
                      ? {backgroundColor: '#120c6e', color: 'white'}
                      : {backgroundColor: '#ccc'}
                  }>
                  <Text style={{textAlign: 'center', color: 'white'}}>
                    Stok
                  </Text>
                </TabHeading>
              }>
              <List>
                <ListItem style={{height: Platform.OS === 'ios' ? 40 : 40}}>
                  <Left style={{flex: 0.6}}>
                    <Text note numberOfLines={1}>
                      Gelecek Miktar
                    </Text>
                  </Left>

                  <Right style={{flex: 0.4}}>
                    <Text note style={{color: '#0055FF'}}>
                      {this.state.stok?.gelecek_miktar}
                    </Text>
                  </Right>
                </ListItem>

                <ListItem style={{height: Platform.OS === 'ios' ? 40 : 40}}>
                  <Left style={{flex: 0.6}}>
                    <Text note>Gidecek Miktar</Text>
                  </Left>

                  <Right style={{flex: 0.4}}>
                    <Text note style={{color: '#0055FF'}}>
                      {this.state.stok?.gidecek_miktar}
                    </Text>
                  </Right>
                </ListItem>

                <ListItem style={{height: Platform.OS === 'ios' ? 40 : 40}}>
                  <Left style={{flex: 0.6}}>
                    <Text note>Ortamala Satış Miktarı</Text>
                  </Left>
                  <Right style={{flex: 0.4}}>
                    <Text note style={{color: '#0055FF'}}>
                      {this.state.stok?.satis_ortalama_miktar}
                    </Text>
                  </Right>
                </ListItem>

                <ListItem style={{height: Platform.OS === 'ios' ? 40 : 40}}>
                  <Left style={{flex: 0.6}}>
                    <Text note numberOfLines={1}>
                      Satış Miktarı
                    </Text>
                  </Left>
                  <Right style={{flex: 0.4}}>
                    <Text note style={{color: '#0055FF'}}>
                      {this.state.stok?.satis_miktari}
                    </Text>
                  </Right>
                </ListItem>

                <ListItem style={{height: Platform.OS === 'ios' ? 40 : 40}}>
                  <Left style={{flex: 0.6}}>
                    <Text note numberOfLines={1}>
                      Stok Miktarı
                    </Text>
                  </Left>
                  <Right style={{flex: 0.4}}>
                    <Text note style={{color: '#0055FF'}}>
                      {this.state.stok?.stok_miktari}
                    </Text>
                  </Right>
                </ListItem>

                <ListItem
                  style={{
                    borderBottomColor: 'white',
                    height: Platform.OS === 'ios' ? 40 : 40,
                  }}>
                  <Left style={{flex: 0.6}}>
                    <Text note numberOfLines={1}>
                      Kalan Miktar
                    </Text>
                  </Left>
                  <Right style={{flex: 0.4}}>
                    <Text note style={{color: '#0055FF'}}>
                      {this.state.stok?.kalan_miktar}
                    </Text>
                  </Right>
                </ListItem>
              </List>
            </Tab>
          </Tabs>

          <View style={{flex: 1}}>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={{backgroundColor: '#5067FF'}}
              position="bottomRight"
              onPress={() => this.setState({active: !this.state.active})}>
              <Icon name="cog" type="Entypo" />
              <Button onPress={() => this.setSearchMore()}>
                <Icon type="FontAwesome" name="list-ul" />
              </Button>
              <Button onPress={() => this.click_print()}>
                <Icon type="FontAwesome" name="print" />
              </Button>
            </Fab>
          </View>

          <FooterWidget sube={this.state.sube} />
        </Container>
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
