import { Divider,Icon,Text,Avatar,Popover,Layout } from '@ui-kitten/components'
import React, { useState } from 'react'
import { View,Image,StyleSheet, ScrollView,Dimensions, StatusBar,TouchableOpacity } from 'react-native'
import ClientDetail from './ClientDetail'

 function Clients() {
     const [visible,setVisible]=useState(false)
    return (
        <View style={{
            backgroundColor:'#ffffff',
            display:'flex',
            flex:1,
            alignItems:'center'
        }}>
            <StatusBar backgroundColor='#051A49'/>
            <Image style={styles.logo} source={require('../assets/logo.png')}/>
            <Divider style={styles.divide}/>
<ScrollView style={styles.mainClient}>
<Text style={styles.text} status='basic'>Clients Table</Text>
            <Divider style={styles.divide}/>
    <View style={styles.controlContainer}>
      <Text style={styles.text2} status='control'>Client Code</Text>
      <Text style={styles.text2} status='control'>Client Location</Text>
      <Text style={styles.text2} status='control'>Level Of Risk</Text>
    </View>

  
  <ClientDetail></ClientDetail>
  <ClientDetail></ClientDetail>
  <ClientDetail></ClientDetail>

    <Text style={styles.text} status='basic'>High Risk Clients Action Table</Text>
            <Divider style={styles.divide}/>
    <View style={styles.controlContainer}>
      <Text style={styles.text2} status='control'>Alert Timestamp</Text>
      <Text style={styles.text2} status='control'>Client Code</Text>
      <Text style={styles.text2} status='control'>Client Location</Text>
    </View>


    <View style={styles.indi}>
     <View style={styles.indi1}>
     <Avatar source={require('../assets/avatar2.png')}/>
     <Text>01/02/01</Text>
     </View>

     <View style={styles.indi2}>
     <Text>Karewa extension, 10999888</Text>
     </View>

     <View style={styles.indi2}>
     <Text status='danger'>High Risk</Text>
     
     </View>
     </View>



     <View style={styles.indi}>
     <View style={styles.indi1}>
     <Avatar source={require('../assets/avatar2.png')}/>
     <Text>01/02/01</Text>
     </View>

     <View style={styles.indi2}>
     <Text>Karewa extension, 10999888</Text>
     </View>

     <View style={styles.indi2}>
     <Text status='danger'>High Risk</Text>
     </View>
     </View>





     <View style={styles.indi}>
     <View style={styles.indi1}>
     <Avatar source={require('../assets/avatar2.png')}/>
     <Text>01/02/01</Text>
     </View>

     <View style={styles.indi2}>
     <Text>Karewa extension, 10999888</Text>
     </View>

     <View style={styles.indi2}>
     <Text status='danger'>High Risk</Text>
     </View>
     </View>








     <View style={styles.indi}>
     <View style={styles.indi1}>
     <Avatar source={require('../assets/avatar2.png')}/>
     <Text>ACS/001</Text>
     </View>

     <View style={styles.indi2}>
     <Text>Karewa extension, 10999888</Text>
     </View>

     <View style={styles.indi2}>
     <Text status='danger'>High Risk</Text>
     </View>
     </View>






</ScrollView>
    
   
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
export default Clients