import { Divider,Icon,Text,Avatar,Popover,Layout, OverflowMenu, MenuItem } from '@ui-kitten/components'
import React, { useContext, useState } from 'react'
import { View,Image,StyleSheet, ScrollView,Dimensions, StatusBar,TouchableOpacity } from 'react-native'
import AppContext from '../../Context/app/appContext'

 function HighRisk({dispatchNavigation,detail}) {
    const [visible,setVisible]=useState(false)
    const appProps=useContext(AppContext)
    return (
        <View style={styles.indi}>
        <View style={styles.indi1}>
        <Avatar source={require('../assets/avatar3.png')}/>
        <Text>01/01/01</Text>
        </View>
   
        <View style={styles.indi2}>
        <Text>{detail.clientId}</Text>
        </View>
   
        <View style={styles.indi2}>
        <Text>{detail.clientLocation}</Text>
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
                 dispatchNavigation('Mobile')
                 setVisible(false)
                 appProps.setCurrentAlert(detail)
             }} title='Dispatch Mobile Unit'/>
          <MenuItem onPress={()=>{
                 dispatchNavigation('Virtual')
                 setVisible(false)
                 appProps.setCurrentAlert(detail)
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
        
        {/* <Popover
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
             onBackdropPress={() => {
                 setVisible(false)
             }}>
             <Layout style={styles.content}>
              <TouchableOpacity>
                  <Text appearance='hint' category='h6'>Dispatch Mobile Unit</Text>
              </TouchableOpacity>
              <Divider style={{width:'100%'}}/>
   
              <TouchableOpacity>
                  <Text appearance='hint' category='h6'>Contact Virtual Councellor</Text>
              </TouchableOpacity>
              <Divider style={{width:'100%'}}/>
   
   
              <TouchableOpacity>
                  <Text appearance='hint' category='h6'>Contact First Responder</Text>
              </TouchableOpacity>
              <Divider style={{width:'100%'}}/>

              <TouchableOpacity>
                  <Text appearance='hint' category='h6'>Contact Client</Text>
              </TouchableOpacity>
              <Divider style={{width:'100%'}}/>

              <TouchableOpacity>
                  <Text appearance='hint' category='h6'>Contact Referal Service</Text>
              </TouchableOpacity>
              <Divider style={{width:'100%'}}/>
   
             </Layout>
           </Popover> */}
        
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
export default HighRisk