import { Icon } from '@ui-kitten/components';
import React, { useState, useCallback, useEffect, useContext } from 'react'
import { Chat, defaultTheme, MessageType } from '@flyerhq/react-native-chat-ui'
import {TouchableOpacity} from 'react-native'
import Pusher from 'pusher-js/react-native';
import AppContext from '../../../Context/app/appContext'

function Message(props) {
  const user = { id: '06c33e8b-e835-4736-80f4-63f44b66666c' }
  const user2 = { id: '06c33e8b-e835-736-80f4-63f4466666c' }
  const appProps=useContext(AppContext)
  const [messages, setMessages] = useState([]);
  const pusher = new Pusher('4fd41dcde3de7004fcf0', {
    cluster: 'mt1'
  });
  const channel = pusher.subscribe('notifications');

  useEffect(() => {
    console.log('++++++++',appProps.chatter)
    fetch(`https://tim-acs.herokuapp.com/staff/get-prev-chart/?senderId=${appProps.staff.username}&receiverId=${appProps.chatter.username}`)
    .then(res=>{
      res.json()
      .then(data=>{
        console.log('++++++++',data)
        if (data.message.length>0) {
          const myNewMessage=[]
          
          data.message.map(msg=>{
            const formed={
              author:{id:msg.senderId},
               createdAt: msg.time,
                id: msg.time,
                 text:msg.message,
                 type: 'text',
            }
            myNewMessage.push(formed)
           
            
            
          })
          setMessages(myNewMessage.reverse())
        }
        
      }).catch(err=>{
        console.log(err)
      })
    }).catch(err=>{
      console.log(err)
    })
    channel.bind('vokeAChart', function(data) {
      const myNewMessage=[]
          data.allChart.map(msg=>{
            const formed={
              author:{id:msg.senderId},
               createdAt: msg.time,
                id: msg.time,
                 text:msg.message,
                 type: 'text',
            }
            myNewMessage.push(formed)
          })
          setMessages(myNewMessage.reverse())
      console.log("--------",data)
         });
   
  }, [])
  const addMessage = (message) => {
    setMessages([message, ...messages])
  }

  const handleSendPress = (message) => {
    const obj={
      staffOnID:appProps.staff.username,
      staffTwoId:appProps.chatter.username,
      message:message.text,
      senderId:appProps.staff.username,
      receiverId:appProps.chatter.username
    }
    console.log("++++",messages,obj)
    fetch(`https://tim-acs.herokuapp.com/voke-a-chart`,{
      method:'POST',
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify(obj)
    })
  .then(res=>{
  res.json()
  .then(data=>{
    console.log("++++",data)
    
  }).catch(err=>{
    console.log(err)
  })
}).catch(err=>{
  console.log(err)
})

  }
 
  return (
    <Chat
    theme={{
      ...defaultTheme,
      colors: { ...defaultTheme.colors, inputBackground: '#f9f9f9',inputText:'#000000' },
    }}
        messages={messages}
        onSendPress={handleSendPress}
        user={{id:appProps.staff.username}}
      />
  )
}
export default Message

// onSend(messages)