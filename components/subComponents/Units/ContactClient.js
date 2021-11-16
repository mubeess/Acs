import { Avatar, Button, Card, Divider, Icon,Input,Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet,TouchableOpacity, Image,ScrollView, Dimensions  } from 'react-native'




 function ContactClient(props) {
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
            <Text style={{marginLeft:20}} appearance='hint' category='h6'>Call Client</Text>
            <Divider style={{width:'100%'}}/>
            <ScrollView style={styles.history}>
            <View style={{
                display:'flex',
                flexDirection:'row'
            }}>
            <Text style={{marginLeft:20}}>Client Demographics</Text>
            <Button onPress={()=>{
                props.navigation.navigate('Edit')
            }} style={{
                marginLeft:'25%'
            }} size='tiny'  appearance='filled' status='basic' accessoryLeft={<Icon name='edit-outline'/>}>
                Edit
            </Button>

            </View>
          
        <View style={styles.clientDet}> 
           <View style={styles.inpDet}>
           <Text style={[styles.inp,{
               fontWeight:'bold'
           }]}>Name</Text>
           <Text style={styles.inp}>Mubarak Ibrahim</Text>
           </View>

           <View style={styles.inpDet}>
           <Text style={[styles.inp,{
               fontWeight:'bold'
           }]}>Address</Text>
           <Text style={styles.inp}>Karewa extension, Illorin st.</Text>
           </View>
        </View>




        <View style={styles.clientDet}> 
           <View style={styles.inpDet}>
           <Text style={[styles.inp,{
               fontWeight:'bold'
           }]}>Client Code</Text>
           <Text style={styles.inp}>ACS/0011</Text>
           </View>

           <View style={styles.inpDet}>
           <Text style={[styles.inp,{
               fontWeight:'bold'
           }]}>Phone Number</Text>
           <Text style={styles.inp}>08164942224</Text>
           </View>
        </View>





        <View style={styles.clientDet}> 
           <View style={styles.inpDet}>
           <Text style={[styles.inp,{
               fontWeight:'bold'
           }]}>Risk Level</Text>
           <Text style={styles.inp}>High Risk</Text>
           </View>

           <View style={styles.inpDet}>
           <Text style={[styles.inp,{
               fontWeight:'bold'
           }]}>SUD Level</Text>
           <Text style={styles.inp}>90</Text>
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
           }}>56011 Longfellow Str. Detroit, MI 482227</Text>
            <Button size='tiny'  appearance='filled' status='primary' accessoryLeft={<Icon name='globe-outline'/>}>
                Map
            </Button>
           </View>
         <View style={styles.call}>
        <View style={styles.icon}>
        <Icon style={{
            height:30,
            width:30
        }} fill='gray' name='person-outline'/>
        <Text>One musty.zee</Text>
        </View>


        <View style={styles.icon}>
        <Icon style={{
            height:30,
            width:30
        }} fill='gray' name='hash-outline'/>
        <Text>911</Text>
        </View>



        <View style={styles.icon}>
        <TouchableOpacity>
        <Icon style={{
            height:30,
            width:30
        }} fill='green' name='phone-call-outline'/>
        </TouchableOpacity>
       
        
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
            10/05/2021
        </Text>
        <Text>
            9:56Pm EST
        </Text>
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
export default ContactClient