import React, { useState, useEffect } from 'react'
import './Signup.css'
import Img from '../../assets/login_background.jpg'
import Google from '../../components/signInWithGoogle/Google'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../components/Firebase/firebase'
import { setDoc, doc } from 'firebase/firestore'
import { toast } from "react-toastify"
import Top from '../../components/Navbar/Top'

export default function Signup() {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");

    const handleRegister = async (e)=>{
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user details in Firestore
        await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            name: name,
            phone: phone,
        });

        // Store user info in localStorage
        window.localStorage.setItem("LogedIn", true);
        window.localStorage.setItem("uname", name); // Store name correctly
        window.localStorage.setItem("uid", user.uid);

        console.log("User registered successfully");
        toast.success("User Registered Successfully", {
            position: "top-center"
        });

        navigate("/");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message,{
                position:"top-center"
            })
        }
    };
    useEffect(() => {
        document.title = 'Registeration Page';
      }, []);

  return (
    <>
    <Top/>
    <div className='register-page-main'>
    {/* <button className="back-button" onClick={() => navigate('/')}>
          &lt; Back
        </button> */}
        <div className="register-image-div">
            <img src={Img} alt="image" />
        </div>
        <div className="register-page-content">
            <div className="register-page-content-2">
            <form className='register-page-form' onSubmit={handleRegister}>
            <div className="heading">
                <p>Register Here</p>
            </div>
            <div className="account">
                <input
                type="text"
                name="name"
                placeholder="Enter your Name"
                className='register-name'
                onChange={(e)=>setName(e.target.value)}
                required
                />
                <input
                type="email"
                name="email"
                placeholder="Enter your Email id"
                className='register-email'
                onChange={(e)=>setEmail(e.target.value)}
                required
                />
                <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Enter your Phone Number" 
                    className='register-phone'
                    onChange={(e)=>setPhone(e.target.value)}
                    required
                />
                <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                className='register-password'
                onChange={(e)=>setPassword(e.target.value)}
                required
                />
            </div>
            <button type='submit'>Sign Up</button>
            <p>
                Already have an account? <Link to="/login">Login</Link>
                </p>
            <Google/>
            </form>
            </div>
        </div>
    </div>
    </>
  )
}
