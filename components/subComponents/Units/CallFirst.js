import { Avatar, Button, Card, Divider, Icon,Input,Spinner,Text } from '@ui-kitten/components'
import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet,TouchableOpacity, Image,ScrollView, Dimensions,Linking,PermissionsAndroid, Alert  } from 'react-native'
import AppContext from '../../../Context/app/appContext'
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import CallLogs from 'react-native-call-log';
import Modal from "react-native-modal";


 function CallFirst(props) {
    const [isLoading,setLoading]=useState(false)
     const appProps=useContext(AppContext)
     const [callDuration,setCallDuration]=useState(0)
     const [mainCallDuration,setMainCallDuration]=useState(0)
     const [text,setText]=useState('')
     const [listData, setListDate] = useState([]);
     const [myClient,setMyclient]=useState([])
     const imageUrl=appProps.staff.image.split('public')


     useEffect(()=>{
        fetch(`https://tim-acs.herokuapp.com/staff/get-client-demographic/?clientId=${appProps.currentAlert.clientId}`)
        .then(res=>{
            res.json()
            .then(data=>{
                console.log(data)
              setMyclient([data.clientDemographic])
             
               
            })
        })
     },[])
  







    return (
        <View style={styles.container}>
            <View style={styles.nav}>
            <TouchableOpacity onPress={()=>{
                props.navigation.navigate('Main')
            }}  style={styles.arr}>
            <Icon fill='black' name='arrow-back-outline' style={{
                   width:30,
                   height:20
               }}/>
            </TouchableOpacity>
            <Image style={styles.logo} source={require('../../assets/logo.png')}/>
            </View>
            <Divider style={{width:'100%'}}/>
            <View style={styles.user}>
                <View style={styles.subUser}>
                <Avatar source={{uri:`https://tim-acs.herokuapp.com${imageUrl[1]}`}}></Avatar>
                <Text>{appProps.staff.firstName} {appProps.staff.lastName}</Text>
                </View>
            
            </View>
            <Divider style={{width:'100%'}}/>
            <Text style={{marginLeft:20}} appearance='hint' category='h6'>Call First Responder</Text>
            <Divider style={{width:'100%'}}/>
            <ScrollView style={styles.history}>
           <Text style={{marginLeft:20}}>Client Demographics</Text>
        <View style={styles.clientDet}> 
           <View style={styles.inpDet}>
           <Text style={[styles.inp,{
               fontWeight:'bold'
           }]}>Name</Text>
           <Text style={styles.inp}>{myClient.length>0?myClient[0].fullName:''}</Text>
           </View>

           <View style={styles.inpDet}>
           <Text style={[styles.inp,{
               fontWeight:'bold'
           }]}>Address</Text>
           <Text style={styles.inp}>{myClient.length>0?myClient[0].clientLocation:''}</Text>
           </View>
        </View>




        <View style={styles.clientDet}> 
           <View style={styles.inpDet}>
           <Text style={[styles.inp,{
               fontWeight:'bold'
           }]}>Client Code</Text>
           <Text style={styles.inp}>{myClient.length>0?myClient[0].clientId:''}</Text>
           </View>

           <View style={styles.inpDet}>
           <Text style={[styles.inp,{
               fontWeight:'bold'
           }]}>Phone Number</Text>
           <Text style={styles.inp}>{myClient.length>0?myClient[0].phone:''}</Text>
           </View>
        </View>





        <View style={styles.clientDet}> 
           <View style={styles.inpDet}>
           <Text style={[styles.inp,{
               fontWeight:'bold'
           }]}>Risk Level</Text>
           <Text style={styles.inp}>{myClient.length>0&&myClient[0].sud!==null?myClient[0].sud.sudLevel>50?'High':'Low':''}</Text>
           </View>

           <View style={styles.inpDet}>
           <Text style={[styles.inp,{
               fontWeight:'bold'
           }]}>SUD Level</Text>
           <Text style={styles.inp}>{myClient.length>0?myClient[0].sud!==null?myClient[0].sud.sudLevel:'':''}</Text>
           </View>
        </View>
           





        
           
            </ScrollView>
            <Divider style={{width:'100%'}}/>
            <Text style={[styles.inp,{
               fontWeight:'bold'
           }]}>Location</Text>
           <View style={styles.map}>
           <Text style={{
               width:'70%',
               marginLeft:20,
               borderBottomColor:'black',
               borderColor:'gray',
               borderRightWidth:1
           }}>{myClient.length>0&&myClient[0].clientLocation}</Text>
            <Button onPress={()=>{
                Linking.openURL('https://www.google.com/maps/place/9.2740331,12.4387026')
            }} size='tiny'  appearance='filled' status='primary' accessoryLeft={<Icon name='globe-outline'/>}>
                Map
            </Button>
           </View>
         <View style={styles.call}>
        <View style={styles.icon}>
        <Icon style={{
            height:30,
            width:30
        }} fill='gray' name='person-outline'/>
        <Text>{appProps.staff.username}</Text>
        </View>


        <View style={styles.icon}>
        <Icon style={{
            height:30,
            width:30
        }} fill='gray' name='hash-outline'/>
        <Text>911</Text>
        </View>



        <View style={styles.icon}>
        {
            callDuration==0?(
                <TouchableOpacity onPress={()=>{
                    RNImmediatePhoneCall.immediatePhoneCall('08167099181')
                    setTimeout(()=>{
                        setCallDuration(1)
                        setText('')
                    },1000)
                    
                   }}>
                   <Icon style={{
                       height:30,
                       width:30
                   }} fill='green' name='phone-call-outline'/>
                   </TouchableOpacity>
                  
            ):(
                <Button size='tiny' onPress={()=>{
                    setLoading(true)
                    const record={
                        clientId:appProps.currentAlert.clientId,
                        clientActions:{
                            actionName:'Call First Responder',
                            staffId:appProps.staff.username,
                            staffName:appProps.staff.firstName,
                            documentation:'',
                            callDration:mainCallDuration
                        }
                    }
                   
                    CallLogs.load(1).then((c) =>{
                        setText(`Last call duration is ${c[0].duration} Seconds`)
                        setMainCallDuration(c[0].duration)

                   

                        fetch('https://tim-acs.herokuapp.com/staff/save-client-action',{
                            method:'PUT',
                            headers:{
                              "Content-Type":'application/json'
                            },
                            body:JSON.stringify(record)
                          }).then(res=>{
                              res.json()
                              .then(data=>{
                                if (data.success) {
                                    Alert.alert(
                                        "Success",
                                        "Successfuly Dispatched",
                                        [
                                          {
                                            text: "Back",
                                            style: "cancel"
                                          },
                                      
                                        ]
                                      );
                                      setLoading(false)
                                      props.navigation.goBack()
                                      console.log(mainCallDuration)
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




                    });
                    setCallDuration(0)
                   }}>
                Save action
                   </Button>
                  
            )
        }
        
        </View>
         </View>
         <View style={styles.calling}>
        <Text style={{
            fontWeight:'bold',
            marginRight:10
        }}>
       Outgoing Call
        </Text>
        <Text>
            {callDuration?'Press The button to save action':''}
        </Text>
        <Text>
          {text}
        </Text>
         </View>
         <Modal style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }} coverScreen={true} isVisible={isLoading} animationIn='fadeIn' animationOut='fadeOutDown'>
        <Spinner status='basic'/>
      </Modal>  
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        display:'flex',
        flex:1,
        backgroundColor:'#ffffff'
    },
    nav:{
        display:'flex',
        flexDirection:'row',
        height:100,
        backgroundColor:'#ffffff',
        alignItems:'center'
    },
    arr:{
        marginLeft:20
    },
    logo:{
       width:100,
       height:100,
       marginLeft:'25%'
    },
    user:{
        display:'flex',
        flexDirection:'row',
        height:100,
        alignItems:'center',
        justifyContent:'flex-end'
    },
    subUser:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginRight:20
    },
    history:{
        maxHeight:Dimensions.get('screen').height/3,
        backgroundColor:'#f9f9f9'
    },
    card:{
        width:'90%',
        height:100,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:20,
       
    },
    card2:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    clientDet:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:15

    },
    inpDet:{
        width:'50%',
        backgroundColor:'#f9f9f9'
    },
    inp:{
        marginLeft:20
    },
    map:{
        display:'flex',
        flexDirection:'row',
        height:35,
        backgroundColor:'#f9f9f9'
    },
    call:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:10
    },
    icon:{
        width:'30%',
        justifyContent:'center',
        alignItems:'center'
    },
    calling:{
        height:50,
        width:'90%',
        backgroundColor:'#f9f9f9',
        borderRadius:10,
        marginLeft:'auto',
        marginRight:'auto',
        display:'flex',
        flexDirection:'row'

    }

})
export default CallFirst

// https://www.google.com/maps/place/9.2740331,12.4387026