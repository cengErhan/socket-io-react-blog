import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const sendMessage = () => {
    socket.emit('send_message', { message });
  };

  useEffect(() => {
    const handler =(chatMessage) => {
      setChatMessages([...chatMessages, chatMessage])
    }

    socket.on('receive_message', handler);

    return () => socket.off('receiveMessage', handler);

  }, [chatMessages]);

  return (
    <div className='App'>
      <h1>Chat App with Socket.IO</h1>
      <input
        type='text'
        placeholder='Message...'
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message : </h1>
      {chatMessages.map((item)=>{
        return(<div key={Math.random()}>{item.message}</div>)
      })}
    </div>
  );
}

export default App;
