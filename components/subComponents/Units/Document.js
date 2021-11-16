import { Avatar, Button, Card, Divider, Icon,IndexPath,Input,Select,SelectItem,Text } from '@ui-kitten/components'
import React,{useState} from 'react'
import { View, StyleSheet,TouchableOpacity, Image,ScrollView, Dimensions  } from 'react-native'




 function Document(props) {
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
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
         <Select
         style={{
             width:'90%',
             marginRight:'auto',
             marginLeft:'auto',
             marginTop:10
         }}
         label='Action Type'
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <SelectItem title='Option 1'/>
        <SelectItem title='Option 2'/>
        <SelectItem title='Option 3'/>
      </Select>
      <Input
         style={{
            width:'90%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10
        }}
        placeholder='User Name'
         
      /> 


<Input
         style={{
            width:'90%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10
        }}
        placeholder='Action Time'
         
      /> 



<Input
         style={{
            width:'90%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:50
        }}
        placeholder='Action Time'
        multiline={true}
        textStyle={{ minHeight: 84 }}
         
      /> 

<Button         
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