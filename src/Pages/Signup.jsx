import React, { useRef, useState } from 'react';
import { registerWithEmailAndPassword } from '../config';
import { Link, useNavigate } from 'react-router-dom';
import sidebarSignupImg from '../assets/signup_siderbar.png';
import sidebarSignupImg2 from '../assets/signup_siderbar_3.jpg'
import uploadImg from '../assets/addAvatar.png'
import './signup.css';


const Signup = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        displayName: '',
        email: '',
        pass: '',
        avatar: null,
    });

    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    const changeHandler = (e) => {
        const { value, name } = e.target;

        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files[0];
        setUserInfo((prev) => ({
            ...prev,
            avatar: file,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await registerWithEmailAndPassword(userInfo);
            console.log('User registered successfully!');
            navigate('/');
        } catch (e) {
            console.error(e.message);
        }
    };

    return (
        <div className='signup_main'>
            <div className="signup_main_left_img"><img src={sidebarSignupImg} alt="" /></div>
            <div className='signup_main_right_img'>
                <img src={sidebarSignupImg2} alt="" />
            </div>
            <div className="signup_absolute">
                <div className="signup">
                    <div className='signup_left'>
                        <img src={sidebarSignupImg} alt="" className='sidebar_signup_img' />
                    </div>
                    <form onSubmit={submitHandler} className='signup_right'>
                        <h3 className='authHeading'>Registration</h3>
                        <span className='heading_border'></span>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" onChange={changeHandler} />
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" onChange={changeHandler} />
                        <label htmlFor="displayName">Display Name</label>
                        <input type="text" name="displayName" onChange={changeHandler} />
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" onChange={changeHandler} />
                        <label htmlFor="pass">Password</label>
                        <input type="password" name="pass" onChange={changeHandler} />
                        <label htmlFor="avatar" className="avatar_label">
                            <img src={uploadImg} alt="Upload Avatar" />
                            <span>Add an avatar</span>
                        </label>
                        <input
                            ref={fileInputRef}
                            required
                            type="file"
                            id="avatar"
                            accept="image/*"
                            onChange={fileChangeHandler}
                            style={{ display: 'none' }}
                        />
                        <button className='authSubmitBtn' type="submit">Submit</button>
                        <p>Already have an account <Link to='/login'>Signin</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
