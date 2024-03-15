import React from 'react'
import Chat from '../Components/Chat'
import Chats from '../Components/Chats'
import '../Styles/Home.css';

const Home = () => {
    return (
        <div className='main_page'>
            <Chats />
            <Chat />
        </div>
    )
}

export default Home