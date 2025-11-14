import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import {Provider} from 'react-redux';
import EmailConfirm from './src/screens/EmailConfirm';
import {store} from './src/redux/Store';
import DrawerNavigator from "./src/DrawerNavigator/DrawerNavigator";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={DrawerNavigator} />
            <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
            <Stack.Screen
              name="EmailConfirm"
              component={EmailConfirm}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
