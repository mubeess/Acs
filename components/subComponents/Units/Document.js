/* eslint-disable react-native/no-inline-styles */
import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  IndexPath,
  Input,
  Select,
  SelectItem,
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
import Modal from 'react-native-modal';
import AppContext from '../../../Context/app/appContext';

function Document(props) {
  const appProps = useContext(AppContext);
  const myData = [
    'Mobile Unit',
    'Contact Virtual Counselor',
    'Contact First Responder',
    'Contact Client',
    'Contact Referral Service',
  ];
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [action, setAction] = useState('');
  const [userName, setUsername] = useState(appProps.currentAlert.staffId);
  const [actionTime, setActionTime] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const displayValue = myData[selectedIndex.row];
  const imageUrl = appProps.staff.image;
  const clientImg = 'https://picsum.photos/200';
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    console.log('======', appProps.currentAlert);
  }, []);
  const renderOption = title => <SelectItem key={title} title={title} />;
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
          Documentation
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
          <Image style={styles.logo} source={{uri: `${clientImg}`}} />
          <Text
            style={{
              color: '#3a3b3c',
              fontSize: 12,
            }}
            status="basic">
            {appProps.currentAlert.clientName}
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

}}>
<Text style={{marginLeft:20,fontWeight:'400'}} appearance='hint' category='label'>Action Type</Text>
<Text style={{paddingLeft:20,backgroundColor:'#3465ff',marginRight:20,color:'white',width:'100%'}}>Document Action</Text>
</View>
  
   <Divider style={{width:'100%',marginTop:10}}/> */}
      <ScrollView style={styles.history}>
        {/* <Select
         defaultValue={myData[selectedIndex]}
         style={{
             width:'90%',
             marginRight:'auto',
             marginLeft:'auto',
             marginTop:10
         }}
         label='Action Type'
        onSelect={(index)=>{
            setSelectedIndex(index.row)
            console.log(index)
        } }>
            {
                myData.map((dat,ind)=>(
                    <SelectItem key={ind}  title={dat}/>  
                ))
            }
      
      </Select> */}

        <Input
          disabled
          onChangeText={text => {
            setUsername(text);
          }}
          style={{
            width: '90%',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 10,
            backgroundColor: '#f9f9f9',
          }}
          placeholder={appProps.currentAlert.actionName}
        />

        <Input
          disabled
          onChangeText={text => {
            setUsername(text);
          }}
          style={{
            width: '90%',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 10,
            backgroundColor: '#f9f9f9',
          }}
          placeholder={appProps.staff.username}
        />

        <Input
          disabled
          onChangeText={text => {
            setActionTime(text);
          }}
          style={{
            width: '90%',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 10,
            backgroundColor: '#f9f9f9',
            color: 'white',
          }}
          placeholder={`${appProps.currentAlert.createdAt}`}
        />

        <Input
          onChangeText={text => {
            setActionMessage(text);
          }}
          style={{
            width: '90%',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 50,
            backgroundColor: 'white',
          }}
          placeholder="Action Message"
          multiline={true}
          defaultValue={appProps.currentAlert.documentation}
          textStyle={{minHeight: 84}}
        />

        <Button
          onPress={() => {
            const obj = {
              clientActionId: appProps.currentAlert.clientActionId,
              clientId: appProps.currentAlert.clientId,
              // actionTime,
              documentation: actionMessage,
            };
            setLoading(true);

            fetch(
              'https://tim-acs.herokuapp.com/staff/document-client-action',
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
                      Alert.alert('Success', 'Document Added', [
                        {
                          text: 'Back',
                          style: 'cancel',
                        },
                      ]);
                      setLoading(false);
                      props.navigation.navigate('Main');
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

            console.log(obj);
          }}
          style={{
            width: '90%',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 5,
          }}
          appearance="filled"
          status="primary"
          accessoryLeft={<Icon name="save-outline" />}>
          Save
        </Button>
      </ScrollView>

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
    flex: 1,
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
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 10,
  },
});
export default Document;
