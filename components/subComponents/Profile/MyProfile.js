import React, {useContext, useState} from 'react';
import {
  Avatar,
  Divider,
  Icon,
  Input,
  Text,
  Button,
  Spinner,
} from '@ui-kitten/components';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import AppContext from '../../../Context/app/appContext';
import axios from 'axios';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
function MyProfile(props) {
  const appProps = useContext(AppContext);
  const [firstName, setFName] = useState('');
  const [lastName, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setEmail] = useState('');
  const [selectedPic, setSelectedPic] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const imageUrl = appProps.staff.image;
  const createFormData = photo => {
    const data = new FormData();
    console.log('++++', photo);
    // data.append('image', {
    //     name: 'profilePic',
    //     type: `image/${fileType}`,
    //     uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    //   });
    data.append('photo', {
      name: 'profile_pic',
      type: 'image/jpeg',
      uri: photo.uri,
    });

    data.append('id', 1);
    return data;
  };

  const logoutStaff = async () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('STAFF');
          } catch (e) {
            // remove error
          }
          console.log('Done.');
          props.navigation.navigate('Login');
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.nav}>
        <Text
          category="h6"
          style={{
            fontWeight: 'bold',
            color: 'black',
          }}>
          Profile
        </Text>
      </View>
      <Divider style={{width: '100%'}} />
      <View
        style={{
          backgroundColor: '#ffffff',
          // borderBottomLeftRadius:200,
          // borderBottomRightRadius:200,
          height: 300,
        }}>
        <View style={styles.avatar}>
          <Avatar
            style={{
              height: 70,
              width: 70,
              marginTop: 3,
            }}
            size="giant"
            source={{uri: `${imageUrl}`}}
          />

          <TouchableOpacity
            onPress={async () => {
              launchImageLibrary(
                {
                  mediaType: 'photo',
                },
                response => {
                  console.log('Response = ', response.assets);
                  // setSelectedPic(response.assets[0])

                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.error) {
                    console.log('ImagePicker Error:', response.error);
                  } else {
                    setLoading(true);

                    const createImg = new FormData();

                    createImg.append('profile_pic', {
                      name: 'profile',
                      type: `${response.assets[0].type}`,
                      uri:
                        Platform.OS === 'ios'
                          ? response.assets[0].uri.replace('file://', '')
                          : response.assets[0].uri,
                    });

                    axios({
                      method: 'PUT',
                      url: `https://tim-acs.herokuapp.com/staff/save-staff-profile-pic?username=${appProps.staff.username}`,
                      data: createImg,
                    }).then(data => {
                      setLoading(false);
                      if (data.data.success == true) {
                        appProps.setStaff(data.data.message);
                        Alert.alert('Profile Pic Updated', 'Updated', [
                          {
                            text: 'Back',
                            style: 'cancel',
                          },
                        ]);
                      } else {
                        Alert.alert('Error', 'An error occured', [
                          {
                            text: 'Back',
                            style: 'cancel',
                          },
                        ]);
                      }
                    });
                  }
                },
              );
            }}
            style={{
              marginTop: 'auto',
              marginBottom: 30,
            }}>
            <Icon
              style={{
                width: 20,
                height: 20,
              }}
              fill="blue"
              name="cloud-upload"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.text}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {appProps.staff.firstName} {appProps.staff.lastName}
          </Text>
        </View>

        <View style={styles.text}>
          <Text
            style={{
              fontWeight: '400',
            }}>
            {appProps.staff.username}
          </Text>
        </View>

        <View style={styles.text}>
          <Text
            style={{
              fontWeight: '200',
              fontSize: 12,
            }}>
            {appProps.staff.phone}
          </Text>
        </View>
        <View style={styles.logout}>
          <Text
            onPress={logoutStaff}
            style={{
              fontSize: 15,
              color: 'white',
              fontWeight: '600',
            }}>
            Logout
          </Text>
        </View>
        <Image
          style={{
            marginTop: -40,
            width: '100%',
          }}
          source={require('../../assets/curve.png')}></Image>
      </View>

      {/* ************************************************************************************ */}
      <View
        style={{
          backgroundColor: '#ffffff',
          height: Dimensions.get('window').height - 300,
          // borderTopLeftRadius:100
        }}>
        <Input
          accessoryLeft={<Icon name="person-outline" />}
          onChangeText={txt => {
            setFName(txt);
          }}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          defaultValue={appProps.staff.firstName}
        />

        <Input
          accessoryLeft={<Icon name="person-outline" />}
          onChangeText={txt => {
            setLName(txt);
          }}
          style={{
            marginTop: 5,
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          defaultValue={appProps.staff.lastName}
        />

        <Input
          accessoryLeft={<Icon name="phone-outline" />}
          onChangeText={txt => {
            setPhone(txt);
          }}
          style={{
            marginTop: 5,
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          defaultValue={appProps.staff.phone}
        />

        <Input
          accessoryLeft={<Icon name="email-outline" />}
          onChangeText={txt => {
            setEmail(txt);
          }}
          style={{
            marginTop: 5,
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          defaultValue={appProps.staff.email}
        />
        <Button
          onPress={() => {
            setLoading(true);
            const obj = {
              firstName,
              lastName,
              phone,
              email: mail,
            };
            !firstName ? delete obj.firstName : null;
            !lastName ? delete obj.lastName : null;
            !phone ? delete obj.phone : null;
            !mail ? delete obj.email : null;

            console.log(obj);
            fetch(
              `https://tim-acs.herokuapp.com/staff/edit-staff?username=${appProps.staff.username}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
              },
            )
              .then(res => {
                res
                  .json()
                  .then(data => {
                    if (data.success) {
                      Alert.alert('Profile Updated', 'Updated', [
                        {
                          text: 'Back',
                          style: 'cancel',
                        },
                      ]);
                      appProps.setStaff(data.message);
                      setLoading(false);
                    } else {
                      Alert.alert('Error', 'An error occured', [
                        {
                          text: 'Back',
                          style: 'cancel',
                        },
                      ]);
                      setLoading(false);
                    }
                    console.log(data);
                  })
                  .catch(err => {
                    setLoading(false);
                    console.log(err);
                  });
              })
              .catch(err => {
                setLoading(false);
                console.log(err);
              });
          }}
          style={{
            marginTop: 20,
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#3465ff',
          }}>
          Update Profile
        </Button>
      </View>

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
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3465ff',
    display: 'flex',
    flex: 1,
  },
  nav: {
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  avatar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 80,
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  logout: {
    borderRadius: 9,
    backgroundColor: '#238de6',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    color: 'white',
    width: 'auto',
    marginLeft: 'auto',
    textAlign: 'center',
    marginRight: 'auto',
    // position: 'absolute',
    zIndex: 100,
  },
});
export default MyProfile;
