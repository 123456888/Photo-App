import React, {useState} from 'react';
import {
  Box,
  Button,
  HStack,
  Image,
  Pressable,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import {Modal, ScrollView, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {setUserData} from '../redux/UserSlice';

const initialState = {
  current: 'number',
  number: '',
  numberErr: false,
  numNavigate: false,
  password: '',
  passErr: false,
  passNavigate: false,
  dob: '',
  mode: 'date',
  showDate: false,
  dobErr: false,
  dobNavigate: false,
  name: '',
  nameErr: false,
  nameNavigate: false,
  userName: '',
  userNameErr: false,
  userNameNavigate: false,
  email: '',
  emailErr: false,
  emailNavigate: false,
  emailConfirm: '',
  emailConfirmErr: false,
  emailConfirmNavigate: false,
  modalVisible: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'number':
      return {
        ...state,
        number: action.payload,
        numberNavigate: false,
      };
    case 'numberNavigate':
      return {
        ...state,
        numberNavigate:
          state.number == '' || state.number.length < 10 ? true : false,
        current:
          state.number !== '' && state.number.length == 10
            ? 'password'
            : 'number',
      };
    case 'startBuffer':
      return {
        ...state,
        numberBuffer: action.payload == 'numberBuffering' ? true : false,
        navToEmail: action.payload == 'navToEmailBuffering' ? true : false,
        emailBuffer: action.payload == 'emailBuffering' ? true : false,
        emailBackBuffer: action.payload == 'emailBackBuffering' ? true : false,
        confirmBuffer: action.payload == 'confirmBuffering' ? true : false,
        passBuffer: action.payload == 'passBuffering' ? true : false,
        saveBuffer: action.payload == 'saveBuffering' ? true : false,
        notSaveBuffer: action.payload == 'notSaveBuffering' ? true : false,
        dobBuffer: action.payload == 'dobBuffering' ? true : false,
        nameBuffer: action.payload == 'nameBuffering' ? true : false,
        userNameBuffer: action.payload == 'userNameBuffering' ? true : false,
        nextBtnNavigate: action.payload == 'nextButton' ? true : false,
      };
    case 'stopBuffer':
      return {
        ...state,
        numberBuffer: false,
        navToEmail: false,
        emailBuffer: false,
        emailBackBuffer: false,
        confirmBuffer: false,
        passBuffer: false,
        saveBuffer: false,
        notSaveBuffer: false,
        dobBuffer: false,
        nameBuffer: false,
        userNameBuffer: false,
        nextBtnNavigate: false,
      };
    case 'password':
      return {
        ...state,
        password: action.payload,
        passNavigate: false,
      };
    case 'passNavigate':
      return {
        ...state,
        passNavigate:
          state.password == '' || state.password.length < 6 ? true : false,
        current:
          state.password == '' || state.password.length < 6
            ? 'password'
            : 'dob',
      };
    case 'dob':
      return {
        ...state,
        dob: action.payload,
      };
    case 'showDate':
      return {
        ...state,
        showDate: true,
      };
    case 'hideDate':
      return {
        ...state,
        showDate: false,
      };
    case 'dobNavigate':
      return {
        ...state,
        dobNavigate: state.dob == '' ? true : false,
        current: state.dob !== '' ? 'name' : 'dob',
      };
    case 'name':
      return {
        ...state,
        name: action.payload,
        nameNavigate: false,
      };
    case 'nameNavigate':
      return {
        ...state,
        nameNavigate: state.name == '' ? true : false,
        current: state.name !== '' ? 'userName' : 'name',
      };
    case 'userName':
      return {
        ...state,
        userName: action.payload,
        userNameNavigate: false,
      };
    case 'userNameNavigate':
      return {
        ...state,
        userNameNavigate: state.userName == '' ? true : false,
        current: state.userName !== '' ? 'agreement' : 'userName',
      };
    case 'signWithEmail':
      return {
        ...state,
        current: action.payload == 'emailSignUp' ? 'email' : 'number',
      };
    case 'email':
      return {
        ...state,
        email: action.payload,
        emailNavigate: false,
      };
    case 'emailNavigate':
      const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return {
        ...state,
        emailNavigate: validEmail.test(state.email) ? false : true,
        current: validEmail.test(state.email) ? 'emailConfirm' : 'email',
      };
    case 'withNumber':
      return {
        ...state,
        current: action.payload == 'numberNav' ? 'number' : 'email',
      };
    case 'emailConfirm':
      return {
        ...state,
        emailConfirm: action.payload,
        emailConfirmNavigate: false,
      };
    case 'emailConfirmNavigate':
      return {
        ...state,
        emailConfirmNavigate: state.emailConfirm == '' ? true : false,
        current: state.emailConfirm !== '' ? 'password' : 'emailConfirm',
      };
    case 'goBack':
      return {
        ...state,
        current: action.payload,
      };
    case 'backToAgreement':
      return {
        ...state,
        modalVisible: action.payload == 'backToAgreement' ? false : true,
      };
    case 'openService':
      return {
        ...state,
        modalVisible: true,
        services: action.payload == 'services' ? true : false,
        terms: action.payload == 'terms' ? true : false,
        privacy: action.payload == 'privacy' ? true : false,
        cookies: action.payload == 'cookies' ? true : false,
      };
  }
};

const SignUp = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const reduxDispatch = useDispatch();
  const [buffer, setBuffer] = useState(false);
  const navigation = useNavigation();
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  const navigateToHome = () => {
    setBuffer(true);
    const userData = {
      name: state.name,
      userName: state.userName,
      email: state.email,
      password: state.password,
      dob: state.dob,
      number: state.number,
    };
    reduxDispatch(setUserData(userData));
    setTimeout(() => {
      navigation.navigate('Login');
      setBuffer(false);
    }, 2000);
  };
  return (
    <LinearGradient
      colors={['black', '#36454F']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1, padding: 10}}>
      <Box mt={5}>
        {state.current == 'number' ? (
          <Box>
            {/* number section */}
            <Box mt="2">
              <Text fontWeight="bold" color="white" fontSize="2xl">
                What's your mobile
              </Text>
              <Text fontWeight="bold" color="white" fontSize="2xl">
                number?
              </Text>
              <Box mt="2">
                <Text fontSize="sm" color="white">
                  Enter the mobile number on which you can be contacted. No one
                  will see this on your profile.
                </Text>
              </Box>
              <HStack mt="5">
                <Box p={2}>
                  <Text color={'white'}>+91</Text>
                </Box>
                <TextInput
                  keyboardType={'numeric'}
                  value={state.number}
                  onChangeText={text => {
                    dispatch({type: 'number', payload: text});
                  }}
                  placeholderTextColor="white"
                  style={{
                    borderWidth: 1,
                    width: '82%',
                    borderRadius: 8,
                    padding: 12,
                    borderColor: '#96DED1',
                    color: state.numberNavigate == true ? 'red.500' : 'white',
                  }}
                  placeholder="Mobile number"
                />
                {state.numberNavigate == true ? (
                  <Box
                    alignItems={'center'}
                    justifyContent={'center'}
                    position={'absolute'}
                    right={'5%'}
                    p={'2'}>
                    <Icon name="warning" color={'#ff0000'} size={22}></Icon>
                  </Box>
                ) : (
                  ''
                )}
              </HStack>
              {state.numberNavigate == true ? (
                <Box>
                  <Text color={'red.500'} fontWeight={'bold'}>
                    Please fill the number correctly
                  </Text>
                </Box>
              ) : (
                ''
              )}
              <Box>
                <Text fontSize="xs" color="white">
                  You may recesive SMS notifications from us for security and
                  login purpose.
                </Text>
              </Box>
              <Box mt="3">
                <Button
                  onPress={() => {
                    dispatch({type: 'startBuffer', payload: 'numberBuffering'});
                    setTimeout(() => {
                      dispatch({type: 'numberNavigate'});
                      dispatch({type: 'stopBuffer'});
                    }, 1000);
                  }}
                  rounded="full"
                  w="100%"
                  bg="blue.600">
                  {state.numberBuffer == true ? (
                    <Spinner color={'blue.400'} size={'sm'} />
                  ) : (
                    'Next'
                  )}
                </Button>
              </Box>
              <Box mt="2">
                <Pressable
                  onPress={() => {
                    dispatch({
                      type: 'startBuffer',
                      payload: 'navToEmailBuffering',
                    });
                    setTimeout(() => {
                      dispatch({type: 'signWithEmail', payload: 'emailSignUp'});
                      dispatch({type: 'stopBuffer'});
                    }, 1000);
                  }}
                  w="100%"
                  p={'3%'}
                  borderRadius={20}
                  borderWidth={1}
                  borderColor="gray.400"
                  alignItems="center"
                  justifyContent="center">
                  {state.navToEmail == true ? (
                    <Spinner color={'blue.400'} />
                  ) : (
                    <Text color="white">Sign up with email address</Text>
                  )}
                </Pressable>
              </Box>
              <Box py={'31%'}>
                <Pressable onPress={navigateToLogin} alignItems="center">
                  <Text mb={'1%'} color="blue.300">
                    I already have an account
                  </Text>
                </Pressable>
              </Box>
            </Box>
          </Box>
        ) : state.current == 'password' ? (
          <Box>
            {/* password section */}
            <Box>
              <Pressable
                onPress={() => {
                  dispatch({type: 'goBack', payload: 'number'});
                }}>
                <Icon name="arrow-back" color="white" size={20}></Icon>
              </Pressable>
            </Box>
            <Box>
              <Box mt="2">
                <Text color="white" fontSize="2xl" fontWeight="bold">
                  Create a password
                </Text>
              </Box>
              <Box mt="2">
                <Text color="white" fontSize="sm">
                  Create a password with at least 6 letter or numbers. It should
                  be something that others can't guess.
                </Text>
              </Box>
              <HStack mt="5">
                <TextInput
                  value={state.password}
                  onChangeText={text => {
                    dispatch({type: 'password', payload: text});
                  }}
                  style={{
                    borderWidth: 1,
                    width: '100%',
                    borderRadius: 8,
                    padding: 12,
                    borderColor: '#96DED1',
                    color: state.passNavigate == true ? 'red' : 'white',
                  }}
                  placeholderTextColor={'gray'}
                  placeholder="Password"
                />
                {state.passNavigate == true ? (
                  <Box
                    alignItems={'center'}
                    justifyContent={'center'}
                    position={'absolute'}
                    right={'5%'}
                    p={'2'}>
                    <Icon name="warning" color={'#ff0000'} size={22}></Icon>
                  </Box>
                ) : (
                  ''
                )}
              </HStack>
              {state.passNavigate == true ? (
                <Box>
                  <Text color={'red.500'} fontWeight={'bold'}>
                    Please fill the code correctly
                  </Text>
                </Box>
              ) : (
                ''
              )}
              <Box mt="1">
                <Button
                  onPress={() => {
                    dispatch({type: 'startBuffer', payload: 'passBuffering'});
                    setTimeout(() => {
                      dispatch({type: 'passNavigate'});
                      dispatch({type: 'stopBuffer'});
                    }, 1000);
                  }}
                  rounded="full"
                  bg="blue.600"
                  w="100%">
                  {state.passBuffer ? (
                    <Spinner color={'blue.400'}></Spinner>
                  ) : (
                    'Next'
                  )}
                </Button>
              </Box>
              <Box top="180" left="0.5">
                <Pressable
                  onPress={navigateToLogin}
                  alignItems="center"
                  justifyContent="center">
                  <Text color="blue.300">I already have an account</Text>
                </Pressable>
              </Box>
            </Box>
          </Box>
        ) : state.current == 'dob' ? (
          <Box>
            {/* dob section */}
            <Box>
              <Pressable
                onPress={() => {
                  dispatch({type: 'goBack', payload: 'dob'});
                }}>
                <Icon name="arrow-back" color="white" size={20}></Icon>
              </Pressable>
            </Box>
            <Box mt="2">
              <Text color="white" fontSize="2xl" fontWeight="bold">
                What's your date of birth?
              </Text>
            </Box>
            <Box mt="2">
              <Text color="white" fontSize="sm">
                Use your own date of birth even if this account is for a
                business, a pet or something else. No one will see this unless
                you choose to share it.
                <Text color="blue.300">
                  Why do i need to provide my date of birth?
                </Text>
              </Text>
            </Box>
            <Box>
              <HStack mt={'3'} alignItems="center" justifyContent="center">
                <TextInput
                  value={state.dob ? state.dob.toDateString() : ''}
                  style={{
                    borderWidth: 1,
                    width: '100%',
                    borderRadius: 8,
                    padding: 12,
                    borderColor: '#96DED1',
                    color: 'white',
                  }}
                  placeholderTextColor={'gray'}
                  placeholder={'Date of birth'}
                />
                <Pressable
                  position={'absolute'}
                  left="85%"
                  onPress={() => {
                    dispatch({type: 'showDate'});
                  }}>
                  <Icon color="#808080" name="calendar-today" size={24} />
                </Pressable>
              </HStack>
              {state.dobNavigate == true ? (
                <Box>
                  <Text color={'red.500'} fontWeight={'bold'}>
                    Please fill date of birth correctly
                  </Text>
                </Box>
              ) : (
                ''
              )}
              <Box>
                <Button
                  onPress={() => {
                    dispatch({type: 'startBuffer', payload: 'dobBuffering'});
                    setTimeout(() => {
                      dispatch({type: 'stopBuffer'});
                      dispatch({type: 'dobNavigate'});
                    }, 2000);
                  }}
                  rounded="full"
                  bg="blue.600"
                  w="100%">
                  {state.dobBuffer == true ? (
                    <Spinner color={'blue.400'} />
                  ) : (
                    'Next'
                  )}
                </Button>
              </Box>
              <Box top="170" left="0.5">
                <Pressable
                  onPress={navigateToLogin}
                  alignItems="center"
                  justifyContent="center">
                  <Text color="blue.300">I already have an account</Text>
                </Pressable>
              </Box>
              <Box>
                {state.showDate == true ? (
                  <DateTimePicker
                    value={state.dob || new Date()}
                    mode={state.mode}
                    display="spinner"
                    maximumDate={eighteenYearsAgo}
                    onChange={(event, selectedDate) => {
                      if (event.type === 'set' && selectedDate) {
                        dispatch({type: 'dob', payload: selectedDate});
                      }
                      dispatch({type: 'hideDate'});
                    }}
                  />
                ) : (
                  ''
                )}
              </Box>
            </Box>
          </Box>
        ) : state.current == 'name' ? (
          <Box>
            {/* name section */}
            <Box>
              <Pressable
                onPress={() => {
                  dispatch({type: 'goBack', payload: 'dob'});
                }}>
                <Icon name="arrow-back" color="white" size={20}></Icon>
              </Pressable>
            </Box>
            <Box mt="2">
              <Text color="white" fontSize="2xl" fontWeight="bold">
                What's your name?
              </Text>
            </Box>
            <HStack mt="5">
              <TextInput
                value={state.name}
                onChangeText={text => {
                  dispatch({type: 'name', payload: text});
                }}
                style={{
                  borderWidth: 1,
                  width: '100%',
                  borderRadius: 8,
                  padding: 12,
                  borderColor: '#96DED1',
                  color: 'white',
                }}
                placeholderTextColor={'gray'}
                placeholder="Full name"
              />
              {state.nameNavigate == true ? (
                <Box
                  alignItems={'center'}
                  justifyContent={'center'}
                  position={'absolute'}
                  right={'5%'}
                  p={'2'}>
                  <Icon name="warning" color={'#ff0000'} size={22}></Icon>
                </Box>
              ) : (
                ''
              )}
            </HStack>
            {state.nameNavigate == true ? (
              <Box>
                <Text color={'red.500'} fontWeight={'bold'}>
                  Please fill the name correctly
                </Text>
              </Box>
            ) : (
              ''
            )}
            <Box mt="1">
              <Button
                onPress={() => {
                  dispatch({type: 'startBuffer', payload: 'nameBuffering'});
                  setTimeout(() => {
                    dispatch({type: 'nameNavigate'});
                    dispatch({type: 'stopBuffer'});
                  }, 1000);
                }}
                rounded="full"
                bg="blue.600"
                w="100%">
                {state.nameBuffer == true ? (
                  <Spinner color={'blue.400'} />
                ) : (
                  'Next'
                )}
              </Button>
            </Box>
            <Box py={'83%'} left="0.5">
              <Pressable
                onPress={navigateToLogin}
                alignItems="center"
                justifyContent="center">
                <Text color="blue.300">I already have an account</Text>
              </Pressable>
            </Box>
          </Box>
        ) : state.current == 'userName' ? (
          <Box>
            {/* userName section */}
            <Box>
              <Pressable
                onPress={() => {
                  dispatch({type: 'goBack', payload: 'name'});
                }}>
                <Icon name="arrow-back" color="white" size={20}></Icon>
              </Pressable>
            </Box>
            <Box mt="2">
              <Text color="white" fontSize="2xl" fontWeight="bold">
                Create a username
              </Text>
            </Box>
            <Box mt="2">
              <Text color="white">
                Add a username or use our suggestion. You can change this at any
                time.
              </Text>
            </Box>
            <HStack mt="5">
              <TextInput
                value={state.userName}
                onChangeText={text => {
                  dispatch({type: 'userName', payload: text});
                }}
                style={{
                  borderWidth: 1,
                  width: '100%',
                  borderRadius: 8,
                  padding: 12,
                  borderColor: '#96DED1',
                  color: 'white',
                }}
                placeholderTextColor={'gray'}
                placeholder="Username"
              />
              {state.userNameNavigate == true ? (
                <Box
                  alignItems={'center'}
                  justifyContent={'center'}
                  position={'absolute'}
                  right={'5%'}
                  p={'2'}>
                  <Icon name="warning" color={'#ff0000'} size={22}></Icon>
                </Box>
              ) : (
                ''
              )}
            </HStack>
            {state.userNameNavigate == true ? (
              <Box>
                <Text color={'red.500'} fontWeight={'bold'}>
                  Please fill the username correctly
                </Text>
              </Box>
            ) : (
              ''
            )}
            <Box mt="1">
              <Button
                onPress={() => {
                  dispatch({type: 'startBuffer', payload: 'userNameBuffering'});
                  setTimeout(() => {
                    dispatch({type: 'userNameNavigate'});
                    dispatch({type: 'stopBuffer'});
                  }, 1000);
                }}
                rounded="full"
                bg="blue.600"
                w="100%">
                {state.userNameBuffer == true ? (
                  <Spinner color={'blue.400'} />
                ) : (
                  'Next'
                )}
              </Button>
            </Box>
            <Box py="67%" left="0.5">
              <Pressable
                onPress={navigateToLogin}
                alignItems="center"
                justifyContent="center">
                <Text color="blue.300">I already have an account</Text>
              </Pressable>
            </Box>
          </Box>
        ) : state.current == 'agreement' ? (
          <Box>
            {/* Agreement section */}
            <Box>
              <Pressable
                onPress={() => {
                  dispatch({type: 'goBack', payload: 'userName'});
                }}>
                <Icon name="arrow-back" color="white" size={20}></Icon>
              </Pressable>
            </Box>
            <Box mt="2">
              <Text color="white" fontSize="2xl" fontWeight="bold">
                Agree to PhotoApp terms and policies
              </Text>
            </Box>
            <Box mt="2">
              <Text color="white" fontSize="sm">
                People who use our service may have uploaded your contact
                information to PhotoApp.{' '}
                <Pressable>
                  <Text
                    color="blue.300"
                    onPress={() => {
                      dispatch({type: 'openService', payload: 'services'});
                    }}>
                    Learn more
                  </Text>
                </Pressable>
              </Text>
            </Box>
            <Box>
              <HStack flexWrap="wrap">
                <Text mt="3" color="white" fontSize="sm">
                  By tapping <Text fontWeight={'bold'}> I agree </Text> you
                  agree to create an account and to PhotoApp{' '}
                  <Text
                    color="blue.300"
                    onPress={() => {
                      dispatch({type: 'openService', payload: 'terms'});
                    }}>
                    {' '}
                    Terms
                  </Text>
                  ,{' '}
                  <Text
                    color="blue.300"
                    onPress={() => {
                      dispatch({type: 'openService', payload: 'privacy'});
                    }}>
                    {' '}
                    Privacy Policy{' '}
                  </Text>
                  <Text>and </Text>
                  <Text
                    color="blue.300"
                    onPress={() => {
                      dispatch({type: 'openService', payload: 'cookies'});
                    }}>
                    {' '}
                    Cookies Policy
                  </Text>
                  .
                </Text>
              </HStack>
            </Box>
            <Box mt="3">
              <Button
                onPress={navigateToHome}
                rounded="full"
                bg="blue.600"
                w="100%">
                {buffer === true ? <Spinner color={'blue.400'} /> : 'I agree'}
              </Button>
            </Box>
            <Box py={'50%'} left="0.5">
              <Pressable
                onPress={navigateToLogin}
                alignItems="center"
                justifyContent="center">
                <Text color="blue.300">I already have an account</Text>
              </Pressable>
            </Box>
            <Box>
              <Modal
                transparent={false}
                animationType={'slide'}
                visible={state.modalVisible}>
                <ScrollView>
                  <Box p={3}>
                    {state.services == true ? (
                      <Box>
                        <Text fontWeight={"bold"} fontSize={20}>-------------Some Content------------</Text>
                      </Box>
                    ) : state.terms == true ? (
                      <Box>
                        <Text fontWeight={"bold"} fontSize={20}>-------------Some Content------------</Text>
                      </Box>
                    ) : state.privacy ? (
                      <Box>
                        <Text fontWeight={"bold"} fontSize={20}>-------------Some Content------------</Text>
                      </Box>
                    ) : state.cookies == true ? (
                      <Box>
                        <Text fontWeight={"bold"} fontSize={20}>-------------Some Content------------</Text>
                      </Box>
                    ) : (
                      ''
                    )}
                    <Box mt={3}>
                      <Button
                        onPress={() => {
                          dispatch({
                            type: 'backToAgreement',
                            payload: 'backToAgreement',
                          });
                        }}
                        rounded={'full'}>
                        Go Back
                      </Button>
                    </Box>
                  </Box>
                </ScrollView>
              </Modal>
            </Box>
          </Box>
        ) : state.current == 'email' ? (
          <Box>
            {/* signup with email section */}
            <Box>
              <Pressable
                onPress={() => {
                  dispatch({type: 'goBack', payload: 'number'});
                }}>
                <Icon name="arrow-back" color="white" size={20}></Icon>
              </Pressable>
            </Box>
            <Box mt="2">
              <Text color="white" fontSize="2xl" fontWeight="bold">
                What's your email address?
              </Text>
            </Box>
            <Box mt="2">
              <Text color="white" fontWeight={'bold'} fontSize="sm">
                Enter the email address at which you can be contacted. No one
                will see this on your profile.
              </Text>
            </Box>
            <HStack mt="5">
              <TextInput
                keyboardType="email-address"
                value={state.email}
                onChangeText={text => {
                  dispatch({type: 'email', payload: text});
                }}
                style={{
                  borderWidth: 1,
                  width: '100%',
                  borderRadius: 8,
                  padding: 12,
                  borderColor: '#96DED1',
                  color: state.emailNavigate == true ? 'red.500' : 'white',
                }}
                placeholderTextColor={'gray'}
                placeholder="Email address"
              />
              {state.emailNavigate == true ? (
                <Box
                  alignItems={'center'}
                  justifyContent={'center'}
                  position={'absolute'}
                  right={'5%'}
                  p={'2'}>
                  <Icon name="warning" color={'#ff0000'} size={22}></Icon>
                </Box>
              ) : (
                ''
              )}
            </HStack>
            {state.emailNavigate == true ? (
              <Box>
                <Text color={'red.500'} fontWeight={'bold'}>
                  Please fill the email correctly
                </Text>
              </Box>
            ) : (
              ''
            )}
            <Box mt="2">
              <Button
                onPress={() => {
                  dispatch({type: 'startBuffer', payload: 'emailBuffering'});
                  setTimeout(() => {
                    dispatch({type: 'emailNavigate'});
                    dispatch({type: 'stopBuffer'});
                  }, 2000);
                }}
                rounded="full"
                bg="blue.600"
                w="100%">
                {state.emailBuffer == true ? (
                  <Spinner color={'blue.400'}></Spinner>
                ) : (
                  'Next'
                )}
              </Button>
            </Box>
            <Box mt="2">
              <Pressable
                onPress={() => {
                  dispatch({
                    type: 'startBuffer',
                    payload: 'emailBackBuffering',
                  });
                  setTimeout(() => {
                    dispatch({type: 'withNumber', payload: 'numberNav'});
                    dispatch({
                      type: 'stopBuffer',
                    });
                  }, 2000);
                }}
                borderWidth={1}
                borderColor="gray.400"
                alignItems="center"
                justifyContent="center"
                h="32%"
                rounded="full"
                w="100%">
                {state.emailBackBuffer == true ? (
                  <Spinner color={'blue.400'} />
                ) : (
                  <Text color="white" fontWeight="bold">
                    Sign up with Mobile Number
                  </Text>
                )}
              </Pressable>
            </Box>
            <Box top={'15%'} left="0.5">
              <Pressable
                onPress={navigateToLogin}
                alignItems="center"
                justifyContent="center">
                <Text color="blue.300">I already have an account</Text>
              </Pressable>
            </Box>
          </Box>
        ) : (
          <Box>
            {/* Email confirmation section */}
            <Box>
              <Pressable
                onPress={() => {
                  dispatch({type: 'goBack', payload: 'email'});
                }}>
                <Icon name="arrow-back" color="white" size={20}></Icon>
              </Pressable>
            </Box>
            <Box mt={'3'}>
              <Text color={'white'} fontSize={'2xl'} fontWeight={'bold'}>
                Enter the confirmation
              </Text>
              <Text color={'white'} fontSize={'2xl'} fontWeight={'bold'}>
                code
              </Text>
            </Box>
            <Box mt={'2'}>
              <Text color={'white'} fontWeight={'bold'}>
                To confirm your account, enter the 6-digit code that we sent to
                subhamkmr726@gmail.com
              </Text>
            </Box>
            <HStack mt={'3'}>
              <TextInput
                value={state.emailConfirm}
                onChangeText={text => {
                  dispatch({type: 'emailConfirm', payload: text});
                }}
                style={{
                  borderWidth: 1,
                  width: '100%',
                  borderRadius: 8,
                  padding: 12,
                  borderColor: '#96DED1',
                  color: state.emailNavigate == true ? 'red.500' : 'white',
                }}
                placeholderTextColor={'gray'}
                placeholder={'Confirmation code'}
              />
              {state.emailConfirmNavigate == true ? (
                <Box
                  alignItems={'center'}
                  justifyContent={'center'}
                  position={'absolute'}
                  right={'5%'}
                  p={'2'}>
                  <Icon name="warning" color={'#ff0000'} size={22}></Icon>
                </Box>
              ) : (
                ''
              )}
            </HStack>
            {state.emailConfirmErr == true ||
            state.emailConfirmNavigate == true ? (
              <Box>
                <Text color={'red.500'} fontWeight={'bold'}>
                  Please fill the code correctly
                </Text>
              </Box>
            ) : (
              ''
            )}
            <Box mt={'1'}>
              <Button
                onPress={() => {
                  dispatch({type: 'startBuffer', payload: 'confirmBuffering'});
                  setTimeout(() => {
                    dispatch({type: 'emailConfirmNavigate'});
                    dispatch({type: 'stopBuffer'});
                  }, 2000);
                }}
                w={'100%'}
                bg={'blue.600'}
                rounded={'full'}>
                {state.confirmBuffer == true ? (
                  <Spinner color={'blue.400'} />
                ) : (
                  'Next'
                )}
              </Button>
            </Box>
            <Box mt={'2'}>
              <Pressable
                w={'100%'}
                h={'32%'}
                borderColor={'gray.400'}
                borderWidth={'1'}
                alignItems={'center'}
                justifyContent={'center'}
                rounded={'full'}>
                <Text color={'white'} fontWeight={'bold'}>
                  I did ' t receive the code
                </Text>
              </Pressable>
            </Box>
          </Box>
        )}
      </Box>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {fontSize: 40, color: 'white'},
  text: {color: 'white', marginBottom: 20},
});

export default SignUp;
