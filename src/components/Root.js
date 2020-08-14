import React, {Component} from 'react';

import Login from '../views/Login';
import Detail from '../views/Detail';
import ProductList from '../views/ProductList';
import Camera from '../views/Camera';
import Dashboard from '../views/Dashboard';
import Sube from '../views/Sube';
import SearchList from '../views/SearchList';

import SideBar from '../widget/SideBar';
import {Actions, Scene, Router, Drawer} from 'react-native-router-flux';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // if (this.props.auth) {
    //   return (
    //     <Router>
    //       <Scene key="root">
    //         <Scene
    //
    //           key="Login"
    //           component={Login}
    //
    //           initial
    //           type={ActionConst.RESET}
    //           back={false}
    //         />
    //       </Scene>
    //     </Router>
    //   );
    // }
    return (
      <>
        <Router>
          <Drawer
            hideNavBar
            key="drawer"
            drawer
            contentComponent={SideBar}
            drawerWidth={'75%'}>
            {/* <Drawer
            drawerWidth={250}
            // type="overlay"
            // side={'left'}
            // openDrawerOffset={0.2}
            // panOpenMask={0.2}
            // tapToClose={true}
            // ref={(ref) => {
            //   this.drawer = ref;
            // }}
            // onClose={() => this.closeDrawer()}
            contentComponent={SideBar}> */}
            <Scene key="root">
              <Scene
                hideNavBar
                initial
                {...this.props}
                key="Login"
                component={Login}
              />

              <Scene
                hideNavBar
                {...this.props}
                key="Detail"
                component={Detail}
              />

              <Scene hideNavBar {...this.props} key="Sube" component={Sube} />

              <Scene
                hideNavBar
                {...this.props}
                key="Dashboard"
                component={Dashboard}
              />

              <Scene
                hideNavBar
                {...this.props}
                key="ProductList"
                component={ProductList}
              />

              <Scene
                hideNavBar
                {...this.props}
                key="Camera"
                component={Camera}
              />
              <Scene
                hideNavBar
                {...this.props}
                key="SearchList"
                component={SearchList}
              />
            </Scene>
          </Drawer>
        </Router>
      </>
    );
  }
}
