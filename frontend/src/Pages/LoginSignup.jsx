import React , {useState} from 'react'
import './CSS/loginSignup.css';

export const LoginSignup = () => {
  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })
  const login = async () => {
      console.log("login function",formData)
      let responseData;
      await fetch('http://localhost:4000/login',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      }).then((response)=> response.json()).then((data)=>responseData = data);
      if(responseData.success){
        localStorage.setItem('auth-token',responseData.token);
        window.location.href = "/";
      }
      else{
        alert(responseData.errors);
      } 
  }

  const signup = async () => {
      console.log("signup function",formData);
      let responseData;
      await fetch('http://localhost:4000/signup',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      }).then((response)=> response.json()).then((data)=>responseData = data);
      if(responseData.success){
        localStorage.setItem('auth-token',responseData.token);
        window.location.replace("/");
      }
      else{
        alert(responseData.errors);
      }
  }

  const changeHandler = (e) => {
      setFormData({...formData,[e.target.name]:e.target.value})
  }

  return (
    <div className='login-signup'>
      <div className="login-signup-container">
        <h1>{state}</h1>
        <div className="login-signup-feilds">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />: <></>}
          <input type="emial" placeholder='Email Address' name='email' value={formData.email} onChange={changeHandler}/>
          <input type="password" placeholder='password' name='password' value={formData.passWord} onChange={changeHandler}/ >
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button> 
        {state==="Sign Up" ? <p className="login-signup-login">Already have an account <span onClick={()=>{setState("Login")}}>Login here</span></p> 
        : <p className="login-signup-login">Create an account ?<span onClick={() => {setState("Sign Up")}}>Click here</span></p> }
        
        <div className="login-signup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing , I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}
