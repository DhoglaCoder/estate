import React, { useState, useEffect } from 'react'
import './Login.css'
import Img from '../../assets/login_background.jpg'
import Google from '../../components/signInWithGoogle/Google'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from "firebase/firestore";
import { auth,db } from '../../components/Firebase/firebase'
import { toast } from 'react-toastify'
import Top from '../../components/Navbar/Top'

export default function Login() {
    const navigate = useNavigate();
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;
            window.localStorage.setItem("LogedIn", true);
            window.localStorage.setItem("uid", user.uid);
            const userDocRef = doc(db, "Users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                window.localStorage.setItem("uname", userData.name); // Store user's name
            } else {
                console.log("No user data found in Firestore");
                window.localStorage.setItem("uname", "Unknown User");
            }
            console.log("User logged in Successfully");
            toast.success("User logged in Successfully",{
                position: "top-center"
            })
            navigate("/");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message,{
                position:"top-center",
            })
        }
    }
    useEffect(() => {
        document.title = 'Login Page';
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
            <form className='register-page-form' onSubmit={handleSubmit}>
            <div className="heading">
                <p>Login</p>
            </div>
            <div className="account">
                <input
                type="text"
                name="email"
                placeholder="Enter your Email id"
                className='register-name'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                className='register-password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                />
            </div>
            <button type='submit'>Login</button>
            <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            {/* <center><Link to="/" style={{color:'#007bff'}}>Go Back</Link></center> */}
            <Google/>
            </form>
            </div>
        </div>
    </div>
    </>
  )
}
