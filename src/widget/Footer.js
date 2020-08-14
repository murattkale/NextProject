import React from 'react';
import {StatusBar} from 'react-native';
import {Footer, FooterTab, Button, Icon, Text, Fab} from 'native-base';
import color from '../assets/css/style';
import {Actions} from 'react-native-router-flux';

export default class FooterWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 1,
      sube: props.sube,
    };
  }

  segmentClicked = (index) => {
    this.setState({
      activeIndex: index,
    });
    switch (index) {
      case 1: {
        Actions.Dashboard(this.state.sube);
        break;
      }
      case 2: {
        break;
      }
      case 3: {
        Actions.Camera({sube: this.state.sube});
        break;
      }
      case 4: {
        break;
      }
      case 5: {
        break;
      }
    }
  };

  render() {
    return (
      <>
        <Footer>
          <FooterTab
            style={{
              backgroundColor: '#ffffff',
              borderTopColor: '#ccc',
              borderTopWidth: 1.2,
            }}>
            <Button onPress={() => this.segmentClicked(1)} vertical>
              <Icon
                style={[
                  this.state.activeIndex == 1
                    ? {color: 'blue'}
                    : {color: '#889099'},
                ]}
                type="FontAwesome"
                name="home"
              />
              <Text
                style={[
                  this.state.activeIndex == 1
                    ? {color: 'blue', fontSize: 8}
                    : {color: '#889099', fontSize: 8},
                ]}>
                Anasayfa
              </Text>
            </Button>

            <Button onPress={() => this.segmentClicked(2)} vertical>
              <Icon
                style={[
                  this.state.activeIndex == 2
                    ? {color: 'blue'}
                    : {color: '#889099'},
                ]}
                type="SimpleLineIcons"
                name="grid"
              />
              <Text
                style={[
                  this.state.activeIndex == 2
                    ? {color: 'blue', fontSize: 8}
                    : {color: '#889099', fontSize: 8},
                ]}>
                Denetim
              </Text>
            </Button>

            <Button
              style={{
                backgroundColor: '#ff0037',
                height: 80,
                borderRadius: 10,
                color: 'white',
              }}
              onPress={() => this.segmentClicked(3)}
              vertical>
              <Icon
                style={{color: 'white'}}
                type="FontAwesome"
                name="barcode"
              />
              <Text style={{color: 'white', fontSize: 8}}>Ürünler</Text>
            </Button>

            <Button
              style={[
                this.state.activeIndex == 4
                  ? {backgroundColor: 'white', color: 'black'}
                  : {},
              ]}
              onPress={() => this.segmentClicked(4)}
              vertical>
              <Icon
                style={[
                  this.state.activeIndex == 4
                    ? {color: 'blue'}
                    : {color: '#889099'},
                ]}
                type="MaterialIcons"
                name="notifications-none"
              />
              <Text
                style={[
                  this.state.activeIndex == 4
                    ? {color: 'blue', fontSize: 8}
                    : {color: '#889099', fontSize: 8},
                ]}>
                Bildirim
              </Text>
            </Button>

            <Button
              style={[
                this.state.activeIndex == 5
                  ? {backgroundColor: 'white', color: 'black'}
                  : {},
              ]}
              onPress={() => this.segmentClicked(5)}
              vertical>
              <Icon
                style={[
                  this.state.activeIndex == 5
                    ? {color: 'blue'}
                    : {color: '#889099'},
                ]}
                type="MaterialIcons"
                name="more-vert"
              />
              <Text
                style={[
                  this.state.activeIndex == 5
                    ? {color: 'blue', fontSize: 8}
                    : {color: '#889099', fontSize: 8},
                ]}></Text>
            </Button>
          </FooterTab>
        </Footer>
      </>
    );
  }
}
