import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("visitor");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //    console.log(email,password);

    try {
      const response = await registerUser(name, email, password, role);

      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <>
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded p-8 w-full max-w md'>

      <div className='text-3xl font-bold text-center text-black-600 mb-2'>Register New User</div>
          <p className='text-center text-gray-500 mb-6'>Visitor pass Management System</p>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <label htmlFor="name"  className='block text-sm font-medium mb-1'>Name :</label>
          <input
            className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'

            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="name"
            placeholder="Enter your Name"
          />
          <label htmlFor="email" className='block text-sm font-medium mb-1'>Email :</label>
          <input
            className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
          
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
            placeholder="Enter your Email"
          />
          <label htmlFor="password" className='block text-sm font-medium mb-1'>PassWord :</label>
          <input
            className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'

            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            placeholder="Enter your Password"
          />
           <label className="block text-sm font-medium mb-1">Role</label>
          <select value={role}
           className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setRole(e.target.value)}>
            <option value="visitor">Visitor</option>
            <option value="employee">Employee</option>
            <option value="security">Security</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit"
           className='bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold'>Submit</button>
            <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
        </form>
        </div>
      </div>
    </>
  );
}

export default RegisterUser;
