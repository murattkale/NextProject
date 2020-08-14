import React from 'react';
import {StatusBar} from 'react-native';
import {List, ListItem, Button, Body, Text} from 'native-base';
import color from '../assets/css/style';

export default class MainContent extends React.Component {
  render() {
    return (
      <>
        <List>
          <ListItem>
            <Body>
              <Button info block>
                <Text>Fiyatı Değişenler</Text>
              </Button>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Button info block>
                <Text>Stoğu Bitenler</Text>
              </Button>
            </Body>
          </ListItem>
        </List>
      </>
    );
  }
}
