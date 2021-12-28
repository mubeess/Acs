import React,{useState,useEffect, useContext} from 'react'
import SplashScreen from 'react-native-splash-screen'
import { View,StatusBar,StyleSheet,Image,TouchableWithoutFeedback,Keyboard,Alert,Linking } from 'react-native'
import { Input, Icon,Button,Text, Spinner } from '@ui-kitten/components'
import AppContext from '../../Context/app/appContext'
import Modal from "react-native-modal";


 function Login(props) {
   const [userName,setUserName]=useState('')
   const [password,setPassword]=useState('')
   const [isLoading,setLoading]=useState(false)
   const appProps=useContext(AppContext)
   useEffect(()=>{
   SplashScreen.hide()

   },[])
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
      };

      const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
          <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
      );
    return (
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss()
        }} style={styles.container}>
        
        <View style={styles.container}>
            <StatusBar backgroundColor='#ffffff'/>
            <Image source={require('../assets/logo.png')} style={styles.logo}/>
            <Input
             onChangeText={(text)=>{
              setUserName(text)
              }}
            accessoryRight={<Icon name='person-outline'/>}
            style={styles.input}
            textAlign='center'
             placeholder='User Name'
    />

   <Input
  onChangeText={(text)=>{
  setPassword(text)
  }}
   textAlign='center'
   style={styles.input}
      placeholder='Password'
      accessoryRight={renderIcon}
      secureTextEntry={secureTextEntry}
    />
     <Button onPress={()=>{
      if (userName=='' || password=='') {
        return Alert.alert(
          "Error",
          "Username or Password not entered!",
          [
            {
              text: "Back",
              style: "cancel"
            },
        
          ]
        );
      }else{
        setLoading(true)
        const myUser={
          username:userName,
          password
        }
        fetch('https://tim-acs.herokuapp.com/staff/login',{
          method:'POST',
          headers:{
            "Content-Type":'application/json'
          },
          body:JSON.stringify(myUser)
        }).then(res=>{
          res.json()
          .then(data=>{
            if(data.success==true){
              props.navigation.navigate('Dashboard')
              appProps.setStaff(data.newUser) 
              console.log(data.newUser)
              setLoading(false)  
            }else{
              Alert.alert(
                "Error",
                "Username or Password incorrect",
                [
                  {
                    text: "Back",
                    style: "cancel"
                  },
              
                ]
              );
              setLoading(false)
            }
          }).catch(err=>{
            setLoading(false)
          })
        }).catch(err=>{
          setLoading(false)
        })

      }
      
     
      //  props.navigation.navigate('Dashboard')
     }} style={styles.button} appearance='filled' status='primary'>
      Login
    </Button>
    <View style={styles.hint}>
    <Text appearance='hint'>
      Having isuues with login?
    </Text>
    <TouchableWithoutFeedback onPress={()=>{
      Linking.openURL('mailto:mubarakibrahim2015@gmail.com?subject=Help')
    }}>
    <Text style={{
        textAlign:'center',
        marginLeft:10,
        fontWeight:'bold',
        
    }} appearance='hint'>
      Help
    </Text>
    </TouchableWithoutFeedback>
    </View>
    <Modal style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }} coverScreen={true} isVisible={isLoading} animationIn='fadeIn' animationOut='fadeOutDown'>
        <Spinner status='basic'/>
      </Modal>
        </View>
     
  
        </TouchableWithoutFeedback>
       
    )
}
const styles=StyleSheet.create({
 container:{
     backgroundColor:'#ffffff',
     display:'flex',
     flex:1,
     alignItems:'center'
 },
 logo:{
     width:200,
     height:200,
     marginTop:20
 },
 input:{
     width:'90%',
     marginTop:20
 },
 button:{
     width:'90%',
     marginTop:40
 },
 hint:{
   display:'flex',
   flexDirection:'row',
   marginTop:20
 }
})
export default Login;