import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventTable = () => {
  const [eventList, setEventList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { user, logout } = useAuth();

  const fetchData = async (collectionName:any, setDataFunction:any) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const data :any= [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setDataFunction(data);
    } catch (err) {
      console.error(err);
      setErrorMessage(`Error fetching data from ${collectionName}`);
    }
  };

  const handleEventClick = (eventType:any) => {
    console.log('eventtype', eventType);
    // Navigate to Fulldetails page with eventType as a query parameter
    router.push({
      pathname: '/fulldetails',
      query: { eventType },
    });
  };

  useEffect(() => {
    fetchData('eventuser', setEventList);
  }, []); // Empty dependency array to fetch data on component mount
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
            <Link href="/userstable" className="text-lg text-white hover:text-cyan-100 duration-500">
              Users
            </Link>
          </li>
          <li className="mx-4 mb-4">
            <Link href="/eventable" className="text-lg text-white hover:text-cyan-100 duration-500" onClick={handleUsersLinkClick}>
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
              router.push('/eventform');
            }}
          >
            Add event
          </button>
        </div>
        {/* Event Table */}
        <h1 className="text-2xl font-bold mb-4 space-x-2 py-4s">Event Table</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-[#A0E9FF]">
              <th className="py-2 px-4 border-b justify-start">Event Name</th>
              <th className="py-2 px-4 border-b items-start">Date</th>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">Venue</th>
              <th className="py-2 px-4 border-b">Contact</th>
              <th className="py-2 px-4 border-b">Event Type</th>
              {/* Add other event table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {eventList.map((event:any) => (
              <tr className="hover:bg-[#A0E9FF]"  key={event.id} onClick={() => handleEventClick(event.eventType)}>
                <td className="py-2 px-4 border-b text-center">{event.eventName}</td>
                <td className="py-2 px-4 border-b text-center">{event.date}</td>
                <td className="py-2 px-4 border-b text-center">{event.time}</td>
                <td className="py-2 px-4 border-b text-center">{event.venue}</td>
                <td className="py-2 px-4 border-b text-center">{event.contact}</td>
                <td className="py-2 px-4 border-b space-x-2 text-center">
                  {event.eventType.map((type:any, index:any) => (
                    <span key={index}>{type} </span>
                  ))}
                </td>
                {/* Add other event table columns as needed */}
              </tr>
            ))}
          </tbody>
        </table> 
        <Link href="/dashboard">
     <button type="submit" className="bg-cyan-700 text-white duration-500 mt-4 px-4">Back</button>
     </Link>
       
      </div>
       
    </div>

  );
};

export default EventTable;
