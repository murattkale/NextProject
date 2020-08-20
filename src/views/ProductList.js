import React, {Component} from 'react';
import {
  Container,
  Content,
  H1,
  Item,
  Input,
  Icon,
  Card,
  CardItem,
  Body,
  Text,
  Button,
  List,
  ListItem,
  Left,
  Thumbnail,
  Right,
  View,
} from 'native-base';
import {StyleSheet, ActivityIndicator, Modal, Platform} from 'react-native';

import {Actions} from 'react-native-router-flux';
import HeaderWidget from '../widget/Header';
import FooterWidget from '../widget/Footer';
import pImage from '../assets/img/pImage.png';

import LinearGradient from 'react-native-linear-gradient';

export default class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      title: '',
      items: props.items,
      sube: props.sube,
      loadingVisible: false,
    };

    // console.log(this.state.items);
    // console.log(JSON.stringify(this.state.sube));
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

  LoadingShowHide = (deger) => {
    this.setState({
      loadingVisible: deger,
    });
  };

  render() {
    let title = 'Arama Sonucu : ' + this.state.items.length + ' Ürün';

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
          <HeaderWidget {...this.props} toggleMenu title={title} />

          {/* ------------------------------------------------- */}

          <Content>
            <List>
              {this.state.items.map((x, index) => (
                <Card
                  style={{
                    borderColor: 'white',
                  }}>
                  <CardItem
                    onPress={() => {
                      Actions.Detail({
                        sube: this.state.sube,
                        item: x,
                      });
                    }}
                    style={{}}>
                    <Left style={{flex: 0.05}}></Left>
                    <Right style={{flex: 0.95}}>
                      <Text style={{fontSize: 16, textAlign: 'left'}}>
                        {x.malzeme_adi} / {x.birimi}
                      </Text>
                    </Right>
                  </CardItem>

                  <ListItem
                    style={{marginTop: -20}}
                    // style={{maxHeight: 215}}
                    thumbnail
                    onPress={() => {
                      Actions.Detail({
                        sube: this.state.sube,
                        item: x,
                      });
                    }}>
                    <Left>
                      <Thumbnail
                        onPress={() => {
                          Actions.Detail({
                            sube: this.state.sube,
                            item: x,
                          });
                        }}
                        square
                        source={pImage}
                      />
                    </Left>

                    <Body
                      onPress={() => {
                        Actions.Detail({
                          sube: this.state.sube,
                          item: x,
                        });
                      }}>
                      <List>
                        <ListItem
                          style={{height: Platform.OS === 'ios' ? 40 : 40}}>
                          <Left style={{flex: 0.6}}>
                            <Text note numberOfLines={1}>
                              Ürün Fiyatı
                            </Text>
                          </Left>

                          <Right style={{flex: 0.4}}>
                            <Text note style={{color: '#0055FF'}}>
                              {this.formatMoney(x.satis_fiyati, 2, ',', '.')} TL
                            </Text>
                          </Right>
                        </ListItem>

                        <ListItem
                          style={{height: Platform.OS === 'ios' ? 40 : 40}}>
                          <Left style={{flex: 0.6}}>
                            <Text note numberOfLines={1}>
                              Ürün Kodu
                            </Text>
                          </Left>

                          <Right style={{flex: 0.4}}>
                            <Text note style={{color: '#0055FF'}}>
                              {x.malzeme_kodu}
                            </Text>
                          </Right>
                        </ListItem>

                        <ListItem
                          style={{height: Platform.OS === 'ios' ? 40 : 40}}>
                          <Left style={{flex: 0.6}}>
                            <Text note>Malzeme Kodu</Text>
                          </Left>

                          <Right style={{flex: 0.4}}>
                            <Text note style={{color: '#0055FF'}}>
                              {x.uretici_malzeme_kodu}
                            </Text>
                          </Right>
                        </ListItem>

                        <ListItem
                          style={{height: Platform.OS === 'ios' ? 40 : 40}}>
                          <Left style={{flex: 0.6}}>
                            <Text note>Gelecek Miktar</Text>
                          </Left>

                          <Right style={{flex: 0.4}}>
                            <Text note style={{color: '#0055FF'}}>
                              {this.formatMoney(x.gelecek_miktar, 2, ',', '.')}
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
                              Stok Miktarı
                            </Text>
                          </Left>

                          <Right style={{flex: 0.4}}>
                            <Text note style={{color: '#0055FF'}}>
                              {this.formatMoney(x.stok_miktari, 2, ',', '.')}
                            </Text>
                          </Right>
                        </ListItem>
                      </List>
                    </Body>
                  </ListItem>
                </Card>
              ))}
            </List>
          </Content>

          <FooterWidget sube={this.state.sube} />
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
