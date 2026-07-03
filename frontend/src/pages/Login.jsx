import React, { useState } from 'react'
import { loginUser } from '../api/auth';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext'
const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {login} = useAuth();
    const handleSubmit = async(e)=>{
           e.preventDefault();
        //    console.log(email,password);
           
           try{
            const response =await loginUser(email,password);
            login(response.user,response.token)
            navigate('/dashboard');
           }catch(error){
            console.log(error.message);
            
           }
            
    }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded p-8 w-full max-w md'>
          <div className='text-3xl font-bold text-center text-black-600 mb-2'>VPMS</div>
          <p className='text-center text-gray-500 mb-6'>Visitor pass Management System</p>
          <form  onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <label htmlFor='email' className='block text-sm font-medium mb-1'>Email :</label>
            <input 
            className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            type="email" 
            value={email}
            onChange={(e) =>{ setEmail(e.target.value)}}
            id='email' 
            placeholder='Enter your Email' />
             <label htmlFor='password'  className='block text-sm font-medium mb-1'>PassWord :</label>
            <input 
            type="password"
             className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            value={password}
            onChange={(e) =>{ setPassword(e.target.value)}}
            id='password'
            placeholder='Enter your Password' />
            <button 
            type='submit'
            className='bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold'
            >Submit</button>
             <p className="text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Register
                    </a>
                </p>
          </form>
          </div>
    </div>

  )
}

export default Login