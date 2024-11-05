import React, { useRef, useState } from 'react'
import SockJsClient from 'react-stomp';
import { toast } from 'react-toastify';


const SOCKET_URL = 'http://localhost:8081/api/manager/ws-message';

const WebSocket = () => {
    const [message, setMessage] = useState('You server message here.');

    const onConnected = () => {
      console.log("Connected!!")
    }

    const onDisconnected = () => {
      console.log('Disconnected from WebSocket!');
    };
  
    const onMessageReceived = (msg) => {
        console.log('Received message ' + msg)
        setMessage(msg.message);
        toast.success(msg.message)
    }

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={onDisconnected}
        onMessage={msg => onMessageReceived(msg)}
        debug={true}
      />
      <div>{message}</div>
    </div>
  );
}

export default WebSocket