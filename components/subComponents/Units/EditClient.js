import { Avatar, Button, Card, CheckBox, Divider, Icon,IndexPath,Input,Select,SelectItem,Spinner,Text } from '@ui-kitten/components'
import React,{useContext, useEffect, useState} from 'react'
import { View, StyleSheet,TouchableOpacity, Image,ScrollView, Dimensions, Alert  } from 'react-native'
import Modal from 'react-native-modal'
import AppContext from '../../../Context/app/appContext'




 function EditClient(props) {
    const appProps=useContext(AppContext)
    const [myClient,setMyclient]=useState([])
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const [checked,setChecked]=useState(true)
    const [question1,setQ1]=useState(false)
    const [question2,setQ2]=useState(false)
    const [question3,setQ3]=useState(false)
    const [total,setTotal]=useState(0)
    const [name,setName]=useState(myClient.length>0?myClient[0].fullName:'')
    const [address,setAddress]=useState(myClient.length>0?myClient[0].address:'')
    const [phone,setPhone]=useState(myClient.length>0?myClient[0].phone:'')
    const [riskLevel,setRiskLevel]=useState('')
    const [sud,setSud]=useState('')
    const [isLoading,setLoading]=useState(false)  
   
    const imageUrl=appProps.staff.image
    useEffect(()=>{
      fetch(`https://tim-acs.herokuapp.com/staff/get-client-demographic/?clientId=${appProps.currentAlert.clientId}`)
      .then(res=>{
          res.json()
          .then(data=>{
            setMyclient([data.clientDemographic])
            setAddress(data.clientDemographic.clientLocation)
            setName(data.clientDemographic.fullName)
            setPhone(data.clientDemographic.phone)
             
          })
      })
    },[])
    return (
        <View style={styles.container}>
                        <TouchableOpacity style={{
                       marginTop:10
                     }} onPress={()=>{
      props.navigation.goBack()
    }}>
      <Icon style={{
        width:25,
        height:25,
        marginLeft:20
      }} name='arrow-back-outline' fill='#3465ff'></Icon>
    </TouchableOpacity>
           <View style={styles.info}>
           <Text style={{
                 color:'#3a3b3c',
                 fontSize:15,
                 fontWeight:'100'
             }}>Edit Client</Text>
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
                 color:'#3a3b3c',
                 fontSize:12,
                 fontWeight:'100'
             }} status='basic'>{appProps.staff.firstName} {appProps.staff.lastName}</Text>
            </View>
           
            </View>

            {/* <View style={styles.nav}>
            <TouchableOpacity onPress={()=>{
                props.navigation.goBack()
            }}  style={styles.arr}>
            <Icon fill='black' name='arrow-back-outline' style={{
                   width:30,
                   height:20 
               }}/>
            </TouchableOpacity>
            <Image style={styles.logo} source={require('../../assets/logo.png')}/>
            </View> */}
            <Divider style={{width:'100%'}}/>
            <View style={{
         height:30,
         backgroundColor:'#3465ff',
         width:'100%'
         }}>
         {/* <Text style={{marginLeft:20,fontWeight:'400'}} appearance='hint' category='label'>Action Type</Text>
         <Text style={{paddingLeft:20,backgroundColor:'#3465ff',marginRight:20,color:'white',width:'100%'}}>Dispatch Mobile Unit</Text> */}
         </View>
            {/* <View style={{

}}>
<Text style={{marginLeft:20,fontWeight:'400'}} appearance='hint' category='label'>Action Type</Text>
<Text style={{paddingLeft:20,backgroundColor:'#3465ff',marginRight:20,color:'white',width:'100%'}}>Edit Client</Text>
</View>
  
   <Divider style={{width:'100%',marginTop:10}}/> */}
            <ScrollView style={styles.history}>
            {/* <Select
         style={{
             width:'90%',
             marginRight:'auto',
             marginLeft:'auto',
             marginTop:10
         }}
         label='Choose Client Code'
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <SelectItem title='Option 1'/>
        <SelectItem title='Option 2'/>
        <SelectItem title='Option 3'/>
      </Select> */}
       <Input
       disabled
       label='Client Code'
         style={{
            width:'95%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10
        }}
        placeholder={appProps.currentAlert.clientId}
         
      /> 
        <View style={styles.myInp}>
        <Input 
          label='Full Name'
          onChangeText={(text)=>{
            setName(text)
        }}
         style={{
            width:'45%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10,
            backgroundColor:'white'
          
            
        }}
        placeholder={myClient.length>0?myClient[0].fullName:''}
         
      /> 


<Input
  onChangeText={(text)=>{
    setAddress(text)
}}
         style={{
            width:'45%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10,
            backgroundColor:'white'
        }}
        placeholder={myClient.length>0?myClient[0].clientLocation:''}
        label='Address'
         
      /> 

        </View>


        <View style={styles.myInp}>
        <Input
         label='Phone'
          onChangeText={(text)=>{
            setPhone(text)
        }}
         style={{
            width:'45%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10,
            backgroundColor:'white'
        }}
        placeholder={myClient.length>0?myClient[0].phone:''}
         
      /> 


<Input
disabled
  onChangeText={(text)=>{
    setRiskLevel(text)
}}
         style={{
            width:'45%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10
        }}
        placeholder={total>50?'High':'Low'}
        label='Risk Level'
         
      /> 

        </View>
        <View style={styles.myInp}>
        <Input
        disabled
        label='SUD Level'
          onChangeText={(text)=>{
            setSud(text)
        }}
         style={{
            width:'95%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10,
            
        }}
        placeholder={total.toString()}
         
      /> 


{/* <Input
         disabled={true}
         style={{
            width:'40%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10
        }}
        placeholder={appProps.currentAlert.clientLocation}
         
      />  */}

        </View>
        
    <Text appearance='hint' style={{
        marginLeft:20,
        marginTop:10
    }}>SUD Screening Questions</Text>
   <Card style={styles.card}>
     <View style={styles.question}>
     <CheckBox
     style={{marginTop:10}}
      checked={question1}
      onChange={(nextChecked) =>{
        setQ1(nextChecked)
        if (nextChecked==true) {
          setTotal(total+20)
        }else{
          setTotal(total-20)
        }
        
      }}>
     {myClient.length>0?myClient[0].sud!==null?Object.entries(myClient[0].sud)[0]:'':''}
    </CheckBox>


    <CheckBox
     style={{marginTop:10}}
      checked={question2}
      onChange={(nextChecked) =>{
        setQ2(nextChecked)
        if (nextChecked==true) {
          setTotal(total+20)
        }else{
          setTotal(total-20)
        }
        
      }}>
     {myClient.length>0?myClient[0].sud!==null?Object.entries(myClient[0].sud)[1]:'':''}
    </CheckBox>



    <CheckBox
     style={{marginTop:10}}
      checked={question3}
      onChange={(nextChecked) =>{
        setQ3(nextChecked)
        if (nextChecked==true) {
          setTotal(total+20)
        }else{
          setTotal(total-20)
        }
        
      }}>
     {myClient.length>0?myClient[0].sud!==null?Object.entries(myClient[0].sud)[2]:'':''}
    </CheckBox>
     </View>
   </Card>



<View style={styles.myInp2}>
<Button
onPress={()=>{
setSud(total)
console.log(total)
}}         
 style={{
    width:'40%',
    marginRight:'auto',
    marginLeft:'auto',
    marginTop:10,
    
        }}  appearance='filled' status='success' accessoryLeft={<Icon name='bulb-outline'/>}>
    Calculate
</Button>

<Button 
onPress={()=>{
  setLoading(true)
  const record={
    fullName:name,
    address,
    phone,
    sudLevel:total
  }
  console.log(record)
  fetch(`https://tim-acs.herokuapp.com/admin/edit-client/?clientId=${myClient.length>0?myClient[0].clientId:''}`,{
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
}}        
 style={{
    width:'40%',
    marginRight:'auto',
    marginLeft:'auto',
    marginTop:10
        }}  appearance='filled' status='primary' accessoryLeft={<Icon name='save-outline'/>}>
    Save
</Button>
</View>

            
           
            </ScrollView>
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
        flex:1,
        backgroundColor:'#ffffff'
    },
    card:{
        width:'90%',
        minHeight:100,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:20,
       
    },
    card2:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    myInp:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-around'
    },
    myInp2:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-around',
        marginTop:20,
        marginBottom:20
    },
    info:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      marginLeft:'auto',
      marginRight:10
      
    },
})
export default EditClient