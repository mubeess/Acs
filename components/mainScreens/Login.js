import React,{useState,useEffect, useContext} from 'react'
import SplashScreen from 'react-native-splash-screen'
import { View,StatusBar,StyleSheet,Image,TouchableWithoutFeedback,Keyboard,Alert,Linking,Dimensions } from 'react-native'
import { Input, Icon,Button,Text, Spinner } from '@ui-kitten/components'
import AppContext from '../../Context/app/appContext'
import Modal from "react-native-modal";

const deviceHeight=Dimensions.get('window').height

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
            <StatusBar backgroundColor='#1e4d94'/>
            <View style={styles.blueBg}></View>
            <View style={styles.mainInp}>
       <Text style={{
         textAlign:'center',
         color:'#1e4d94',
         marginTop:60
       }} appearance='hint'>
     LOGIN ACS
    </Text>
            
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
              appProps.setStaff(data.newUser)
              props.navigation.navigate('Dashboard')
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
    <Text style={{
      marginLeft:'auto'
    }} appearance='hint'>
      Having isuues with login?
    </Text>
    <TouchableWithoutFeedback onPress={()=>{
      Linking.openURL('mailto:mubarakibrahim2015@gmail.com?subject=Help')
    }}>
    <Text style={{
        textAlign:'center',
        marginLeft:10,
        fontWeight:'bold',
        color:'#1e4d94',
        marginRight:'auto'
        
    }} appearance='hint'>
      Help
    </Text>
    </TouchableWithoutFeedback>
            </View>
            
    </View>
    <View style={styles.mainImage}>
      <Image source={require('../assets/logo.png')} style={styles.logo}/>
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
     backgroundColor:'#f9f9f9',
     display:'flex',
     flex:1,
     alignItems:'center',
     position:'relative'
 },
 logo:{
     width:100,
     height:100,
    
 },
 input:{
     width:'80%',
     marginTop:20,
     marginLeft:'auto',
     marginRight:'auto',
     borderRadius:10
 },
 button:{
     width:'80%',
     marginTop:40,
     marginLeft:'auto',
     marginRight:'auto',
     borderRadius:10,
     backgroundColor:'#1e4d94'
 },
 hint:{
   display:'flex',
   flexDirection:'row',
   marginTop:20
 },
 blueBg:{
   position:'absolute',
   height:deviceHeight/2,
   width:'100%',
   backgroundColor:'#1e4d94',
  borderBottomLeftRadius:deviceHeight/5,
  borderBottomRightRadius:deviceHeight/5,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.34,
  shadowRadius: 0.34,
  
  elevation: 10,
 },
 mainInp:{
   position:'absolute',
   height:deviceHeight/1.6,
   backgroundColor:'#ffffff',
   marginTop:deviceHeight/4,
   width:'80%',
   marginLeft:'auto',
   marginRight:'auto',
   zIndex:10,
   shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.34,
  shadowRadius: 0.34,
  
  elevation: 10,
  borderRadius:10
 },
 mainImage:{
   width:100,
   height:100,
   backgroundColor:'#ffffff',
   position:'absolute',
   shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.34,
  shadowRadius: 6.24,
  
  elevation: 10,
  marginTop:(deviceHeight/4)-50,
  zIndex:20,
  borderRadius:100
 }
})
export default Login;