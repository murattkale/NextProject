import React, {Component} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

export default class SpinnerLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading,
    };
  }

  render() {
    return (
      <Spinner
        animation={'slide'}
        visible={this.state.loading}
        textContent={'Yükleniyor...'}
        textStyle={{color: '#FFF'}}
      />
    );
  }
}
