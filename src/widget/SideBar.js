import React from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Title,
  View,
} from 'native-base';

import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import color from '../assets/css/style';
import logo from '../assets/img/logo.png';
import LinearGradient from 'react-native-linear-gradient';

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleDrawer: false,
    };
  }

  toggle = () => {
    this.setState({toggleDrawer: !this.state.toggleDrawer});
  };

  setClick() {
    try {
      this.props.closeDrawer();
    } catch (error) {}

    Actions.Sube();
  }

  setLogin() {
    try {
      this.props.closeDrawer();
    } catch (error) {}
    Actions.Login();
  }
  render() {
    return (
      <>
        <Container>
          <Header style={{backgroundColor: '#5e72eb'}}>
            <Left>
              <Button onPress={() => Actions.drawerClose()} transparent>
                <Icon type="Entypo" name="menu" />
              </Button>
            </Left>

            <Body>
              <Text style={{color: 'white', fontSize: 30}}>Menü</Text>
            </Body>
            <Right>
              <Button onPress={() => Actions.drawerClose()} transparent>
                <Icon type="FontAwesome" name="close" />
              </Button>
            </Right>
          </Header>

          <LinearGradient
            colors={['#5e72eb', '#120c6e']}
            style={styles.linearGradient}>
            <Content style={{width: '95%'}}>
              <List>
                <ListItem
                  onPress={() => console.log('Yardım')}
                  icon
                  iconLeft="ListItem"
                  style={{marginTop: 0}}>
                  <Left>
                    <Button transparent>
                      <Icon
                        style={{color: 'white'}}
                        type="FontAwesome"
                        name="user"
                      />
                    </Button>
                  </Left>
                  <Body>
                    <Text style={{color: 'white', fontSize: 19}}>Profil</Text>
                  </Body>
                </ListItem>

                <ListItem
                  onPress={() => this.setClick()}
                  icon
                  iconLeft="ListItem"
                  style={{marginTop: 0}}>
                  <Left>
                    <Button transparent>
                      <Icon
                        style={{color: 'white'}}
                        type="FontAwesome"
                        name="building"
                      />
                    </Button>
                  </Left>
                  <Body>
                    <Text style={{color: 'white', fontSize: 19}}>
                      Şube Seçimi
                    </Text>
                  </Body>
                </ListItem>
                <ListItem
                  onPress={() => console.log('Yardım')}
                  icon
                  iconLeft="ListItem"
                  style={{marginTop: 0}}>
                  <Left>
                    <Button transparent>
                      <Icon
                        style={{color: 'white'}}
                        type="FontAwesome"
                        name="cog"
                      />
                    </Button>
                  </Left>
                  <Body>
                    <Text style={{color: 'white', fontSize: 19}}>Ayarlar</Text>
                  </Body>
                </ListItem>

                <ListItem
                  onPress={() => console.log('Yardım')}
                  icon
                  iconLeft="ListItem"
                  style={{marginTop: 0}}>
                  <Left>
                    <Button transparent>
                      <Icon
                        style={{color: 'white'}}
                        type="FontAwesome"
                        name="address-card"
                      />
                    </Button>
                  </Left>
                  <Body>
                    <Text style={{color: 'white', fontSize: 19}}>
                      Hakkımızda
                    </Text>
                  </Body>
                </ListItem>

                <ListItem
                  onPress={() => console.log('Yardım')}
                  icon
                  iconLeft="ListItem"
                  style={{marginTop: 0}}>
                  <Left>
                    <Button transparent>
                      <Icon
                        style={{color: 'white'}}
                        type="FontAwesome"
                        name="info-circle"
                      />
                    </Button>
                  </Left>
                  <Body>
                    <Text style={{color: 'white', fontSize: 19}}>Yardım</Text>
                  </Body>
                </ListItem>

                <ListItem
                  onPress={() => this.setLogin()}
                  icon
                  iconLeft="ListItem"
                  style={{marginTop: 0}}>
                  <Left>
                    <Button style={{backgroundColor: color.red}}>
                      <Icon type="exit" name="md-exit" />
                    </Button>
                  </Left>
                  <Body>
                    <Text style={{color: 'white', fontSize: 19}}>
                      Çıkış yap
                    </Text>
                  </Body>
                </ListItem>

                <ListItem icon iconLeft="ListItem" style={{marginTop: 0}}>
                  <Button transparent>
                    <Icon
                      style={{color: 'black'}}
                      type="FontAwesome"
                      name="copyright"
                    />
                  </Button>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 19,
                      // justifyContent: 'center',
                      // alignItems: 'center',
                    }}>
                    2020 Zırhlıoğlu Gıda
                  </Text>
                </ListItem>
              </List>
            </Content>
          </LinearGradient>
        </Container>
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
