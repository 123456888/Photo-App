import {createDrawerNavigator} from '@react-navigation/drawer';
import Gallery from "../screens/Gallery";
import Home from "../screens/Home";
import React from 'react';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen options={{headerShown:false}} name="Gallery" component={Gallery} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator