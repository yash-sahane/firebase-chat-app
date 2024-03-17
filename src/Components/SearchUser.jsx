import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { AuthContext } from '../Context/AuthContextProvider';
import { useContext } from 'react';
import { db, logoutHandler } from '../config';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import '../Styles/SearchUser.css';

const SearchUser = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const searchedUserRef = useRef(null);

    const searchUser = async () => {
        const q = query(collection(db, 'users'), where('displayName', '==', username));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            })
        } catch (e) {
            console.error(e);
        }
    }

    const keyHandler = (e) => {
        e.code === "Enter" && searchUser();
    }

    const userClickHandler = async () => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

        try {
            const res = await getDoc(doc(db, 'chats', combinedId));
            if (!res.exists()) {
                await setDoc(doc(db, 'chats', combinedId), { messages: [] })

                // create chat between user and currentUser
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + '.data']: serverTimestamp()
                })

                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + '.data']: serverTimestamp()
                })
            }

            setUser(null);
            setUsername('')
        } catch (e) {
            console.error(e);
        }
    }

    const handleClickOutside = (event) => {
        if (searchedUserRef.current && !searchedUserRef.current.contains(event.target)) {
            setUser(null);
            setUsername('');
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='search_user' ref={searchedUserRef}>
            <CiSearch className='search_user_icon' />
            <input type="search" name='search' placeholder='Search user' value={username} onKeyDown={keyHandler} onChange={(e) => setUsername(e.target.value)} />
            {user ? <div className='searched_user' onClick={userClickHandler}>
                <div className='profile_img_div searched_profile_div'>
                    <img src={user.photoURL} alt="" className='user_profile_img searched_profile_img' />
                </div>
                <p>{user.displayName}</p>
            </div> :
                <div className='searched_user'>
                    <p>No user found</p>
                </div>}
        </div>
    )
}

export default SearchUser