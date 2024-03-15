import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { db, storage } from '../config';
import { ChatContext } from '../Context/ChatContextProvider';
import { v4 as uuid } from 'uuid';
import { AuthContext } from '../Context/AuthContextProvider';
import { GrAttachment } from "react-icons/gr";
import { LuSend } from "react-icons/lu";
import '../Styles/SendMessages.css';

const SendMessage = () => {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(''); // State to store the file name
    const { data } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);

    const fileInputRef = useRef(null);

    const submitHandler = async (e) => {
        if (e) {
            e.preventDefault();
        }

        if (file) {
            try {
                const storageRef = ref(storage, uuid());
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);

                await updateDoc(doc(db, 'chats', data.chatID), {
                    messages: arrayUnion({
                        id: uuid(),
                        text: message,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                        file: downloadURL,
                    }),
                });
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            if (message.trim().length === 0) return;
            await updateDoc(doc(db, 'chats', data.chatID), {
                messages: arrayUnion({
                    id: uuid(),
                    text: message,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatID + '.lastMessage']: { message },
            [data.chatID + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatID + '.lastMessage']: { message },
            [data.chatID + '.date']: serverTimestamp(),
        });

        setMessage('');
        setFile(null);
        setFileName(''); // Reset the file name after submission
    };

    const handleAttachmentClick = () => {
        fileInputRef.current.click();
    };

    const handleSendMessageClick = () => {
        submitHandler();
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name); // Set the file name when file changes
    };

    return (
        <div className='send_message_div'>
            <form action="" onSubmit={submitHandler}>
                <div className='send_msg_input_div'>
                    <div className='attach_file_icon_div' onClick={handleAttachmentClick}>
                        <GrAttachment className='attach_file_icon' />
                    </div>
                    <input
                        type="text"
                        className='send_msg_input'
                        name="messageInput"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='Enter message'
                    />
                    <input
                        type="file"
                        name="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <div className='selected_file_name'>{fileName}</div> {/* Display the file name */}
                    <div className='send_msg_icon_div' onClick={handleSendMessageClick}>
                        <LuSend className='send_msg_icon' />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SendMessage;
