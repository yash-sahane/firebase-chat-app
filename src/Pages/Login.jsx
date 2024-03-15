import React, { useEffect, useState } from 'react'
import { auth, logInWithEmailAndPassword } from '../config';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from 'react-router-dom';
import sidebarSignupImg from '../assets/signup_siderbar.png';
import sidebarSignupImg2 from '../assets/signup_siderbar_3.jpg';
import '../Styles/signup.css';

const Login = () => {
    const [userInfo, setUserInfo] = useState({
        email: '',
        pass: ''
    })

    const [user, loading, error] = useAuthState(auth);
    const [loginError, setLoginError] = useState(null); // State to store login error
    const [errors, setErrors] = useState({ email: '', pass: '' }); // State to store form field errors
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

    const validateForm = () => {
        const { email, pass } = userInfo;
        const errors = {};
        let isValid = true;

        if (!email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        }
        if (!pass.trim()) {
            errors.pass = 'Password is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                await logInWithEmailAndPassword(userInfo.email, userInfo.pass);
                console.log(userInfo);
            } catch (error) {
                if (error.message === 'Invalid credentials') {
                    setLoginError('Invalid credentials')
                }
                setLoginError(error.message); // Set the login error
            }
        }
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
                        {errors.email && <p className="error">{errors.email}</p>} {/* Display email error message */}
                        <label htmlFor="pass">Password</label>
                        <input type="password" name='pass' onChange={changeHandler} className='fieldInput' /> {/* Change type to password */}
                        {errors.pass && <p className="error">{errors.pass}</p>} {/* Display password error message */}
                        {loginError && <p className="error">{loginError}</p>} {/* Display login error message */}
                        <button type='submit' className='authSubmitBtn'>Submit</button>
                        <p className='account_exist'>Don't have an account <Link to='/signup'>Signup Here</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
