import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const Dashboard= () => {
  const [userList, setUserList] = useState<any>([]);
  const [eventList, setEventList] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { user, logout } = useAuth();

  // Function to fetch data from Firestore
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
  const handleEventClick = (eventType:any) => {
    // Navigate to Fulldetails page with eventType as a query parameter
    router.push({
      pathname: '/fulldetails',
      query: { eventType },
    });
  };
  /*const mappedData = userList.map((user: any) => {
    const matchingEvent = eventList.find((event: any) => event.id === user.id);

    return {
      userId: user.id,
      userName: user.userName,
      userType: user.userType,
      // Add other user fields as needed
      eventName: matchingEvent ? matchingEvent.eventName : 'N/A',
      eventType: matchingEvent ? matchingEvent.eventType : 'N/A',
      // Add other event fields as needed
    };
  });*/

  useEffect(() => {
    fetchData('users', setUserList); // Replace 'usersCollection' with your actual users collection name
    fetchData('eventuser', setEventList); // Replace 'eventsCollection' with your actual events collection name
  }, []); // Fetch data on component mount

  // Function to handle user form submission (if needed)
  const handleUserFormSubmit = async (e:any) => {
    e.preventDefault();
    // Add your user form submission logic here
  };

  
  const handleEventFormSubmit = async (e:any) => {
    e.preventDefault();
    // Add your event form submission logic here
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-[#00A9FF] p-3 md:flex md:justify-between relative">
        
        <ul className=" md:items-center  space-x-2">
          <li className="mx-2 mb-4">
            <Link href="/registerform" className="text-lg text-white hover:text-cyan-100 duration-500">
              Add user
            </Link>
          </li>
          <li className="mx-4 mb-4">
            <Link href="/eventform" className="text-lg text-white hover:text-cyan-100 duration-500  ">
              Add event
            </Link>
          </li>
          
        </ul>
      </div>

      {/* Content */}
      <div className="container mx-auto p-4">
        {/* User Table */}
        <h1 className="text-2xl font-bold mb-4 ">User Table</h1>

{errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

<table className="min-w-full bg-white border border-gray-300 ">
  <thead>
    <tr>
      <th className="py-2 px-4 border-b ">Name</th>
      <th className="py-2 px-4 border-b">Event Type</th>
      <th className="py-2 px-4 border-b">Phone Number</th>
      <th className="py-2 px-4 border-b">Email</th>
      <th className="py-2 px-4 border-b">Country</th>
      <th className="py-2 px-4 border-b">State</th>
    </tr>
  </thead>
  <tbody>
  {userList.map((user:any) => (
  <tr key={user.id}>
    <td className="py-2 px-4 border-b text-centre">{user.userName}</td>
    <td className="py-2 px-4 border-b text-centre">{user.eventType}</td>
    <td className="py-2 px-4 border-b text-centre">{user.phoneNumber}</td>
    <td className="py-2 px-4 border-b text-center">{user.email}</td>
    <td className="py-2 px-4 border-b text-center">{user.country}</td>
    <td className="py-2 px-4 border-b text-center">{user.state}</td>
  </tr>
))}

  </tbody>
</table>


        {/* Event Table */}
        <h1 className="text-2xl font-bold mb-4 space-x-2 py-4s">Event Table</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
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
              <tr key={event.id} onClick={() => handleEventClick(event.eventType)}>
 
      <td className="py-2 px-4 border-b text-center">{event.eventName}</td>
      <td className="py-2 px-4 border-b text-center">{event.date}</td>
      <td className="py-2 px-4 border-b text-center">{event.time}</td>
      <td className="py-2 px-4 border-b text-center">{event.venue}</td>
      <td className="py-2 px-4 border-b text-center">{event.contact}</td>
      <td className="py-2 px-4 border-b space-x-2 text-center">
        {event.eventType.map((type:string, index:number) => (
          <span key={index}>{type} </span>
        ))}
      </td>
      {/* Add other event table columns as needed */}
    </tr>
  ))}
</tbody>
            

        </table>
      </div>
    </div>
  );
};

export default Dashboard;
