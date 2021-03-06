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
  Alert,
} from 'react-native';
import AppContext from '../../../Context/app/appContext';
import Modal from 'react-native-modal';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

function DispatchMobile(props) {
  const [isLoading, setLoading] = useState(false);
  const appProps = useContext(AppContext);
  const [myAlert, setAlerts] = useState([]);
  const [dispatchTxt, setDispatchText] = useState('');
  const imageUrl = appProps.staff.image;
  const [myClient, setMyclient] = useState([]);
  const [recipientImg, setRecipientImg] = useState([]);
  const [sentMsg, setSentMsg] = useState([]);

  const loadAlerts = () => {
    fetch(
      `https://tim-acs.herokuapp.com/staff/get-staff-actions-base-on-client/?username=${appProps.staff.username}&clientId=${appProps.currentAlert.clientId}`,
    )
      .then(res => {
        res
          .json()
          .then(data => {
            if (data.success == true) {
              setLoading(false);
              console.log('hey asy', appProps.currentAlert);
              setAlerts(data.message);
            } else {
              Alert.alert('Error', 'Something went wrong when fetching data!', [
                {
                  text: 'Back',
                  style: 'cancel',
                },
              ]);
              setLoading(false);
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch(
      `https://tim-acs.herokuapp.com/staff/get-client-demographic/?clientId=${appProps.currentAlert.clientId}`,
    ).then(res => {
      res.json().then(datas => {
        setMyclient([datas.clientDemographic]);
        console.log('SAS', appProps.currentAlert);
      });
    });
    //loadAlerts();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          marginTop: 10,
        }}
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
          Dispatch Mobile Unit
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
                  : `https://picsum.photos/200/?u=${appProps.staff.username}`,
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

      <View
        style={{
          alignItems: 'center',
          margin: 10,
        }}>
        <Image
          style={styles.logo}
          source={{
            uri:
              recipientImg == null
                ? `${recipientImg}`
                : `https://i.pravatar.cc/300/?u=${appProps.currentAlert.clientId}`,
          }}
        />
        <Text style={{marginTop: 10, fontWeight: '500'}}>Recipient </Text>
        <Text>Maxwell Manor</Text>
      </View>

      {/* <Divider style={{width:'100%',marginTop:10}}/> */}
      <ScrollView style={styles.history}>
        {/* {
         myAlert.length==0&&(
          <View style={styles.empty}>
          <Text appearance='hint'>No Any Actions Taken</Text>
          <Icon fill='black' name='alert-triangle-outline' style={{
                 width:30,
                 height:20
             }}/>
        </View>
         )
       } */}

        <View
          style={{
            flex: 1,
            backgroundColor: 'f9f9f9',
            height: 150,
            padding: 10,
          }}>
          {/* <SwiperFlatList
  style={{
    backgroundColor:'f9f9f9',
  }}
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={0}
      showPagination
      data={myAlert}
      renderItem={({ item}) => (
        <Card style={styles.card}>
            <View style={styles.card2}>
            <View style={{maxWidth:'100%',flexDirection:'row'}}>
            <Text style={{color:'white'}}>Name:  </Text> 
            <Text style={{color:'white'}}>{item.staffName}</Text> 
            </View>
           
            <View style={{maxWidth:'100%'}}>
            <View>
           <Text style={{color:'white'}}>
             Staff Id: {item.staffId}
          </Text>
          <Text style={{color:'white'}}>
             Action Type: {item.actionName}
          </Text>
          <Text style={{color:'white'}}>
            Month: {item.month}
          </Text>
        
            </View>
          
            </View>
            </View>
             </Card>
      )}
    /> */}
          {myAlert.length > 0 && (
            <Card style={styles.card}>
              <View style={styles.card2}>
                <View style={{maxWidth: '100%'}}>
                  <View
                    style={{
                      padding: 5,
                      paddingLeft: 10,
                    }}>
                    <Text style={{color: 'white'}}>
                      Client Code:{appProps.currentAlert.clientId}
                    </Text>
                    <Text style={{color: 'white'}}>
                      {appProps.currentAlert.clientLocation}
                    </Text>
                    <Text style={{color: 'white'}}>
                      Severity Level: {appProps.currentAlert.riskLevel}
                    </Text>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  // color: 'blue',
                  // backgroundColor: 'white',
                  // marginRight: -30,
                  paddingLeft: 10,
                  fontSize: 10,
                  textAlign: 'right',
                  marginTop: 5,
                }}>
                Sent: {new Date().toLocaleString()}
              </Text>
            </Card>
          )}
        </View>
      </ScrollView>
      <Divider style={{width: '100%'}} />
      <View
        style={{
          alignItems: 'center',
          margin: 10,
          border: '1px solid #232419',
          marginLeft: 15,
        }}>
        <Avatar
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}
          source={{uri: `${imageUrl}`}}></Avatar>
        <Text style={{fontSize: 16}}>
          {appProps.staff.firstName} {appProps.staff.lastName}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginBottom: 40,
        }}>
        <Text
          style={{
            marginLeft: 20,
            marginBottom: 30,
            fontSize: 16,
            fontWeight: '500',
          }}>
          Dispatch User
        </Text>
        <Input
          onChangeText={txt => {
            setDispatchText(txt);
          }}
          multiline={true}
          defaultValue={`Client Code: ${appProps.currentAlert.clientId}, 
Client Location: ${appProps.currentAlert.clientLocation}, 
Severity Level: ${appProps.currentAlert.riskLevel}`}
        />
        <View
          style={{
            position: 'relative',
            right: 0,
            marginRight: 0,
            marginTop: -40,
            marginLeft: '85%',
          }}>
          <Button
            onPress={() => {
              if (myAlert.length > 0) {
                return null;
              }
              setLoading(true);
              const record = {
                clientId: `${appProps.currentAlert.clientId}`,
                clientActions: {
                  actionName: 'Mobile Unit',
                  staffId: appProps.staff.username,
                  staffName: appProps.staff.firstName,
                  documentation: dispatchTxt,
                },
              };
              fetch('https://tim-acs.herokuapp.com/staff/save-client-action', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(record),
              })
                .then(res => {
                  res
                    .json()
                    .then(data => {
                      if (data.success) {
                        setSentMsg(data);

                        Alert.alert('Success', 'Successfuly Dispatched', [
                          {
                            text: 'Back',
                            style: 'cancel',
                          },
                        ]);
                        setLoading(false);
                        setAlerts([
                          {
                            actionName: 'Mobile Unit',
                            staffId: appProps.staff.username,
                            staffName: appProps.staff.firstName,
                            clientId: `${appProps.currentAlert.clientId}`,
                          },
                        ]);
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
            appearance="ghost"
            status="primary"
            accessoryLeft={<Icon name="arrow-upward-outline" />}
          />
        </View>
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
    backgroundColor: '#f9f9f9',
    marginTop: 10,
  },
  card: {
    width: '95%',
    backgroundColor: 'rgba(52,101,255, 0.16)',
    // borderRadius: 10,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    margin: 5,
    paddingBottom: 3,
  },
  card2: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-around',
    backgroundColor: 'rgba(52,101,255, 0.86)',
    paddingTop: 10,
    paddingBottom: 10,
  },
  empty: {
    width: '80%',
    height: 70,
    backgroundColor: '#f9f9f9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 10,
  },
});
export default DispatchMobile;
