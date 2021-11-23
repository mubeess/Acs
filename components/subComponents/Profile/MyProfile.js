import React, { useContext, useState } from 'react'
import {Avatar, Divider, Icon, Input, Text,Button, Spinner} from '@ui-kitten/components'
import { View,StyleSheet,ScrollView,TouchableOpacity, Alert } from 'react-native'
import AppContext from '../../../Context/app/appContext'
import Modal from 'react-native-modal'
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
function MyProfile() {
    const appProps=useContext(AppContext)
    const [firstName,setFName]=useState('')
    const [lastName,setLName]=useState('')
    const [phone,setPhone]=useState('')
    const [mail,setEmail]=useState('')
    const [isLoading,setLoading]=useState(false)
    const imageUrl=appProps.staff.image=='1.jpg'?'../../assets/prof.jpeg':`https://tim-acs.herokuapp.com/${appProps.staff.image}`
    const createFormData = (photo) => {
        const data = new FormData();
        console.log("++++",photo)
        // data.append('image', {
        //     name: 'profilePic',
        //     type: `image/${fileType}`,
        //     uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        //   });
        data.append('photo', {
          name:'profile_pic',
          type: 'image/jpeg',
          uri:photo.uri
        });
    
        data.append('id', 1);
        return data;
      };
    
    return (
        <ScrollView style={styles.container}>
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
        setLoading(true)
        const createImg=new FormData()
        createImg.append('photo', 'profile_pic');
        createImg.append('file',{type:'image/jpg',name:'profile_pic.jpg',uri:response.assets[0].uri})
        const source = { uri: response.assets[0].uri };
        // const fileToUpload = source.uri;
        // const data = new FormData();
        // data.append('photo', 'profile_pic');
        // data.append('file_attachment', fileToUpload);
      
      fetch(`https://tim-acs.herokuapp.com/staff/save-staff-profile-pic?username=${appProps.staff.username}`,{
        method:'PUT',
        headers:{
          "Content-Type":'application/json'
        },
        body:new FormData(response.assets[0].uri)
      }).then(res=>{
          res.json()
          .then(data=>{
            if (data.success) {
                Alert.alert(
                    "Success",
                    "Updated",
                    [
                      {
                        text: "Back",
                        style: "cancel"
                      },
                  
                    ]
                  );
                  setLoading(false)
                  
            }else{
                Alert.alert(
                    "Error",
                    "An error occured",
                    [
                      {
                        text: "Back",
                        style: "cancel"
                      },
                  
                    ]
                  );
                  setLoading(false)

            }
              console.log(data)
          }).catch(err=>{
              setLoading(false)
              console.log(err)
          })
      }).catch(err=>{
        setLoading(false)
        console.log(err)
    })

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
                setFName(txt)
            }}
            
            style={{
                marginTop:5,
                width:'90%',
                marginLeft:'auto',
                marginRight:'auto'

            }}
      placeholder='Edit First Name'
    />


<Input
            onChangeText={(txt)=>{
                setLName(txt)
            }}
            
            style={{
                marginTop:5,
                width:'90%',
                marginLeft:'auto',
                marginRight:'auto'

            }}
      placeholder='Edit Last Name'
    />

<Input
 onChangeText={(txt)=>{
    setPhone(txt)
}}

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

            style={{
                marginTop:5,
                width:'90%',
                marginLeft:'auto',
                marginRight:'auto'

            }}
      placeholder='Edit Email'
    />
  <Button onPress={()=>{
      setLoading(true)
      const obj={
      firstName,
      lastName,
      phone,
      email:mail


      }
     !firstName?delete obj.firstName:null
     !lastName?delete obj.lastName:null
     !phone?delete obj.phone:null
     !mail?delete obj.email:null

      console.log(obj)
      fetch(`https://tim-acs.herokuapp.com/staff/edit-staff?username=${appProps.staff.username}`,{
        method:'PUT',
        headers:{
          "Content-Type":'application/json'
        },
        body:JSON.stringify(obj)
      }).then(res=>{
          res.json()
          .then(data=>{
            if (data.success) {
                Alert.alert(
                    "Profile Updated",
                    "Updated",
                    [
                      {
                        text: "Back",
                        style: "cancel"
                      },
                  
                    ]
                  );
                  appProps.setStaff(data.message)
                  setLoading(false)
                  
            }else{
                Alert.alert(
                    "Error",
                    "An error occured",
                    [
                      {
                        text: "Back",
                        style: "cancel"
                      },
                  
                    ]
                  );
                  setLoading(false)

            }
              console.log(data)
          }).catch(err=>{
              setLoading(false)
              console.log(err)
          })
      }).catch(err=>{
        setLoading(false)
        console.log(err)
    })
  }}  style={{
                marginTop:20,
                width:'90%',
                marginLeft:'auto',
                marginRight:'auto'

            }} >
        Update Profile
      </Button>
      <Modal style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }} coverScreen={true} isVisible={isLoading} animationIn='fadeIn' animationOut='fadeOutDown'>
        <Spinner status='basic'/>
      </Modal>
        </ScrollView>
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