import { Divider,Icon,Text,Avatar,Popover,Layout, OverflowMenu, MenuItem } from '@ui-kitten/components'
import React, { useContext, useState } from 'react'
import { View,Image,StyleSheet, ScrollView,Dimensions, StatusBar,TouchableOpacity } from 'react-native'
import AppContext from '../../Context/app/appContext'
 function ClientDetail({dispatchNavigation,detail}) {
     const appProps=useContext(AppContext)
    const [visible,setVisible]=useState(false)
    return (
        <View style={styles.indi}>
        <View style={styles.indi1}>
        <Avatar source={require('../assets/avatar.png')}/>
        <Text>{detail.clientId.split('').slice(0,10).map(dt=>dt)}</Text>
        </View>
   
        <View style={styles.indi2}>
        <Text>{detail.clientLocation}</Text>
        </View>
   
        <View style={styles.indi2}>
        <Text status={detail.riskLevel=='high'?'danger':'success'}>{detail.riskLevel}</Text>
        <OverflowMenu
          anchor={()=>(
            <TouchableOpacity onPress={()=>{
                setVisible(true)
            }}>
            <Icon fill='black' name='more-vertical-outline' style={{
                width:30,
                height:20
            }}/>
        </TouchableOpacity>
          )}
          visible={visible}
          placement='left'
          onBackdropPress={() => setVisible(false)}>
          <MenuItem onPress={()=>{
                 appProps.setCurrentAlert(detail)
                 dispatchNavigation('Mobile')
                 setVisible(false)
             }} title='Dispatch Mobile Unit'/>
          <MenuItem onPress={()=>{
                 appProps.setCurrentAlert(detail)
                 dispatchNavigation('Virtual')
                 setVisible(false)
             }} title='Contact Virtual Councellor'/>
          <MenuItem onPress={()=>{
                 dispatchNavigation('CallFirst')
                 setVisible(false)
                 appProps.setCurrentAlert(detail)
                 
             }} title='Contact First Responder'/>
          <MenuItem onPress={()=>{
                 dispatchNavigation('ContactClient')
                 setVisible(false)
                 appProps.setCurrentAlert(detail)
               
                 
             }} title='Contact Client'/>
          <MenuItem onPress={()=>{
                 dispatchNavigation('CallRef')
                 setVisible(false)
                 appProps.setCurrentAlert(detail)
                 
                 
             }} title='Contact Referal Service'/>

         <MenuItem onPress={()=>{
                 dispatchNavigation('Document')
                 setVisible(false)
                 appProps.setCurrentAlert(detail)
                 
                 
             }} title='Document High Risk'/>
        </OverflowMenu>
        
        
        </View>
        </View>
    )
}
const styles=StyleSheet.create({
    logo:{
        width:100,
        height:100
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
        backgroundColor: '#051A49',
        alignSelf:'flex-start',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%'
        
      },
      text2:{
        margin: 4,
        marginLeft:10
        
      },
      mainClient:{
          display:'flex',
          flex:1
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
        
      }
    
})
export default ClientDetail