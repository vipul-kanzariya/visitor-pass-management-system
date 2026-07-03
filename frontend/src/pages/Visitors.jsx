import React, { useEffect, useState } from 'react'
import { createVisitors, getVisitors } from '../api/visitor';

function Visitors() {
    const [visitors,setVisitors] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [purpose,setPurpose] = useState('');
    const [search, setSearch] = useState('');
const [statusFilter, setStatusFilter] = useState('all');
const filteredVisitors = visitors.filter((visitor) => {
    const matchSearch = visitor.name
        .toLowerCase()
        .includes(search.toLowerCase());
    
    const matchStatus = statusFilter === 'all' 
        ? true 
        : visitor.status === statusFilter;
    
    return matchSearch && matchStatus;
});
    const fetchVisitors = async()=>
        {
            const data = await getVisitors();
            console.log(data);
            
            setVisitors(data);
        }
    useEffect(()=>{
        fetchVisitors();
    },[]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
           await createVisitors({name,email,phone,purpose});
            setName('');
            setEmail('');
            setPhone('');
            setPurpose('');
            fetchVisitors();
        }catch(error){
            console.log(error.message);
            
        }
    }
  return (
    <>
    <div className="flex gap-4 mb-6 m-4">
    <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 w-full"
    />
    <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border rounded px-3 py-2"
    >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
    </select>
</div>
    <div className='p-6'>
        <h1 className='text-2xl font-bold mb-6'>Visitors</h1>
        <div className='bg-white shadow rounded-lg p-6 mb-6'>
            <h2 className='text-lg font-semibold mb-4'>Add New Visitor</h2>
        <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
            <input 
            className='border rounded px-3 py-2'
            value={name}
            id='name'
            onChange={(e)=> setName(e.target.value)}
            placeholder='Enter Name'
            type="text" /><br/>
            <input 
             className='border rounded px-3 py-2'
            value={email}
            id='email'
            onChange={(e)=> setEmail(e.target.value)}
            placeholder='Enter Email'
            type="email" /><br/>
            <input 
             className='border rounded px-3 py-2'
            value={phone}
            onChange={(e)=> setPhone(e.target.value)}
            placeholder='Enter Phone No'
            type="tel"  pattern="[0-9]{10}" /><br/>
              <textarea  
               className='border rounded px-3 py-2'
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              id="purpose" 
              placeholder='Purpose of your visit'></textarea><br />
              <button
              className='col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700' 
              type='submit'>Add Visitor</button>
          
        </form>
        </div>
    </div>
    <div className='grid grid-cols-3 gap-4'>
         {filteredVisitors.map((visitor)=>(
        <div key={visitor._id} className='bg-white shadow rounded-lg p-4'>
            <p className='font-bold text-lg'>{visitor.name}</p>
            <p className='text-gray-500'>{visitor.email}</p>
            <p className='text-gray-500'>{visitor.phone}</p>
            <p className='text-sm mt-2 bg-blue-100 px-2 py-1 rounded'>{visitor.purpose}</p>
             <span className="text-xs bg-yellow-100 px-2 py-1 rounded mt-2 inline-block">
          {visitor.status}
        </span>
        </div>
        ))}
    </div>
   
    
    </>
  )
}

export default Visitors