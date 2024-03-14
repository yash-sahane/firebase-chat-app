import React, { useEffect, useState } from 'react'
import { auth, logInWithEmailAndPassword } from '../config';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from 'react-router-dom';
import sidebarSignupImg from '../assets/signup_siderbar.png';
import sidebarSignupImg2 from '../assets/signup_siderbar_3.jpg';
import './signup.css';

const Login = () => {
    const [userInfo, setUserInfo] = useState({
        email: '',
        pass: ''
    })

    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/");
    }, [user, loading])

    const changeHandler = (e) => {
        const { value, name } = e.target;

        setUserInfo(userInfo => ({
            ...userInfo, [name]: value
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        logInWithEmailAndPassword(userInfo.email, userInfo.pass);
        console.log(userInfo);
    }

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
                    <form action="" onSubmit={submitHandler} className='signup_right'>
                        <h3 className='authHeading'>Login</h3>
                        <span className='heading_border'></span>
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' onChange={changeHandler} className='fieldInput' />
                        <label htmlFor="pass">Pass</label>
                        <input type="pass" name='pass' onChange={changeHandler} className='fieldInput' />
                        <button type='submit' className='authSubmitBtn'>Submit</button>
                        <p>Don't have an account <Link to='/signup'>Signup Here</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login