import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
import toast from "react-hot-toast";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
      try {
        const res = await fetch('http://localhost:8000/api/v1/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          alert("Register successfully");
          navigate("/");
        }
      } catch (error) {
        
      }
  };
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        type='text'
        placeholder='Username'
        id='username'
        className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}
      />
      <input
        type='email'
        placeholder='Email'
        id='email'
        className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='fullname'
        id='fullname'
        className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}
      />
      <input
        type='password'
        placeholder='Password'
        id='password'
        className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}
      />
      <button
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
      >
        REGISTER
      </button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to='/sign-in'>
        <span className='text-blue-500'>Sign in</span>
      </Link>
    </div>
    <p className='text-red-700 mt-5'></p>
  </div>

  )
}

export default SignIn