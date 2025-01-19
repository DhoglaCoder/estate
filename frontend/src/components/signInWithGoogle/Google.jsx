import React from 'react'
import GoogleImg from '../../assets/google.png'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../Firebase/firebase';
import { toast } from 'react-toastify';

export default function Google() {
  const GoogleLogin=()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider).then(async(result)=>{
      console.log(result);
    })
    .catch((error) => {
      console.error('Error during Google sign-in:', error);
    });
    if(result.user){
      window.localStorage.setItem("LogedIn", true);
      toast.success("User logged in successfully",{
        position: "top-center"
      });
    }
  }


  return (
    <div>
      <p className="continue-p" style={{textAlign:"center"}}>--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={GoogleLogin}
      >
        <img src={GoogleImg} width={"60%"} />
      </div>
    </div>
  )
}
