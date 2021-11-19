import React, { useContext, useEffect, useState } from 'react'
import {Avatar, Divider, Icon, Input, Text} from '@ui-kitten/components'
import { View,StyleSheet,ScrollView,TouchableOpacity } from 'react-native'
import AppContext from '../../../Context/app/appContext'


 function StaffList(props) {
     const appProps=useContext(AppContext)
     const [allStaff,setAllStaff]=useState([])
     useEffect(()=>{
         fetch('https://tim-acs.herokuapp.com/staff/get-all-staff')
         .then(res=>{
             res.json()
             .then(data=>{
                 console.log(data)
                 setAllStaff(data.message)
             })
         })
     })
    return (
        <View style={styles.container}>
            <View style={styles.nav}>
             <Text category='h6' style={{
                 fontWeight:'bold',
                 color:'black'
             }}>Message</Text>
            </View>
            <Divider style={{width:'100%'}}/>
            <Input
            style={{
                width:'90%',
                height:20,
                marginLeft:'auto',
                marginRight:'auto',
                marginTop:10
            }} 
             accessoryRight={<Icon style={{}} name='search-outline'/>}
             placeholder='Search' 
             size='small'/>
             
             <ScrollView style={styles.main}>
                 {
                     allStaff.length>0&&(
                         allStaff.map(staf=>(
                            <TouchableOpacity onPress={()=>{
                                props.navigation.navigate('Message')
                                appProps.setChatter(staf)
                                }}>
                                <View style={styles.individual}>
                                    <View style={styles.avatar}>
                                    <Avatar size='large' source={require('../../assets/avatar.png')}/>
                                    </View>
                                    <View style={styles.mainDet}>
                                        <View style={styles.names}>
                                        <Text style={{
                                            fontWeight:'bold'
                                        }}>{staf.firstName} {staf.lastName}</Text>
                                        <Text appearance='hint' style={{
                                            marginLeft:'auto',
                                            marginRight:10,
                                            fontWeight:'100'
                                        }}>10:00</Text>
                                        </View>
                                        <View>
                                        <Text appearance='hint'>
                                           {staf.username}
                                        </Text>
                                        </View>
               
                                    </View>
               
                                </View>
                                </TouchableOpacity>
                         ))
                     )
                 }








                








                







             </ScrollView>
        </View>
    )
}
const styles=StyleSheet.create({
container:{
    backgroundColor:'#ffffff',
    display:'flex',
    flex:1
},
nav:{
    height:50,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
},
main:{
    flex:1,
    backgroundColor:'#ffffff',
    marginTop:20
},
individual:{
    height:70,
    backgroundColor:'#f9f9f9',
    width:'90%',
    marginRight:'auto',
    marginLeft:'auto',
    display:'flex',
    flexDirection:'row',
    borderRadius:10,
    marginTop:10,
    borderBottomColor:'lightgray',
    borderBottomWidth:1/2
},
avatar:{
    height:50,
    width:50,
    backgroundColor:'#f9f9f9',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:'auto',
    marginBottom:'auto'
},
mainDet:{
    width:'80%',
    height:'90%',
    backgroundColor:'#f9f9f9',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:'auto',
    marginBottom:'auto'
},
names:{
    display:'flex',
    flexDirection:'row'
}
})
export default StaffList