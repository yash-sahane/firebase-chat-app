import React, { useContext, useEffect, useRef } from 'react'
import {
    AuthContext, AuthContextProvider
} from '../Context/AuthContextProvider';
import { calculateTimeAgo } from '../Util/TimeAgo';
import './Message.css';

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);

    const ref = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behaviour: 'smooth' });
    }, [message]);

    return (
        <div ref={ref} className={`msg_wrapper ${message.senderId === currentUser.uid ? 'ownerMsg' : ''}`}>
            <div className='msg_txt_div' >
                <span className='msg_hr_line'></span>
                <p className='mst_txt'>
                    {message.text}
                </p>
            </div>
            <div className='user_chat_msgTime_div'>
                {message.date && <p className='users_chat_msgTime'>{calculateTimeAgo(message.date)}</p>}
            </div>
        </div>
    )
}

export default Message