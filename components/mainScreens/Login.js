import React,{useState,useEffect, useContext} from 'react'
import SplashScreen from 'react-native-splash-screen'
import { View,StatusBar,StyleSheet,Image,TouchableWithoutFeedback,Keyboard } from 'react-native'
import { Input, Icon,Button,Text, Spinner } from '@ui-kitten/components'
import AppContext from '../../Context/app/appContext'
import Modal from "react-native-modal";

 function Login(props) {
   const appProps=useContext(AppContext)
   useEffect(()=>{
    console.log(appProps)
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
          <>
        <View style={styles.container}>
            <StatusBar backgroundColor='#ffffff'/>
            <Image source={require('../assets/logo.png')} style={styles.logo}/>
            <Input
            accessoryRight={<Icon name='person-outline'/>}
            style={styles.input}
            textAlign='center'
             placeholder='User Name'
    />

   <Input
   textAlign='center'
   style={styles.input}
      placeholder='Password'
      accessoryRight={renderIcon}
      secureTextEntry={secureTextEntry}
    />
     <Button  onPress={()=>{
       props.navigation.navigate('Dashboard')
     }} style={styles.button} appearance='filled' status='primary'>
      Login
    </Button>
    <View style={styles.hint}>
    <Text appearance='hint'>
      Having isuues with login?
    </Text>
    <TouchableWithoutFeedback>
    <Text style={{
        textAlign:'center',
        marginLeft:10,
        fontWeight:'bold',
        
    }} appearance='hint'>
      Help
    </Text>
    </TouchableWithoutFeedback>
    </View>
        </View>
      <Modal style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }} coverScreen={true} isVisible={false} animationIn='fadeIn' animationOut='fadeOutDown'>
        <Spinner status='basic'/>
      </Modal>
      </>
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