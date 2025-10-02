import React from 'react'
import './CSS/loginSignup.css';

export const LoginSignup = () => {
  return (
    <div className='login-signup'>
      <div className="login-signup-container">
        <h1>Sign Up</h1>
        <div className="login-signup-feilds">
          <input type="text" placeholder='Your Name' />
          <input type="emial" placeholder='Email Address'/>
          <input type="password" placeholder='password'/>
        </div>
        <button>Continue</button>
        <p className="login-signup-login">
          Already have an account <span>Login here</span>
        </p>
        <div className="login-signup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing , I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}
