import { Divider,Icon,Text,Avatar,Popover,Layout } from '@ui-kitten/components'
import React, { useState } from 'react'
import { View,Image,StyleSheet, ScrollView,Dimensions, StatusBar,TouchableOpacity } from 'react-native'


 function ClientDetail({dispatchNavigation}) {
    const [visible,setVisible]=useState(false)
    return (
        <View style={styles.indi}>
        <View style={styles.indi1}>
        <Avatar source={require('../assets/avatar.png')}/>
        <Text>ACS/001</Text>
        </View>
   
        <View style={styles.indi2}>
        <Text>Karewa extension, 10999888</Text>
        </View>
   
        <View style={styles.indi2}>
        <Text status='success'>Low Risk</Text>
        <Popover
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
             <TouchableOpacity onPress={()=>{
                 dispatchNavigation('Mobile')
                 setVisible(false)
             }}>
                  <Text style={{fontWeight:'100'}} appearance='hint' category='h6'>Dispatch Mobile Unit</Text>
              </TouchableOpacity>
              <Divider style={{width:'100%'}}/>
   
              <TouchableOpacity onPress={()=>{
                 dispatchNavigation('Virtual')
                 setVisible(false)
             }}>
                  <Text style={{fontWeight:'100'}} appearance='hint' category='h6'>Contact Virtual Councellor</Text>
              </TouchableOpacity>
              <Divider style={{width:'100%'}}/>
   
   
              <TouchableOpacity onPress={()=>{
                 dispatchNavigation('CallFirst')
                 setVisible(false)
             }}>
                  <Text style={{fontWeight:'100'}} appearance='hint' category='h6'>Contact First Responder</Text>
              </TouchableOpacity>
              <Divider style={{width:'100%'}}/>

              <TouchableOpacity>
                  <Text style={{fontWeight:'100'}} appearance='hint' category='h6'>Contact Client</Text>
              </TouchableOpacity>
              <Divider style={{width:'100%'}}/>

              <TouchableOpacity>
                  <Text style={{fontWeight:'100'}} appearance='hint' category='h6'>Contact Referal Service</Text>
              </TouchableOpacity>
              <Divider style={{width:'100%'}}/>
   
             </Layout>
           </Popover>
        
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