import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const Fetchdata = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleFetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const data :any= [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setFetchedData(data);
    } catch (err) {
      console.error(err);
      setErrorMessage('Error fetching data from Firestore');
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []); // Fetch data on component mount

  // Function to handle form submission
  const handleFormSubmit = async (e:any) => {
    e.preventDefault();

    try {
      // Add your form submission logic here
      // e.g., addDoc(collection(db, 'users'), formData);
      console.log('Form submitted!');
      router.push('/registerform');
    } catch (err) {
      console.error('Error submitting form: ', err);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-[#00A9FF] h-screen p-5 pt-8 w-65 relative">
        <span className="text-2xl cursor-pointer text-white">EVENTLY</span>
        <ul className="md:items-center md:justify-between space-x-4">
          <li className="mx-2">
            <a className="text-lg text-white hover:text-cyan-100 duration-500">Add user</a>
          </li>
          <li className="mx-2">
            <a className="text-lg text-white hover:text-cyan-100 duration-500">Add event</a>
          </li>
          {user ? (
          // If the user is authenticated, show logout button and user's profile picture
          <>
            {user.profilePictureUrl && (
              <li className="mx-4">
                <img
                  src={user.profilePictureUrl}
                  alt="Profile"
                  className="rounded-full h-8 w-8 object-cover"
                />
              </li>
            )}
            <button
              className="bg-cyan-700 text-white duration-500 px-6"
              onClick={() => {
                // Implement logout functionality
                logout();
                
              }}
            >
              Logout
            </button>
          </>
        ) : (
          // If the user is not authenticated, show signup and login links
          <>
            <button className="bg-cyan-700 text-white duration-500 px-6">
              
            </button>
            
            <li className="mx-4">
             
            </li>
          </>
        )}
        </ul>
        <button className="bg-cyan-700 text-white duration-500 px-6" onClick={() => {
                // Implement logout functionality
                console.log('Logout button clicked');
                logout();
                
              }}>Logout</button>
      </div>

      {/* Content */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Table</h1>

        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Event Type</th>
              <th className="py-2 px-4 border-b">Phone Number</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Country</th>
              <th className="py-2 px-4 border-b">State</th>
            </tr>
          </thead>
          <tbody>
            {fetchedData.map((user:any) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.userName}</td>
                <td className="py-2 px-4 border-b">{user.eventType}</td>
                <td className="py-2 px-4 border-b">{user.phoneNumber}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.country}</td>
                <td className="py-2 px-4 border-b">{user.state}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Form to add new users */}
        <form className="mt-4" onSubmit={handleFormSubmit}>
          {/* Add your form input fields here */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Fetchdata;
