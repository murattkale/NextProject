// import React, {Component} from 'react';
// import {
//   Container,
//   Content,
//   List,
//   ListItem,
//   Input,
//   Icon,
//   Card,
//   CardItem,
//   Body,
//   Text,
//   Button,
// } from 'native-base';
// import {Actions} from 'react-native-router-flux';
// import {View} from 'react-native';
// import HeaderWidget from '../widget/Header';
// import {Col, Row, Grid} from 'react-native-easy-grid';
// import FooterWidget from '../widget/Footer';
// import MainContent from '../widget/MainContent';
// import Search from '../views/Search';
// import color from '../assets/css/style';

// export default class Main extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       index: 0,
//     };
//   }

//   componentDidMount() {
//     this.props.LoadingShowHide(true);
//   }
//   switchScreen(index) {
//     this.setState({index: index});
//   }

//   render() {
//     let title = 'Hoş Geldiniz';
//     let AppComponent = null;

//     if (this.state.index == 0) {
//       AppComponent = MainContent;
//       title = 'Şube Seçimi';
//     } else if (this.state.index == 1) {
//       AppComponent = Search;
//       title = 'Ürün Arama';
//     } else if (this.state.index == 2) {
//       AppComponent = MainContent;
//       title = 'Denetim';
//     }

//     return (
//       <Container>
//         <HeaderWidget {...this.props} toggleMenu title={title} />
//         <Content style={{backgroundColor: color.primary1}}>
//           <AppComponent {...this.props} />
//         </Content>
//         <FooterWidget switchScreen={this.switchScreen.bind(this)} />
//       </Container>
//     );
//   }
// }
