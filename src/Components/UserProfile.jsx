import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutHandler } from '../config';
import { AuthContext } from '../Context/AuthContextProvider';
import { FaPowerOff } from 'react-icons/fa';
import LogoutModal from './LogoutModal';
import './UserProfile.css';

const UserProfile = () => {
    const { currentUser } = useContext(AuthContext);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const signoutHandler = async () => {
        try {
            await logoutHandler();
            navigate('/login');
        } catch (e) {
            console.error('Logout failed:', e.message);
        }
    };

    const handleLogoutClick = () => {
        setLogoutModalOpen(true);
    };

    const closeLogoutModal = () => {
        setLogoutModalOpen(false);
    };

    return (
        <div className='user_profile'>
            <div className='user_profile_left'>
                <div className='profile_img_div'>
                    <img src={currentUser.photoURL} alt='' className='user_profile_img' />
                </div>
                <p className='user_profile_displayName'>{currentUser.displayName}</p>
            </div>
            <FaPowerOff className='signout_btn' onClick={handleLogoutClick} />
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onRequestClose={closeLogoutModal}
                onConfirmLogout={signoutHandler}
            />
        </div>
    );
};

export default UserProfile;
