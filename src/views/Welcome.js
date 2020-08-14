import React, {Component} from 'react';
import {Image} from 'react-native';
import {
  Container,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon,
  Button,
  Input,
  H1,
} from 'native-base';

export default class Welcome extends Component {
  render() {
    return (
      <>
        <Input placeholder="Lütfen Giriş Yapınız" />
      </>
    );
  }
}
