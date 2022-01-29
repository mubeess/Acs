import React, {useState, useEffect, useContext} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TouchableOpacity,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Linking,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Input, Icon, Button, Text, Spinner} from '@ui-kitten/components';
import AppContext from '../../Context/app/appContext';
import Modal from 'react-native-modal';

const deviceHeight = Dimensions.get('window').height;

function Login(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [forgotPassOpen, setForgotPassOpen] = useState(false);
  const [forgotUser, setForgotUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const appProps = useContext(AppContext);

  const storeStaff = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('STAFF', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const storeStaffToken = async value => {
    try {
      await AsyncStorage.setItem('STAFF_TOKEN', value);
    } catch (e) {
      // saving error
    }
  };

  const getStaff = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('STAFF');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getStaffToken = async () => {
    try {
      const value = await AsyncStorage.getItem('STAFF_TOKEN');
      return value != null ? value : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    const loggedInstaff = getStaff();
    const staffToken = getStaffToken();
    console.log('he', loggedInstaff);
    console.log('he------', staffToken);

    if (loggedInstaff.STAFF && loggedInstaff.STAFF.userId !== null) {
      setIsLoggedIn(true);
      appProps.setStaff(loggedInstaff);
      props.navigation.navigate('Dashboard');
    }
  }, []);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#3465ff',
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
        style={styles.container}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#3465ff" />
          <View style={styles.blueBg}></View>
          <View style={styles.mainInp}>
            <Text
              style={{
                textAlign: 'center',
                color: '#3465ff',
                marginTop: 60,
              }}
              appearance="hint">
              LOGIN ACRS
            </Text>

            <Input
              onChangeText={text => {
                setUserName(text);
              }}
              accessoryRight={<Icon name="person-outline" />}
              style={styles.input}
              textAlign="center"
              placeholder="User Name"
            />

            <Input
              onChangeText={text => {
                setPassword(text);
              }}
              textAlign="center"
              style={styles.input}
              placeholder="Password"
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
            />
            <Button
              onPress={() => {
                if (userName == '' || password == '') {
                  return Alert.alert(
                    'Error',
                    'Username or Password not entered!',
                    [
                      {
                        text: 'Back',
                        style: 'cancel',
                      },
                    ],
                  );
                } else {
                  setLoading(true);
                  const myUser = {
                    username: userName,
                    password,
                  };
                  fetch('https://tim-acs.herokuapp.com/staff/login', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(myUser),
                  })
                    .then(res => {
                      res
                        .json()
                        .then(data => {
                          if (data.success == true) {
                            storeStaff(data.newUser);
                            appProps.setStaff(data.newUser);
                            props.navigation.navigate('Dashboard');
                            setLoading(false);
                          } else {
                            Alert.alert(
                              'Error',
                              'Username or Password incorrect',
                              [
                                {
                                  text: 'Back',
                                  style: 'cancel',
                                },
                              ],
                            );
                            setLoading(false);
                          }
                        })
                        .catch(err => {
                          setLoading(false);
                        });
                    })
                    .catch(err => {
                      setLoading(false);
                    });
                }

                //  props.navigation.navigate('Dashboard')
              }}
              style={styles.button}
              appearance="filled"
              status="primary">
              Login
            </Button>
            <View style={styles.hint}>
              <Text
                style={{
                  marginLeft: 'auto',
                }}
                appearance="hint"></Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  // Linking.openURL('mailto:mubarakibrahim2015@gmail.com?subject=Help')
                  setForgotPassOpen(true);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginLeft: 10,
                    fontWeight: 'bold',
                    color: '#3465ff',
                    marginRight: 'auto',
                  }}
                  appearance="hint">
                  Forgot password
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.mainImage}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Modal
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        coverScreen={true}
        isVisible={isLoading}
        animationIn="fadeIn"
        animationOut="fadeOutDown">
        <Spinner status="basic" />
      </Modal>

      <Modal
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        coverScreen={true}
        isVisible={forgotPassOpen}
        animationIn="fadeIn"
        animationOut="fadeOutDown">
        <View
          style={{
            height: 230,
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 10,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.24,

            elevation: 10,
            shadowColor: '#f9f9f9',
            padding: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              setForgotPassOpen(false);
            }}>
            <Icon
              style={{
                height: 30,
                width: 30,
              }}
              fill="#000000"
              name="arrow-back-outline"
            />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
            }}>
            Reset Password
          </Text>
          <Input
            label="enter your username"
            onChangeText={text => {
              setForgotUser(text);
            }}
            accessoryRight={<Icon name="person-outline" />}
            style={styles.input}
            textAlign="center"
            placeholder="User Name"
          />

          <Button
            onPress={() => {
              if (forgotUser == '') {
                return Alert.alert('Error', 'Username is empty', [
                  {
                    text: 'Back',
                    style: 'cancel',
                  },
                ]);
              } else {
                setLoading(true);
                fetch(
                  `https://tim-acs.herokuapp.com/admin/forget-password/?username=${forgotUser}`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  },
                )
                  .then(res => {
                    res
                      .json()
                      .then(data => {
                        setLoading(false);
                        if (data.success == true) {
                          Alert.alert(
                            'Successfuly Reset',
                            'Password successfully reset and sent to your mail',
                            [
                              {
                                text: 'Back',
                                style: 'cancel',
                              },
                            ],
                          );
                          setForgotUser('');
                          setForgotPassOpen(false);
                        } else {
                          Alert.alert('Error', 'Something went wrong!', [
                            {
                              text: 'Back',
                              style: 'cancel',
                            },
                          ]);
                          setLoading(false);
                        }
                      })
                      .catch(err => {
                        setLoading(false);
                      });
                  })
                  .catch(err => {
                    setLoading(false);
                  });
              }

              //  props.navigation.navigate('Dashboard')
            }}
            style={{
              width: '80%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 10,
            }}>
            Reset Password
          </Button>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: 70,
    height: 70,
  },
  input: {
    width: '80%',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
  },
  button: {
    width: '80%',
    marginTop: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    backgroundColor: '#3465ff',
  },
  hint: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  blueBg: {
    position: 'absolute',
    height: deviceHeight / 2,
    width: '100%',
    backgroundColor: '#3465ff',
    borderBottomLeftRadius: deviceHeight / 5,
    borderBottomRightRadius: deviceHeight / 5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 0.34,

    elevation: 10,
  },
  mainInp: {
    position: 'absolute',
    height: deviceHeight / 1.6,
    backgroundColor: '#ffffff',
    marginTop: deviceHeight / 4,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 0.34,

    elevation: 10,
    borderRadius: 10,
  },
  mainImage: {
    width: 100,
    height: 100,
    backgroundColor: '#ffffff',
    position: 'absolute',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.24,

    elevation: 10,
    marginTop: deviceHeight / 4 - 50,
    zIndex: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Login;
