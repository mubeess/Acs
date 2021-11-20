import React, { useContext, useState } from 'react'
import {Avatar, Divider, Icon, Input, Text,Button} from '@ui-kitten/components'
import { View,StyleSheet,ScrollView,TouchableOpacity } from 'react-native'
import AppContext from '../../../Context/app/appContext'
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
function MyProfile() {
    const appProps=useContext(AppContext)
    const [name,setName]=useState('')
    const [phone,setPhone]=useState('')
    const [mail,setEmail]=useState('')
    return (
        <View style={styles.container}>
            <View style={styles.nav}>
             <Text category='h6' style={{
                 fontWeight:'bold',
                 color:'black'
             }}>Profile</Text>
            </View>
            <Divider style={{width:'100%'}}/>
            <View style={styles.avatar}>
            <Avatar style={{
                height:100,
                width:100,
                marginTop:5
            }}  size='giant' source={require('../../assets/prof.jpeg')}/>
            <TouchableOpacity onPress={async ()=>{

launchImageLibrary({
    mediaType:'photo'

},(response) => {
    console.log('Response = ', response);
  
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }else {
      const source = { uri: response.uri };
      console.log('Response = ', source);
  
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
  
   
    }
  });
            //  const result = await launchImageLibrary({
            //         mediaType:'photo',
            //         selectionLimit:1
            //     });
                // launchImageLibrary({
                //     mediaType:'photo',
                //     selectionLimit:1
                // }, (res)=>{
                // console.log(res)
                // })

            }} style={{
                marginTop:'auto',
                marginBottom:30

            }}>
            <Icon style={{
                width:20,
                height:20
            }} fill='blue' name='cloud-upload'/>
            </TouchableOpacity>
            </View>
            <View style={styles.text}>
                <Text  appearance='hint'>Name</Text>
                <Text style={{
                    fontWeight:'bold'
                }}>{appProps.staff.firstName} {appProps.staff.lastName}</Text>

            </View>

            <View style={styles.text}>
                <Text  appearance='hint'>Staff Id</Text>
                <Text style={{
                    fontWeight:'bold'
                }}>{appProps.staff.username}</Text>

            </View>

            <View style={styles.text}>
                <Text  appearance='hint'>Phone</Text>
                <Text style={{
                    fontWeight:'bold'
                }}>{appProps.staff.phone}</Text>

            </View>
            <Divider style={{width:'100%'}}/>
            <Input
            onChangeText={(txt)=>{
                setName(txt)
            }}
            value={name}
            style={{
                marginTop:5,
                width:'90%',
                marginLeft:'auto',
                marginRight:'auto'

            }}
      placeholder='Edit Name'
    />

<Input
 onChangeText={(txx)=>{
    setPhone(txt)
}}
value={phone}
            style={{
                marginTop:5,
                width:'90%',
                marginLeft:'auto',
                marginRight:'auto'

            }}
      placeholder='Edit Phone Number'
    />

<Input
 onChangeText={(txt)=>{
    setEmail(txt)
}}
value={mail}
            style={{
                marginTop:5,
                width:'90%',
                marginLeft:'auto',
                marginRight:'auto'

            }}
      placeholder='Edit Email'
    />
  <Button  style={{
                marginTop:20,
                width:'90%',
                marginLeft:'auto',
                marginRight:'auto'

            }} >
        Update Profile
      </Button>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        display:'flex',
        flex:1
    },
    nav:{
        height:50,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }, 
    avatar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        height:120
    },
    text:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    }
})
export default MyProfile