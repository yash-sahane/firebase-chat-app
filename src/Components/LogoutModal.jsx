import React from 'react';
import Modal from 'react-modal';
import './LogoutModal.css'; // Add a separate CSS file for styling

const LogoutModal = ({ isOpen, onRequestClose, onConfirmLogout }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel='Logout Confirmation'
            className='logout-modal'
            overlayClassName='overlay'
        >
            <div className='modal-content'>
                <h2>Logout Confirmation</h2>
                <p>Are you sure you want to log out?</p>
                <div className='button-container'>
                    <button className='confirm-btn' onClick={onConfirmLogout}>
                        Yes, Logout
                    </button>
                    <button className='cancel-btn' onClick={onRequestClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default LogoutModal;
