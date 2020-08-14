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
import {Container, Content, Card, CardItem} from 'native-base';

import {Actions} from 'react-native-router-flux';

import color from '../assets/css/style';

import HeaderWidget from '../widget/Header';
import FooterWidget from '../widget/Footer';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sube: props.sube,
    };
  }
  render() {
    return (
      <>
        <Container>
          <HeaderWidget {...this.props} toggleMenu title={'Dashboard'} />
          <Content style={{padding: '3%', backgroundColor: color.white}}>
            <Card>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            </Card>
          </Content>
          <FooterWidget sube={this.state.sube} />
        </Container>
      </>
    );
  }
}
