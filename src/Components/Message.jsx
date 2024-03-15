import React, { useContext, useEffect, useRef } from 'react'
import {
    AuthContext, AuthContextProvider
} from '../Context/AuthContextProvider';
import { calculateTimeAgo } from '../Util/TimeAgo';
import '../Styles/Message.css';

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);

    const ref = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behaviour: 'smooth' });
    }, [message]);

    return (
        <div ref={ref} className={`msg_wrapper ${message.senderId === currentUser.uid ? 'ownerMsg' : ''}`}>
            <div className="msg_txt_img_div">
                {message && message.text && message.text.trim().length > 0 &&
                    <div className='msg_txt_div' >
                        <span className='msg_hr_line'></span>
                        <p className='mst_txt'>
                            {message.text}
                        </p>
                    </div>
                }
                {message && message.file && (
                    <img src={message.file} alt="" className='img_msg' />
                )}
            </div>

            <div className='user_chat_msgTime_div'>
                {(message.date || message.timeStamp) && <p className='users_chat_msgTime'>{calculateTimeAgo((message.date || message.timeStamp))}</p>}
            </div>
        </div>
    )
}

export default Message