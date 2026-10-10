import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
const Auth = () => {

  const [mode, setMode] = useState("signup");
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  const {signUp,login} = useContext(AuthContext);
  const {register,
        handleSubmit,
        formState:{errors}
        }=useForm();

  function onsubmit(data){
    setError(null);
    let result;
    //return fucntion of signup and login
   if(mode==="signup"){ 
    result=signUp(data);
   }else{
    result=login(data);
   }
    if(result.success){
      navigate("/");
    } 
    else{
      setError(result.error)
    }

  }

  return (
    


    <div className='page'>
      <div className="container">
        <div className="auth-container">
          
         
          <h1 className="page-title">
            {mode==="signup"? "Sign Up" : "Login"}
          </h1>
          {error && (<div className='error-message'>{error}</div>)}
          <form className='auth-form' onSubmit={handleSubmit(onsubmit)}>
            <div className="form-group">
              <label className='form-label' htmlFor="email">Email</label>
              <input className='form-input'
                     type="email"
                     id="email" 
                     {...register("email",{required:"Email is required"})}/>
                     {errors.email && (
                      <span className='form-error'>{errors.email.message}</span>
                     )}
            </div>
            <div className="form-group">
              <label className='form-label' htmlFor="password">Password</label>
              <input {...register("password",{required:"Email is required",
                      minLength:{
                        value:6,
                        message:"Password must be atleast 6 characters"
                      },
                      maxLength:{
                        value:12,
                        message:"Password must be less than characters"
                      },    
                      })} 
                      className='form-input'
                      type="password" 
                      id="password"/>
                      {errors.password && (
                      <span className='form-error'>{errors.password.message}</span>
                     )}
            </div>
            
            <button type="submit" className='btn btn-primary btn-large'>
               {mode==="signup"? "Sign Up" : "Login"}
            </button>
          </form>
          <div className='auth-switch'>
             {mode==="signup"? (
              <p>Already have an account? <span className='auth-link ' onClick={()=>setMode("login")}>Login</span></p>
             ) : (
              <p>Don't have an account? <span className='auth-link'  onClick={()=>setMode("signup")}>Sign Up</span></p>
             )}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth