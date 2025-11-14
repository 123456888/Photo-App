import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Box, Button , Pressable, Spinner, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

const initialState = {
  navToPass: false,
  email: '',
  emailOrPassErr: false,
  password: '',
  showPassword: false,
  number: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'email':
      return {
        ...state,
        email: action.payload,
        emailOrPassErr: false,
      };
    case 'password':
      return {
        ...state,
        password: action.payload,
        emailOrPassErr: false,
        showEye: action.payload !== '' ? true : false,
      };
    case 'loadState':
      return {
        ...state,
        loginBtn: action.payload == 'loadLogin' ? true : false,
      };
    case 'stopLoadState':
      return {
        ...state,
        loginBtn: false,
      };
    case 'handleEye':
      return {
        ...state,
        showPassword: !state.showPassword,
      };
  }
};

const Login = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [buffer, setBuffer] = React.useState(false);
  const user = useSelector(state => state.users);
  const [loginBuffer, setLoginBuffer] = React.useState(false);

  const navigation = useNavigation();

  const handleClick = () => {
    setBuffer(true);
    setTimeout(() => {
      navigation.navigate('SignUp');
      setBuffer(false);
      state.emailOrPassErr = false;
    }, 2000);
  };

  const handleLogin = () => {
    const emailOrNumber =
      state.email == user.number && state.password == user.password;
    const emptyEmailOrPassword = state.email !== '' && state.password !== '';
    const emailOrPassword =
      state.email == user.email && state.password == user.password;
    setLoginBuffer(true);
    setTimeout(() => {
      if (
        (emailOrNumber && emptyEmailOrPassword) ||
        (emailOrPassword && emptyEmailOrPassword)
      ) {
        navigation.navigate('Home');
        setLoginBuffer(false);
      } else {
        setLoginBuffer(false);
        state.emailOrPassErr = true;
      }
    }, 2000);
  };
  return (
    <LinearGradient
      colors={['black', '#36454F']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1, padding: 10}}>
      <ScrollView>
        <Box>
          {' '}
          <Box py={5} alignItems="center" safeAreaBottom>
            <Text color={"white"} fontWeight={"bold"} fontSize={28}>Photo <Text color={"green.500"}>App</Text></Text>
          </Box>
          {state.emailOrPassErr == true ? (
            <Box alignItems={'center'}>
              <Text color={'red.600'} fontWeight={'bold'}>
                Email or Password are incorrect!
              </Text>
            </Box>
          ) : (
            ''
          )}
          <Box w={'100%'}>
            <TextInput
              keyboardType="email-address"
              value={state.email || state.number}
              onChangeText={text => {
                dispatch({type: 'email', payload: text});
              }}
              placeholderTextColor={'gray'}
              style={{
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                borderColor: '#96DED1',
                color: 'white',
              }}
              placeholder={'Enter email'}
            />
          </Box>
          <Box w={'100%'} mt={2}>
            <TextInput
              value={state.password}
              onChangeText={text => {
                dispatch({type: 'password', payload: text});
              }}
              secureTextEntry={!state.showPassword}
              placeholderTextColor={'gray'}
              style={{
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                borderColor: '#96DED1',
                color: 'white',
              }}
              placeholder={'Password'}
            />
            <Box position={'absolute'} right={'3'} mt={2.5}>
              <TouchableOpacity
                onPress={() => {
                  dispatch({type: 'handleEye'});
                }}>
                <Icon
                  name={state.showPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </Box>
          </Box>
          <Box w={'100%'} mt={2}>
            <Button onPress={handleLogin} rounded={'full'} bg={'blue.500'}>
              {loginBuffer ? (
                <Spinner color={'blue.400'} size={'sm'} />
              ) : (
                'Log in'
              )}
            </Button>
          </Box>
          <Box width={'100%'} alignItems={'center'} mt={'2'}>
            <Text color={'white'}>
              Forgot password?
            </Text>
          </Box>
          <Box width={'100%'} py={'20%'}>
            <Pressable
              onPress={handleClick}
              p={'2'}
              rounded={'full'}
              alignItems={'center'}
              justifyContent={'center'}
              borderColor={'blue.400'}
              borderWidth={'2'}>
              <Text color={'white'}>
                {buffer ? (
                  <Spinner color={'blue.400'} size={'sm'} />
                ) : (
                  'Create new account'
                )}
              </Text>
            </Pressable>
          </Box>
        </Box>
      </ScrollView>
    </LinearGradient>
  );
};

export default Login;
