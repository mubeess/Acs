import { Icon } from '@ui-kitten/components';
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import {TouchableOpacity} from 'react-native'
 
function Message() {
  const [messages, setMessages] = useState([]);
 
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello Mubarak',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
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