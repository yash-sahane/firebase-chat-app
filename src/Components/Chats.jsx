import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContextProvider';
import { db } from '../config';
import { ChatContext } from '../Context/ChatContextProvider';
import SearchUser from './SearchUser';
import UserProfile from './UserProfile';
import { calculateTimeAgo } from '../Util/TimeAgo';
import '../Styles/Chats.css';

const Chats = () => {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { data, dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => unsub();
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const addChatHandler = (user) => {
        dispatch({ type: 'CHANGE_USER', payload: user });
    }

    return (
        <div className='chats'>
            <UserProfile />
            <SearchUser />
            <div className='users_chats'>
                {Object.entries(chats)
                    .map(([chatID, chatData]) => ({ chatID, ...chatData }))
                    .sort((a, b) => b.date - a.date)
                    .map((chat) => (
                        <div className='users_chat' key={chat.chatID} onClick={() => addChatHandler(chat.userInfo)}>
                            <div className='users_chat_vr_div'>
                                <span className='users_chat_vr'></span>
                            </div>
                            <div className='users_chat_img_name_div'>
                                <div className='user_chat_img_name'>
                                    <div className='user_chat_profile'>
                                        <div className='profile_img_div'>
                                            <img src={chat.userInfo?.photoURL} alt="" className='user_profile_img' />
                                        </div>
                                        <p>{chat.userInfo?.displayName}</p>
                                    </div>
                                    <p className='users_chat_lastMsgTime'>
                                        {calculateTimeAgo(chat.date)}
                                    </p>
                                </div>
                                {chat?.lastMessage?.message && <p className='users_chat_lastMsg'>{'> ' + chat.lastMessage?.message}</p>}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Chats;
