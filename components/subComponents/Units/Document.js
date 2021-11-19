import { Avatar, Button, Card, Divider, Icon,IndexPath,Input,Select,SelectItem,Text } from '@ui-kitten/components'
import React,{useState} from 'react'
import { View, StyleSheet,TouchableOpacity, Image,ScrollView, Dimensions  } from 'react-native'




 function Document(props) {
    const myData=['Mobile Unit','Documentation']
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const [action,setAction]=useState('')
    const [userName,setUsername]=useState('')
    const [actionTime,setActionTime]=useState('')
    const [actionMessage,setActionMessage]=useState('')
    const displayValue = myData[selectedIndex.row];
    const renderOption = (title) => (
        <SelectItem title={title}/>
      );
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
            <Text style={{marginLeft:20}} appearance='hint' category='h6'>High Risk Action Documentation</Text>
            <Divider style={{width:'100%'}}/>
            <ScrollView style={styles.history}>
         {/* <Select
         value={myData[selectedIndex.row]}
         style={{
             width:'90%',
             marginRight:'auto',
             marginLeft:'auto',
             marginTop:10
         }}
         label='Action Type'
        selectedIndex={myData[selectedIndex.row]}
        onSelect={(index)=>{
            console.log(index)
        } }>
            {
                myData.map((dat,ind)=>(
                    <SelectItem key={ind}  title={dat}/>  
                ))
            }
      
      </Select> */}
      <Select
        style={{
            width:'90%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10
        }}
        placeholder='Default'
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        {myData.map(renderOption)}
      </Select>

      <Input
      onTextInput={(text)=>{
        setUsername(text)
    }}
         style={{
            width:'90%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10
        }}
        placeholder='User Name'
        value={userName}
         
      /> 


<Input
onTextInput={(text)=>{
    setActionTime(text)
}}
         style={{
            width:'90%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10
        }}
        placeholder='Action Time'
        value={actionTime}
         
      /> 



<Input
onTextInput={(text)=>{
    setActionMessage(text)
}}
         style={{
            width:'90%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:50
        }}
        placeholder='Action Message'
        multiline={true}
        textStyle={{ minHeight: 84 }}
        value={actionMessage}
         
      /> 

<Button
onPress={()=>{
    console.log(myData[selectedIndex.row])
}}         
 style={{
            width:'90%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:5
        }}  appearance='filled' status='primary' accessoryLeft={<Icon name='save-outline'/>}>
    Save
</Button>
            
           
            </ScrollView>
            
            
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
        flex:1,
        backgroundColor:'#ffffff'
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
export default Document