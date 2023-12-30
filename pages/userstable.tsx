import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { error } from 'console';

const UserTable = () => {
  const [userList, setUserList] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { user, logout } = useAuth();
  const router=useRouter();

  const fetchData = async (collectionName:any, setDataFunction:any) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const data:any = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setDataFunction(data);
    } catch (err) {
      console.error(err);
      setErrorMessage(`Error fetching data from ${collectionName}`);
    }
  };

  useEffect(() => {
    fetchData('users', setUserList);
  }, []);
  const handleUsersLinkClick = () => {
    // Display a toast message indicating the user is already on the page
    toast.error('You are already in this page');
  };
  
  return (
    
    <div className="flex">
      {/* Sidebar */} 
      <div className="bg-[#00A9FF] p-3 md:flex md:justify-between relative">
        <ul className="md:items-center space-x-2">
          <li className="mx-2 mb-4"> 
            <Link href="/userstable" className="text-lg text-white hover:text-cyan-100 duration-500 "  onClick={handleUsersLinkClick}>
             
                
             
              Users
            </Link>
           
          </li>
          <li className="mx-4 mb-4">
            <Link href="/eventable" className="text-lg text-white hover:text-cyan-100 duration-500">
              Events
            </Link>
          </li>
        </ul>
      </div>

      <div className="container mx-auto p-4">
      <div className="absolute top-4 right-4 mt-16 mr-4">
          <button
            type="button"
            className="bg-cyan-700 text-white duration-500 px-4 space-y-0.5"
            onClick={() => {
              // Handle button click action
              router.push('/registerform');
            }}
          >
            Add User
          </button>
        </div>
        {/* User Table */}
        <h1 className="text-2xl font-bold mb-4">User Table</h1>

        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-[#A0E9FF] " id="usertable">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Event Type</th>
              <th className="py-2 px-4 border-b">Phone Number</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Country</th>
              <th className="py-2 px-4 border-b">State</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user:any) => (
              <tr className="hover:bg-[#A0E9FF] cursor-pointer" key={user.id}>
                <td className="py-2 px-4 border-b text-center">{user.userName}</td>
                <td className="py-2 px-4 border-b text-center">{user.eventType}</td>
                <td className="py-2 px-4 border-b text-center">{user.phoneNumber}</td>
                <td className="py-2 px-4 border-b text-center">{user.email}</td>
                <td className="py-2 px-4 border-b text-center">{user.country}</td>
                <td className="py-2 px-4 border-b text-center">{user.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mb-4">
          <p className="text-gray-600">
            Total Users: <span className="font-bold">{userList.length}</span>
          </p>
        </div>
        <Link href="/dashboard">

       
        <button 
       type="submit" className="bg-cyan-700 text-white duration-500 mt-4 px-4" 
       >
        Back </button>
         </Link>
      </div>
      
    </div>

  );
};

export default UserTable;
