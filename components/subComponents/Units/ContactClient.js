import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  Input,
  Spinner,
  Text,
} from '@ui-kitten/components';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';

import AppContext from '../../../Context/app/appContext';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import CallDetectorManager from 'react-native-call-detection'
import Modal from 'react-native-modal';

function ContactClient(props) {
  const [isLoading, setLoading] = useState(false);
  const appProps = useContext(AppContext);
  const [callDuration, setCallDuration] = useState(0);
  const [mainCallDuration, setMainCallDuration] = useState(0);
  const [text, setText] = useState('');
  const [listData, setListDate] = useState([]);
  const [myClient, setMyclient] = useState([]);
  const imageUrl = appProps.staff.image;
  const [callStartTime, setCallStartTime] = useState([]);
  const [callEndTime, setCallEndTime] = useState([]);
  useEffect(() => {
    fetch(
      `https://tim-acs.herokuapp.com/staff/get-client-demographic/?clientId=${appProps.currentAlert.clientId}`,
    ).then(res => {
      res.json().then(data => {
        setMyclient([data.clientDemographic]);
      });
    });
  }, []);

  useEffect(() => {
    if (isLoading || !isLoading) {
      console.log('loading Status: ', isLoading);
    }
    console.log('call duration ', callDuration);
    console.log('main durantion', mainCallDuration);
    console.log('call start', callStartTime);
    console.log('call ednt', callEndTime);
  }, [callDuration, mainCallDuration, text, callStartTime, callEndTime]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}>
        <Icon
          style={{
            width: 25,
            height: 25,
            marginLeft: 20,
          }}
          name="arrow-back-outline"
          fill="#3465ff"></Icon>
      </TouchableOpacity>
      <View style={styles.info}>
        <Text
          style={{
            color: '#3a3b3c',
            fontSize: 15,
          }}>
          Contact Client
        </Text>
        <View
          style={{
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 40,
            marginBottom: 20,
          }}>
          <Image
            style={styles.logo}
            source={{
              uri:
                myClient.length > 0 && myClient[0].image !== '1.jpg'
                  ? `${myClient[0].image}`
                  : 'https://picsum.photos/200',
            }}
          />
          <Text
            style={{
              color: '#3a3b3c',
              fontSize: 12,
            }}
            status="basic">
            {myClient.length > 0 ? myClient[0].fullName : ''}
          </Text>
        </View>
      </View>

      <Divider style={{width: '100%'}} />
      <View
        style={{
          height: 30,
          backgroundColor: '#3465ff',
          width: '100%',
        }}>
        {/* <Text style={{marginLeft:20,fontWeight:'400'}} appearance='hint' category='label'>Action Type</Text>
         <Text style={{paddingLeft:20,backgroundColor:'#3465ff',marginRight:20,color:'white',width:'100%'}}>Dispatch Mobile Unit</Text> */}
      </View>
      {/* <View style={{
                marginTop:10

}}>
<Text style={{marginLeft:20,fontWeight:'400'}} appearance='hint' category='label'>Action Type</Text>
<Text style={{paddingLeft:20,backgroundColor:'#3465ff',marginRight:20,color:'white',width:'100%'}}>Contact Client</Text>
</View>
            <Divider style={{width:'100%',marginTop:10}}/> */}
      <ScrollView style={styles.history}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Text style={{marginLeft: 20}}>Client Demographics</Text>
          <Button
            onPress={() => {
              props.navigation.navigate('Edit');
            }}
            style={{
              marginLeft: '25%',
            }}
            size="tiny"
            appearance="filled"
            status="basic"
            accessoryLeft={<Icon name="edit-outline" />}>
            Edit
          </Button>
        </View>

        <View style={styles.clientDet}>
          <View style={styles.inpDet}>
            <Text
              style={[
                styles.inp,
                {
                  fontWeight: 'bold',
                },
              ]}>
              Name
            </Text>
            <Text style={styles.inp}>
              {myClient.length > 0 ? myClient[0].fullName : ''}
            </Text>
          </View>

          <View style={styles.inpDet}>
            <Text
              style={[
                styles.inp,
                {
                  fontWeight: 'bold',
                },
              ]}>
              Address
            </Text>
            <Text style={styles.inp}>
              {myClient.length > 0 ? myClient[0].clientLocation : ''}
            </Text>
          </View>
        </View>

        <View style={styles.clientDet}>
          <View style={styles.inpDet}>
            <Text
              style={[
                styles.inp,
                {
                  fontWeight: 'bold',
                },
              ]}>
              Client Code
            </Text>
            <Text style={styles.inp}>
              {myClient.length > 0 ? myClient[0].clientId : ''}
            </Text>
          </View>

          <View style={styles.inpDet}>
            <Text
              style={[
                styles.inp,
                {
                  fontWeight: 'bold',
                },
              ]}>
              Phone Number
            </Text>
            <Text style={styles.inp}>
              {myClient.length > 0 ? myClient[0].phone : ''}
            </Text>
          </View>
        </View>

        <View style={styles.clientDet}>
          <View style={styles.inpDet}>
            <Text
              style={[
                styles.inp,
                {
                  fontWeight: 'bold',
                },
              ]}>
              Risk Level
            </Text>
            <Text style={styles.inp}>
              {myClient.length > 0 && myClient[0].sud !== null
                ? myClient[0].sud.sudLevel > 50
                  ? 'High'
                  : 'Low'
                : ''}
            </Text>
          </View>

          <View style={styles.inpDet}>
            <Text
              style={[
                styles.inp,
                {
                  fontWeight: 'bold',
                },
              ]}>
              SUD Level
            </Text>
            <Text style={styles.inp}>
              {myClient.length > 0
                ? myClient[0].sud !== null
                  ? myClient[0].sud.sudLevel
                  : ''
                : ''}
            </Text>
          </View>
        </View>
      </ScrollView>
      <Divider style={{width: '100%'}} />
      <Text
        style={[
          styles.inp,
          {
            fontWeight: 'bold',
          },
        ]}>
        Location
      </Text>
      <View style={styles.map}>
        <Text
          style={{
            width: '70%',
            marginLeft: 20,
            borderBottomColor: 'black',
            borderColor: 'gray',
            borderRightWidth: 1,
          }}>
          {myClient.length > 0 && myClient[0].clientLocation}
        </Text>
        <Button
          onPress={() => {
            Linking.openURL(
              'https://www.google.com/maps/place/9.2740331,12.4387026',
            );
          }}
          size="tiny"
          appearance="filled"
          status="primary"
          accessoryLeft={<Icon name="globe-outline" />}>
          Map
        </Button>
      </View>
      <View style={styles.call}>
        <View style={styles.icon}>
        <Avatar
            style={{
              height: 30,
              width: 30,
            }}
            source={{uri: `${imageUrl}`}}></Avatar>
          <Text style={{fontSize: 14}}>
            {appProps.staff.firstName} {appProps.staff.lastName}
          </Text>
        </View>

        <View style={styles.icon}>
          <Image
            style={styles.logo}
            source={{
              uri:
                myClient.length > 0 && myClient[0].image !== '1.jpg'
                  ? `${myClient[0].image}`
                  : 'https://picsum.photos/200',
            }}
          />
          <Text style={{marginTop: 10}}>
            {myClient.length > 0 ? myClient[0].phone : ''}
          </Text>
        </View>

        <View style={styles.icon}>
          {callDuration == 0 ? (
            <TouchableOpacity
              onPress={() => {
                const numberToCall = myClient.length > 0 && myClient[0].phone;
                if (numberToCall == '') {
                  Alert.alert(
                    'Missing Phone Number',
                    `No phone number was found on client's profile`,
                    [
                      {
                        text: 'Ok',
                        style: 'cancel',
                      },
                    ],
                  );
                  return null;
                }
                var sT, eT;
                sT = new Date();
                setCallStartTime(sT);
                RNImmediatePhoneCall.immediatePhoneCall(`${numberToCall}`);
                this.callDetector = new CallDetectorManager(
                  (event, phoneNumber) => {
                    if (event === 'Connected || Offhook') {
                      sT = new Date();
                      setCallStartTime(sT);
                    }
                    if (event === 'Disconnected') {
                      eT = new Date();
                      setCallEndTime(eT);
                      if (sT !== null && eT !== null) {
                        const timeDifference =
                          (eT.getTime() - sT.getTime()) / 1000;
                        setCallDuration(timeDifference);
                        setMainCallDuration(callDuration);
                      }
                      this.callDetector && this.callDetector.dispose();
                    }
                  },
                  false,
                  () => {
                    console.log('call error');
                  },
                  {
                    title: 'Phone State Permission',
                    message:
                      'This app needs access to your phone state in order to make and/or to recieve incoming calls.',
                  },
                );
              }}>
              <Icon
                style={{
                  height: 30,
                  width: 30,
                }}
                fill="green"
                name="phone-call-outline"
              />
            </TouchableOpacity>
          ) : (
            <Button
              size="tiny"
              onPress={() => {
                setLoading(true);
                const record = {
                  clientId: appProps.currentAlert.clientId,
                  clientActions: {
                    actionName: 'Contact Client',
                    staffId: appProps.staff.username,
                    staffName: appProps.staff.firstName + ' ' + appProps.staff.lastName,
                    documentation: '',
                    callDration: callDuration,
                  },
                };
                setText(`Last call duration is ${callDuration} Seconds`);
                setMainCallDuration(callDuration);

                fetch(
                  'https://tim-acs.herokuapp.com/staff/save-client-action',
                  {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(record),
                  },
                )
                  .then(res => {
                    res
                      .json()
                      .then(data => {
                        if (data.success) {
                          Alert.alert('Success', 'Successfuly saved', [
                            {
                              text: 'Back',
                              style: 'cancel',
                            },
                          ]);
                          setLoading(false);
                          props.navigation.goBack();
                        } else {
                          Alert.alert('Error', 'An error occured', [
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
                setCallDuration(0);
              }}>
              Save action
            </Button>
          )}
        </View>
      </View>
      <View style={styles.calling}>
        <Text>{callDuration ? 'Press The button to save action' : ''}</Text>
        <Text>{text}</Text>
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
      <Text
        style={{
          marginRight: 10,
          textAlign: 'center',
          fontSize: 12,
        }}>
        {callDuration ? `${text}` : 'Waiting for call'}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  arr: {
    marginLeft: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  subUser: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  history: {
    maxHeight: Dimensions.get('screen').height / 3,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  card: {
    width: '90%',
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  card2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  clientDet: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    backgroundColor: 'white',
  },
  inpDet: {
    width: '50%',
    backgroundColor: '#ffffff',
  },
  inp: {
    marginLeft: 20,
  },
  map: {
    display: 'flex',
    flexDirection: 'row',
    height: 35,
    backgroundColor: '#f9f9f9',
  },
  call: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  icon: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calling: {
    height: 30,
    width: '80%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 10,
  },
});
export default ContactClient;
