// import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from 'react';
import Pusher from 'pusher-js';
import Sidebar from './sidebar';
import axios from './axios';
import Chat from './Chat';
function App() {
   const [messages,setMessages]=useState([])
   useEffect(()=>{
     axios.get('/messages/sync').then(response=>{
       console.log(response.data)
       setMessages(response.data)
     })
   },[])
  useEffect(()=>{
    var pusher = new Pusher('4b7549ce8f4c5434c509', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted',(newMessage)=> {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage]);
    });
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();

    }
  },[messages]);
  console.log(messages);
  return (
    <div className="app">
      <div className="app-body">
     <Sidebar/>
     <Chat messages={messages}/> 
     </div>
    </div>
  );
}

export default App;
