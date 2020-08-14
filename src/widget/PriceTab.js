import React from 'react';
import color from '../assets/css/style';
import {
  Input,
  Item,
  Container,
  Tabs,
  TabHeading,
  Icon,
  Text,
} from 'native-base';

export default class PriceTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Container>
         
          <Item regular style={{backgroundColor: 'red'}}>
            <Input placeholder="Disabled Textbox" />
            <Icon name="information-circle" />
          </Item>

          <Item regular>
            <Input placeholder="Disabled Textbox" />
            <Icon name="information-circle" />
          </Item>

          <Item regular>
            <Input placeholder="Disabled Textbox" />
            <Icon name="information-circle" />
          </Item>

          <Item regular>
            <Input placeholder="Disabled Textbox" />
            <Icon name="information-circle" />
          </Item>

        </Container>
      </>
    );
  }
}
