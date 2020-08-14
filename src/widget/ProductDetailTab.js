import React from 'react';
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
} from 'native-base';

import Fiyat from '../widget/Fiyat';
import Stok from '../widget/Stok';

export default class ProductDetailTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      malzeme_barkod: props.malzeme_barkod,
      gelecek_miktar: props.gelecek_miktar,
      gidecek_miktar: props.gidecek_miktar,
      satis_ortalama_miktar: props.satis_ortalama_miktar,
      satis_miktari: props.satis_miktari,
      stok_miktari: props.stok_miktari,
      kalan_miktar: props.kalan_miktar,
    };
  }

  render() {
    return (
      <>
        <Tabs style={{marginTop: 0}}>
          <Tab
            heading={
              <TabHeading>
                <Text style={{textAlign: 'center'}}>Fiyat</Text>
              </TabHeading>
            }>
            <Fiyat />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: '#ccc'}}>
                <Text style={{textAlign: 'center', color: 'black'}}>Stok</Text>
              </TabHeading>
            }>
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
                  <Text style={{color: '#0055FF'}}>
                    {this.state.satis_miktari}
                  </Text>
                </Right>
              </ListItem>

              <ListItem style={{maxHeight: 20}}>
                <Left>
                  <Text note numberOfLines={1}>
                    Stok Miktarı
                  </Text>
                </Left>
                <Right>
                  <Text style={{color: '#0055FF'}}>
                    {this.state.stok_miktari}
                  </Text>
                </Right>
              </ListItem>

              <ListItem style={{maxHeight: 20, borderBottomColor: 'white'}}>
                <Left>
                  <Text note numberOfLines={1}>
                    Kalan Miktar
                  </Text>
                </Left>
                <Right>
                  <Text style={{color: '#0055FF'}}>
                    {this.state.kalan_miktar}
                  </Text>
                </Right>
              </ListItem>
            </List>
          </Tab>
        </Tabs>
      </>
    );
  }
}
