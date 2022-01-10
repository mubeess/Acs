import { Avatar, Button, Card, Divider, Icon,Input,Spinner,Text } from '@ui-kitten/components'
import React, { useContext, useState,useEffect } from 'react'
import { View, StyleSheet,TouchableOpacity, Image,ScrollView, Dimensions, Alert  } from 'react-native'
import AppContext from '../../../Context/app/appContext'
import Modal from "react-native-modal";
import { SwiperFlatList } from 'react-native-swiper-flatlist';


 function VirtualCouncellor(props) {
     const [isLoading,setLoading]=useState(true)
     const appProps=useContext(AppContext)
     const [myAlert,setAlerts]=useState([])
     const [dispTxt,setDispTxt]=useState('')
     const imageUrl=appProps.staff.image


     const loadAlerts=()=>{
      fetch(`https://tim-acs.herokuapp.com/staff/get-staff-actions-base-on-client/?username=${appProps.staff.username}&clientId=${appProps.currentAlert.clientId}`)
      .then(res=>{
        res.json()
        .then(data=>{
          if (data.success==true) {
          setLoading(false)
          console.log(data)
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
     useEffect(()=>{
      loadAlerts()
     },[])
    return (
        <View style={styles.container}>
                 <TouchableOpacity onPress={()=>{
      props.navigation.goBack()
    }}>
      <Icon style={{
        width:25,
        height:25,
        marginLeft:20
      }} name='arrow-back-outline' fill='#1e4d94'></Icon>
    </TouchableOpacity>
             <View style={styles.info}>
           <Text>Contact Virtual Councellor</Text>
            <View style={{
              flexDirection:'column',
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              marginLeft:40
            }}>
            <Image style={styles.logo} source={{uri: `${imageUrl}`}}/>
            <Text status='basic'>{appProps.staff.firstName} {appProps.staff.lastName}</Text>
            </View>
           
            </View>
          
            <Divider style={{width:'100%'}}/>
          
                    {/* <View style={{
                marginTop:10

}}>
<Text style={{marginLeft:20,fontWeight:'400'}} appearance='hint' category='label'>Action Type</Text>
<Text style={{paddingLeft:20,backgroundColor:'#1e4d94',marginRight:20,color:'white',width:'100%'}}>Contact Virtual Councellor</Text>
</View>
            <Divider style={{width:'100%',marginTop:10}}/> */}
            <ScrollView style={styles.history}>



            {
         myAlert.length==0&&(
          <View style={styles.empty}>
          <Text appearance='hint'>No Any Actions Taken</Text>
          <Icon fill='black' name='alert-triangle-outline' style={{
                 width:30,
                 height:20
             }}/>
        </View>
         )
       }

   


<View style={{
  flex:1,
  backgroundColor:'f9f9f9',
  height:250,
  padding:10
  }}>


<SwiperFlatList
  style={{
    backgroundColor:'f9f9f9',
  }}
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={0}
      showPagination
      data={myAlert}
      renderItem={({ item}) => (
        <Card style={styles.card}>
            <View style={styles.card2}>
            <View style={{maxWidth:'100%',flexDirection:'row'}}>
            <Text style={{color:'white'}}>Name:  </Text> 
            <Text style={{color:'white'}}>{item.staffName}</Text> 
            </View>
           
            <View style={{maxWidth:'100%'}}>
            <View>
           <Text style={{color:'white'}}>
             Staff Id: {item.staffId}
          </Text>
          <Text style={{color:'white'}}>
             Action Type: {item.actionName}
          </Text>
          <Text style={{color:'white'}}>
            Month: {item.month}
          </Text>
        
            </View>
          
            </View>
            </View>
             </Card>
      )}
    />

</View>
            
           
            </ScrollView>
            <Divider style={{width:'100%'}}/>
            <View style={{alignItems:'center'}}>
            <Avatar source={{uri:`${imageUrl}`}}></Avatar>
            <Text>{appProps.staff.username}</Text> 
            </View>
            <View style={{
                position:'relative'
            }}>
            <Text style={{marginLeft:20}}>Dispatch User</Text> 
            <Input
        onChangeText={(txt)=>{
           setDispTxt(txt)
        }}
        multiline={true}
        placeholder={`${appProps.currentAlert.clientId}, ${appProps.currentAlert.clientLocation}, ${appProps.currentAlert.riskLevel}`}
        status='basic'
       
      /> 
      <View style={{
        position:'absolute',
        display:'flex',
       marginLeft:'80%',
       marginTop:20
    }}>
      <Button onPress={()=>{
          setLoading(true)
          const record={
              clientId:appProps.currentAlert.clientId,
              clientActions:{
                  actionName:'Contact Counsellor',
                  staffId:appProps.staff.username,
                  staffName:appProps.staff.firstName,
                  documentation:dispTxt
              }
          } 
          setLoading(true)
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
      }}  appearance='ghost' status='primary' accessoryLeft={<Icon name='arrow-upward-outline'/>}/>
      </View>
      
    
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
       width:50,
       height:50,
       borderRadius:50
     
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
      width:Dimensions.get('window').width-50,
      height:200,
      backgroundColor:'#1e4d94',
      borderRadius:10,
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    
     
     
  },
  card2:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-around'
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
      marginTop:10
    },
})
export default VirtualCouncellor