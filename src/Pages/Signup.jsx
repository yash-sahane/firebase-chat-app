import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sidebarSignupImg from '../assets/signup_siderbar.png';
import sidebarSignupImg2 from '../assets/signup_siderbar_3.jpg'
import uploadImg from '../assets/addAvatar.png'
import { registerWithEmailAndPassword } from '../config';
import Loading from '../UI/Loading';
import '../Styles/signup.css';

const Signup = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        displayName: '',
        email: '',
        pass: '',
        avatar: null,
    });
    const [errors, setErrors] = useState({});
    const [avatarFileName, setAvatarFileName] = useState('Add an avatar');
    const [loading, setLoading] = useState(false); // Add loading state
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (!userInfo.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        if (!userInfo.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }
        if (!userInfo.displayName.trim()) {
            errors.displayName = 'Display name is required';
        }
        if (!userInfo.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
            errors.email = 'Email is invalid';
        }
        if (!userInfo.pass.trim()) {
            errors.pass = 'Password is required';
        } else if (userInfo.pass.length < 8) {
            errors.pass = 'Password must be at least 8 characters';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

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
        setAvatarFileName(file.name); // Set the file name
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        let hasError = false;
        if (validateForm()) {
            setLoading(true); // Set loading to true
            try {
                await registerWithEmailAndPassword(userInfo);
                navigate('/'); // Navigate on successful registration
            } catch (error) {
                if (error.message === 'Email already in use') {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: 'Email is already in use',
                    }));
                } else if (error.message === 'Display name should be unique') {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        displayName: 'Display name should be unique'
                    }))
                }
                else if (error.message === 'Invalid email') {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: 'Invalid email'
                    }))
                }
                else {
                    console.error(error);
                }
                hasError = true;
            } finally {
                setLoading(false); // Set loading to false regardless of success or error
            }
        } else {
            hasError = true;
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
                        <div className='reg_loading'>
                            <div>
                                <h3 className='authHeading'>Registration </h3>
                                <span className='heading_border'></span>
                            </div>
                            <div className='loading_icon_div'>
                                {loading && <Loading />}
                            </div>
                        </div>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" onChange={changeHandler} placeholder='Enter first name' />
                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" onChange={changeHandler} placeholder='Enter last name' />
                        {errors.lastName && <p className="error">{errors.lastName}</p>}
                        <label htmlFor="displayName">Display Name</label>
                        <input type="text" name="displayName" onChange={changeHandler} placeholder='Enter display name' />
                        {errors.displayName && <p className="error">{errors.displayName}</p>}
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" onChange={changeHandler} placeholder='Enter email' />
                        {errors.email && <p className="error">{errors.email}</p>}
                        <label htmlFor="pass">Password</label>
                        <input type="password" name="pass" onChange={changeHandler} placeholder='Enter password' />
                        {errors.pass && <p className="error">{errors.pass}</p>}
                        <label htmlFor="avatar" className="avatar_label">
                            <img src={uploadImg} alt="Upload Avatar" />
                            <span>{avatarFileName}</span>
                        </label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            id="avatar"
                            accept="image/*"
                            onChange={fileChangeHandler}
                            className="hidden-file-input"
                        />
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <button className='authSubmitBtn' type="submit">Submit</button>
                        )}
                        <p className='account_exist'>Already have an account <Link to='/login'>Signin</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
