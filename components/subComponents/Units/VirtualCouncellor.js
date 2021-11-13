import { Avatar, Button, Card, Divider, Icon,Input,Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet,TouchableOpacity, Image,ScrollView, Dimensions  } from 'react-native'




 function VirtualCouncellor(props) {
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
                <Avatar source={require('../../assets/avatar.png')}></Avatar>
                <Text>One Musty.zee</Text>
                </View>
            
            </View>
            <Divider style={{width:'100%'}}/>
            <Text style={{marginLeft:20}} appearance='hint' category='h6'>Contact Councellor</Text>
            <Divider style={{width:'100%'}}/>
            <ScrollView style={styles.history}>


         <Card style={styles.card}>
        <View style={styles.card2}>
        <View style={{maxWidth:'50%'}}>
        <Avatar size='tiny' source={require('../../assets/avatar.png')}></Avatar>
        <Text>333-003-3330</Text> 
        </View>

        <View style={{maxWidth:'50%'}}>
        <View>
       <Text>
         ACS/00033
      </Text>
      <Text>
         ABUJA,JABI ROAD
      </Text>
      <Text>
         HIGH RISK
      </Text>
      <Text style={{backgroundColor:'#051A49',color:'#ffffff'}}>
         sent 10:05-9/10
      </Text>
        </View>
      
        </View>
        </View>
         </Card>





         <Card style={styles.card}>
        <View style={styles.card2}>
        <View style={{maxWidth:'50%'}}>
        <Avatar size='tiny' source={require('../../assets/avatar.png')}></Avatar>
        <Text>333-003-3330</Text> 
        </View>

        <View style={{maxWidth:'50%'}}>
        <View>
       <Text>
         ACS/00033
      </Text>
      <Text>
         ABUJA,JABI ROAD
      </Text>
      <Text>
         HIGH RISK
      </Text>
      <Text style={{backgroundColor:'#051A49',color:'#ffffff'}}>
         sent 10:05-9/10
      </Text>
        </View>
      
        </View>
        </View>
         </Card>





         <Card style={styles.card}>
        <View style={styles.card2}>
        <View style={{maxWidth:'50%'}}>
        <Avatar size='tiny' source={require('../../assets/avatar.png')}></Avatar>
        <Text>333-003-3330</Text> 
        </View>

        <View style={{maxWidth:'50%'}}>
        <View>
       <Text>
         ACS/00033
      </Text>
      <Text>
         ABUJA,JABI ROAD
      </Text>
      <Text>
         HIGH RISK
      </Text>
      <Text style={{backgroundColor:'#051A49',color:'#ffffff'}}>
         sent 10:05-9/10
      </Text>
        </View>
      
        </View>
        </View>
         </Card>
            
           
            </ScrollView>
            <Divider style={{width:'100%'}}/>
            <View style={{alignItems:'center'}}>
            <Avatar source={require('../../assets/avatar.png')}></Avatar>
            <Text>African Coder</Text> 
            </View>
            <View style={{
                position:'relative'
            }}>
            <Text style={{marginLeft:20}}>Dispatch User</Text> 
            <Input
            disabled
        multiline={true}
        placeholder='ACS/001, ABJ-JABI,High Risk'
        status='basic'
       
      /> 
      <View style={{
        position:'absolute',
        display:'flex',
       marginLeft:'80%',
       marginTop:20
    }}>
      <Button  appearance='ghost' status='primary' accessoryLeft={<Icon name='arrow-upward-outline'/>}/>
      </View>
    
            </View>
            
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
    }
})
export default VirtualCouncellor