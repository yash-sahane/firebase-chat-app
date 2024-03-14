/* Messages.jsx */

import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../Context/ChatContextProvider';
import Message from './Message';
import { db } from '../config';
import './Messages.css';
import { doc, onSnapshot } from 'firebase/firestore';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, `chats/${data.chatID}`), (doc) => {
            if (doc.exists()) {
                setMessages(doc.data().messages);
            } else {
                setMessages([]);
            }
        });

        return () => unsub();
    }, [data.chatID]);

    useEffect(() => {
        console.log(messages);
    }, [messages]);

    return (
        <div className='messages'>
            {messages.map(msg => (
                <Message message={msg} key={msg.id} />
            ))}
        </div>
    );
}

export default Messages;
