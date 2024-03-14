import React, { useContext } from 'react';
import { ChatContext } from '../Context/ChatContextProvider';
import Messages from './Messages';
import SendMessage from './SendMessage';
import './Chat.css';

const Chat = () => {
    const { data } = useContext(ChatContext);
    console.log(data.user);

    return (
        <div className='user_chat_active'>
            {data.user.displayName ? (
                <>
                    <div className='chat_user_profile'>
                        <div className='profile_img_div'>
                            <img src={data?.user.photoURL} alt="" className='user_profile_img' />
                        </div>
                        <p>{data?.user.displayName}</p>
                    </div>
                    <Messages />
                    <SendMessage />
                </>
            ) : (
                <div className='no_user_chat'><p>Please select any users from chats</p></div>
            )}
        </div>
    );
}

export default Chat;
