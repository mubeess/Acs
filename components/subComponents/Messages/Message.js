import { Icon } from '@ui-kitten/components';
import React, { useState, useCallback, useEffect, useContext } from 'react'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import {TouchableOpacity} from 'react-native'
import Pusher from 'pusher-js/react-native';
import AppContext from '../../../Context/app/appContext'
function Message(props) {
  const appProps=useContext(AppContext)
  const [messages, setMessages] = useState([]);
  const pusher = new Pusher('4fd41dcde3de7004fcf0', {
    cluster: 'mt1'
  });
  const channel = pusher.subscribe('notifications');

  useEffect(() => {
    console.log("+++++++",appProps)
    channel.bind('vokeAChart', function(data) {
      console.log('doneeee')
       
    });
    setMessages([
      {
        _id: 1,
        text: `${appProps.staff.firstName}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: `${appProps.chatter.firstName}`,
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
 
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
  const renderSend = (sendProps) => {
   return( 
    <Send {...sendProps}>
      <Icon style={{width:30,height:30,marginBottom:10}} name='navigation-2-outline' fill='gray'/>
    </Send>
  );
}
  return (
    <GiftedChat
    scrollToBottom={true}
     renderSend={renderSend}
      alwaysShowSend
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}
export default Message