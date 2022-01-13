import { Divider,Icon,Text,Avatar,Popover,Layout, Spinner } from '@ui-kitten/components'
import React, { useEffect, useState,useContext } from 'react'
import { View,Image,StyleSheet, ScrollView,Dimensions, StatusBar,TouchableOpacity } from 'react-native'
import ClientDetail from './ClientDetail'
import HighRisk from './HighRisk'
import Pusher from 'pusher-js/react-native';
import notifee from '@notifee/react-native';
import Modal from 'react-native-modal'
import AppContext from '../../Context/app/appContext'

 function Clients(props) {
  const appProps=useContext(AppContext)
     const [visible,setVisible]=useState(false)
     const [allAlerts,setAlerts]=useState([])
     const [loading,setLoading]=useState(true)
     const [filteredAl,setFiltered]=useState([])
     
     const imageUrl=appProps.staff.image

     async function onDisplayNotification() {
      // Create a channel
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      // Display a notification
      await notifee.displayNotification({
        title: 'Alert',
        body: `New Alert Received`,
        android: {
          channelId
        },
      });
    }
    
     const pusher = new Pusher('4fd41dcde3de7004fcf0', {
      cluster: 'mt1'
    });
    const channel = pusher.subscribe('notifications');
    const loadAlerts=()=>{
      fetch('https://tim-acs.herokuapp.com/client/get-all-alert')
      .then(res=>{
        res.json()
        .then(data=>{
          if (data.success==true) {
          setLoading(false)
          
          setAlerts(data.message)
          }else{
            Alert.alert(
              "Error",
              "Something went wrong when fetching data!",
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
          console.log(err)
        })
      }).catch(err=>{
        console.log(err)
      })
    }

    function filterAlert() {
      const filteredAll=allAlerts.length>0?allAlerts.filter(mainAl=>mainAl.riskLevel=='high'):[]
      filteredAll.length>0?setFiltered(filteredAll):null

    }
     useEffect(()=>{
      // channel.bind('alert', function(data) {
      //   onDisplayNotification()
      //     setAlerts(data.allAlert) 
      // });
      loadAlerts()
      filterAlert()
      console.log(appProps)
     },[])
     const dispatchNavigation=(chanel)=>{
      // console.log(props.navigation)
      props.navigation.navigate(`${chanel}`)
     }
    return (
        <View style={{
            backgroundColor:'#ffffff',
            display:'flex',
            flex:1,
            alignItems:'center'
        }}>
            <StatusBar backgroundColor='#ffffff'/>
            {/* <Avatar style={{
                height:100,
                width:100,
                marginTop:5
            }}  size='giant' source={{uri: `https://tim-acs.herokuapp.com${imageUrl[1]}`}}/> */}
            <View style={styles.info}>
            <Text style={{
               
                 fontSize:18,
                 fontWeight:'500',
                
                 width:'50%',
                 textAlign:'center'
             }} status='basic'>Dashboard</Text>
            <View style={{
              flexDirection:'column',
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              marginLeft:40,
              marginBottom:20
              
            }}>
            <Image style={styles.logo} source={{uri: `${imageUrl}`}}/>
            <Text style={{
                 
                 fontSize:12,
                 fontWeight:'100'
             }} status='basic'>{appProps.staff.firstName} {appProps.staff.lastName}</Text>
            </View>
           
            </View>
            <Image style={{
              width:'100%',
              height:100,
              transform:[
                {scaleX:1.5}
              ]
            }} source={require('../assets/curve.png')}></Image>
            {/* <View style={{
              width:'100%',
              height:50,
              backgroundColor:'#3465ff',
              borderBottomRightRadius:50
            }}>

            </View> */}
            {/* <Divider style={styles.divide}/> */}
<View style={styles.mainClient}>
<Text style={styles.text} status='basic'>Clients Table</Text>
            <Divider style={styles.divide}/>
    <View style={styles.controlContainer}>
      <Text style={styles.text2} status='control'>Client Code</Text>
      <Text style={styles.text2} status='control'>Client Location</Text>
      <Text style={styles.text2} status='control'>Level Of Risk</Text>
    </View>
   <ScrollView style={styles.infoCont}>
   {
     allAlerts.length>0&&(
       allAlerts.map((indAl,ind)=>(
        <ClientDetail detail={indAl} key={ind} dispatchNavigation={dispatchNavigation}></ClientDetail>
       ))
     )
   }
  
   {
     allAlerts.length==0&&(
       <View style={styles.empty}>
         <Text appearance='hint'>No Alerts Available</Text>
         <Icon fill='black' name='alert-triangle-outline' style={{
                width:30,
                height:20
            }}/>
       </View>
     )
   }
  
  </ScrollView>

    <Text style={styles.text} status='basic'>Action Table</Text>
            <Divider style={styles.divide}/>
    <View style={styles.controlContainer}>
      <Text style={styles.text2} status='control'>Alert Timestamp</Text>
      <Text style={styles.text2} status='control'>Client Code</Text>
      <Text style={styles.text2} status='control'>Client Location</Text>
    </View>
    <ScrollView style={styles.infoCont}>
     {
       
        allAlerts.length>0&&(
          allAlerts.map((indAl,ind)=>{
            if (indAl.riskLevel=='high') {
              return(
               <HighRisk detail={indAl} key={ind} dispatchNavigation={dispatchNavigation}></HighRisk>
              )
            }else{
              return null
            }
   
          })
        )
      
     }


{
     allAlerts.length==0&&(
       <View style={styles.empty}>
         <Text appearance='hint'>No Alerts Available</Text>
         <Icon fill='black' name='alert-triangle-outline' style={{
                width:30,
                height:20
            }}/>
       </View>
     )
   }
    
  {
    filterAlert.length==0&&(
      <View style={styles.empty}>
        <Text appearance='hint'>No High Risk Alerts!!</Text>
        <Icon fill='black' name='alert-triangle-outline' style={{
                width:30,
                height:20
            }}/>
      </View>
    )
  }
    

   </ScrollView>
    




     












    <Modal style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }} coverScreen={true} isVisible={loading} animationIn='fadeIn' animationOut='fadeOutDown'>
        <Spinner status='basic'/>
      </Modal>
</View>
    
   
        </View>
    )
}
const styles=StyleSheet.create({
    logo:{
        width:50,
        height:50,
        borderRadius:50,
        borderColor:'white',
        borderWidth:2,
        marginTop:5
    },
    divide:{
        width:'100%'
    },
    text:{
        textAlign:'left',
        alignSelf:'flex-start',
        marginLeft:20
    },
    controlContainer: {
        borderRadius: 4,
        padding: 4,
        backgroundColor: '#3465ff',
        alignSelf:'flex-start',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        width:'93%',
        marginLeft:'auto',
        marginRight:'auto'

        
      },
      text2:{
        margin: 4,
        marginLeft:10
        
      },
      mainClient:{
          display:'flex',
          flex:1,
          
      },
      client1:{
          height:Dimensions.get('window').height/2,
          backgroundColor:'#ffffff'
      },
      indi:{
          height:70,
          backgroundColor:'#f9f9f9',
          display:'flex',
          flexDirection:'row',
          marginBottom:10
      },
      indi1:{
          width:'30%',
          backgroundColor:'#f9f9f9',
          minHeight:'100%',
          maxHeight:'100%',
          display:'flex',
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center'
      },
      indi2:{
        width:'30%',
        backgroundColor:'#f9f9f9',
        minHeight:'100%',
        maxHeight:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:20
      },
      content:{
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 4,
        paddingVertical: 8,
        minHeight:140,
        backgroundColor:'rgba(0,0,0,0)',
        
      },
      empty:{
        width:'80%',
        height:70,
        backgroundColor:'#f9f9f9',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:10
      },
      info:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
        marginRight:10,
        marginLeft:'auto',
        backgroundColor:'#ffffff',
        width:'100%',
      
        borderTopLeftRadius:50
      },
      infoCont:{
        height:Dimensions.get('window').height/2,
        backgroundColor:'#ffffff',
      }
    
})
export default Clients