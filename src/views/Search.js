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
  Header,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sube: props.sube,
      index: 0,
      title: '',
      search: '',
    };
  }

  setSearch() {
    if (this.state.search != '') {
      //
      var api2 =
        this.props.getApiUrl() +
        '/api/Urun/Search?aranan_kelime=' +
        this.state.search +
        '&user=Admin&SubeKodu=' +
        this.state.sube +
        '&Liste_Turu=1' +
        '&Birimi=' +
        val;
      console.log(api2);
      axios
        .get(api2)
        .then((response) => {
          response = response.data;
          if (response != null && response.ResultList.length > 0) {
            console.log('stok: ' + JSON.stringify(response.ResultList));
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
    } else {
      alert('Lütfen arama yapmak istediğiniz kelimeyi giriniz.');
    }
  }

  setValue = (value) => {
    this.setState({search: value});
  };

  render() {
    return (
      <>
        <Header searchBar rounded>
          <Item>
            <Input
              onChangeText={this.setValue.bind(this)}
              placeholderTextColor="#000"
              placeholder="Arama"
            />
          </Item>
          <Button transparent>
            <Icon
              active
              name="search"
              type="FontAwesome"
              onPress={() => this.setSearch()}
            />
          </Button>
        </Header>
      </>
    );
  }
}
