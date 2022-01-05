import React, { useContext, useState } from 'react'
import {Avatar, Divider, Icon, Input, Text,Button, Spinner} from '@ui-kitten/components'
import { View,StyleSheet,ScrollView,TouchableOpacity, Alert,Image, Dimensions } from 'react-native'
import AppContext from '../../../Context/app/appContext'
import Modal from 'react-native-modal'
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
function MyProfile() {
    const appProps=useContext(AppContext)
    const [firstName,setFName]=useState('')
    const [lastName,setLName]=useState('')
    const [phone,setPhone]=useState('')
    const [mail,setEmail]=useState('')
    const [selectedPic,setSelectedPic]=useState(null)
    const [isLoading,setLoading]=useState(false)
    const imageUrl=appProps.staff.image
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
            <View style={{
              backgroundColor:'#ffffff',
              borderBottomLeftRadius:200,
              borderBottomRightRadius:200,
              height:200
            }}>
            <View style={styles.avatar}>
           
            <Avatar style={{
                height:70,
                width:70,
                marginTop:3
            }}  size='giant'  source={{uri: `${imageUrl}`}}/>
           
            <TouchableOpacity onPress={async ()=>{

launchImageLibrary({
    mediaType:'photo'

},(response) => {
    console.log('Response = ', response);
  
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error:', response.error);
    }else {
        setLoading(true)
        setSelectedPic(response.assets[0])
        const createImg=new FormData()
        createImg.append('profile_pic',selectedPic);
        // createImg.append('file',{type:'image/jpg',name:'profile_pic.jpg',uri:response.assets[0].uri})
        // const source = { uri: response.assets[0].uri };
        // const fileToUpload = source.uri;
        // const data = new FormData();
        // data.append('photo', 'profile_pic');
        // data.append('file_attachment', fileToUpload);
      
      fetch(`https://tim-acs.herokuapp.com/staff/save-staff-profile-pic?username=${appProps.staff.username}`,{
        method:'PUT',
        headers:{
          "Content-Type":'application/json'
        },
        body:createImg
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
                <Text style={{
                    fontWeight:'bold',
                    fontSize:20
                }}>{appProps.staff.firstName} {appProps.staff.lastName}</Text>

            </View>

            <View style={styles.text}>
                <Text style={{
                    fontWeight:'400'
                }}>{appProps.staff.username}</Text>

            </View>

            <View style={styles.text}>
                <Text style={{
                    fontWeight:'200',
                    fontSize:12
                }}>{appProps.staff.phone}</Text>

            </View>
            </View>
          
{/* ************************************************************************************ */}
            <View style={{
              backgroundColor:'#ffffff',
              height:Dimensions.get('window').height-300,
              borderTopLeftRadius:100

              
              
            }}>
            <Input
            accessoryLeft={<Icon name='person-outline'/>}
            onChangeText={(txt)=>{
                setFName(txt)
            }}
            
            style={{
                marginTop:100,
                width:'80%',
                marginLeft:'auto',
                marginRight:'auto'

            }}
      placeholder={appProps.staff.firstName}
    />


<Input
 accessoryLeft={<Icon name='person-outline'/>}
            onChangeText={(txt)=>{
                setLName(txt)
            }}
            
            style={{
                marginTop:5,
                width:'80%',
                marginLeft:'auto',
                marginRight:'auto'

            }}
      placeholder={appProps.staff.lastName}
    />

<Input
 accessoryLeft={<Icon name='phone-outline'/>}
 onChangeText={(txt)=>{
    setPhone(txt)
}}

            style={{
                marginTop:5,
                width:'80%',
                marginLeft:'auto',
                marginRight:'auto'

            }}
      placeholder={appProps.staff.phone}
    />

    

<Input
 accessoryLeft={<Icon name='email-outline'/>}
 onChangeText={(txt)=>{
    setEmail(txt)
}}

            style={{
                marginTop:5,
                width:'80%',
                marginLeft:'auto',
                marginRight:'auto'

            }}
      placeholder={appProps.staff.email}
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
                width:'80%',
                marginLeft:'auto',
                marginRight:'auto',
                backgroundColor:'#1e4d94'

            }} >
        Update Profile
      </Button>






            </View>
          
         
          
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
        backgroundColor:'#1e4d94',
        display:'flex',
        flex:1
    },
    nav:{
        height:30,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff'
    }, 
    avatar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        height:80
    },
    text:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:3
    }
})
export default MyProfile