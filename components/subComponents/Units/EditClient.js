import { Avatar, Button, Card, CheckBox, Divider, Icon,IndexPath,Input,Select,SelectItem,Text } from '@ui-kitten/components'
import React,{useState} from 'react'
import { View, StyleSheet,TouchableOpacity, Image,ScrollView, Dimensions  } from 'react-native'




 function EditClient(props) {
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const [checked,setChecked]=useState(true)
    return (
        <View style={styles.container}>
            <View style={styles.nav}>
            <TouchableOpacity onPress={()=>{
                props.navigation.goBack()
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
            <Text style={{marginLeft:20}} appearance='hint' category='h6'>Edit Client</Text>
            <Divider style={{width:'100%'}}/>
            <ScrollView style={styles.history}>
            <Select
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
      </Select>
        <View style={styles.myInp}>
        <Input
         style={{
            width:'40%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10
        }}
        placeholder='Name'
         
      /> 


<Input
         style={{
            width:'40%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10
        }}
        placeholder='Address'
         
      /> 

        </View>


        <View style={styles.myInp}>
        <Input
         style={{
            width:'40%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10
        }}
        placeholder='Phone Number'
         
      /> 


<Input
         style={{
            width:'40%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10
        }}
        placeholder='Risk Level'
         
      /> 

        </View>
        <View style={styles.myInp}>
        <Input
         style={{
            width:'40%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10
        }}
        placeholder='SUD Level'
         
      /> 


<Input
         style={{
            width:'40%',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:10
        }}
        placeholder='Location'
         
      /> 

        </View>
        
    <Text appearance='hint' style={{
        marginLeft:20,
        marginTop:10
    }}>SUD Screening Questions</Text>
   <Card style={styles.card}>
     <View style={styles.question}>
     <CheckBox
     style={{marginTop:10}}
      checked={checked}
      onChange={nextChecked => setChecked(nextChecked)}>
     Question 1
    </CheckBox>


    <CheckBox
     style={{marginTop:10}}
      checked={checked}
      onChange={nextChecked => setChecked(nextChecked)}>
     Question 2
    </CheckBox>



    <CheckBox
     style={{marginTop:10}}
      checked={checked}
      onChange={nextChecked => setChecked(nextChecked)}>
     Question 3
    </CheckBox>
     </View>
   </Card>



<View style={styles.myInp2}>
<Button         
 style={{
    width:'40%',
    marginRight:'auto',
    marginLeft:'auto',
    marginTop:10,
    
        }}  appearance='filled' status='success' accessoryLeft={<Icon name='bulb-outline'/>}>
    Calculate
</Button>

<Button         
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
    }
})
export default EditClient