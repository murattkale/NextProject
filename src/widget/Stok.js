import React from 'react';
import {StatusBar} from 'react-native';
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
} from 'native-base';
import color from '../assets/css/style';

export default class Stok extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gelecek_miktar: this.props.gelecek_miktar,
      gidecek_miktar: this.props.gidecek_miktar,
      satis_ortalama_miktar: this.props.satis_ortalama_miktar,
      satis_miktari: this.props.satis_miktari,
      stok_miktari: this.props.stok_miktari,
      kalan_miktar: this.props.kalan_miktar,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <List>
          <ListItem style={{maxHeight: 20}}>
            <Left>
              <Text note numberOfLines={1}>
                Gelecek Miktar
              </Text>
            </Left>

            <Right>
              <Text style={{color: '#0055FF'}}>
                {this.state.gelecek_miktar}
              </Text>
            </Right>
          </ListItem>

          <ListItem style={{maxHeight: 20}}>
            <Left>
              <Text note>Gidecek Miktar</Text>
            </Left>

            <Right>
              <Text style={{color: '#0055FF'}}>
                {this.state.gidecek_miktar}
              </Text>
            </Right>
          </ListItem>

          <ListItem style={{maxHeight: 20}}>
            <Left>
              <Text note>Ortamala Satış Miktarı</Text>
            </Left>
            <Right>
              <Text style={{color: '#0055FF'}}>
                {this.state.satis_ortalama_miktar}
              </Text>
            </Right>
          </ListItem>

          <ListItem style={{maxHeight: 20}}>
            <Left>
              <Text note numberOfLines={1}>
                Satış Miktarı
              </Text>
            </Left>
            <Right>
              <Text style={{color: '#0055FF'}}>{this.state.satis_miktari}</Text>
            </Right>
          </ListItem>

          <ListItem style={{maxHeight: 20}}>
            <Left>
              <Text note numberOfLines={1}>
                Stok Miktarı
              </Text>
            </Left>
            <Right>
              <Text style={{color: '#0055FF'}}>{this.state.stok_miktari}</Text>
            </Right>
          </ListItem>

          <ListItem style={{maxHeight: 20, borderBottomColor: 'white'}}>
            <Left>
              <Text note numberOfLines={1}>
                Kalan Miktar
              </Text>
            </Left>
            <Right>
              <Text style={{color: '#0055FF'}}>{this.state.kalan_miktar}</Text>
            </Right>
          </ListItem>
        </List>
      </>
    );
  }
}
