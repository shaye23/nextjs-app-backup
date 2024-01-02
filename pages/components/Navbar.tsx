import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 p-3 md:flex md:justify-between relative ">
      {/* bg-gradient-to-b from-blue-700 via-blue-800 to-gray-900 p-3 md:flex md:justify-between relative */}
      <div>
        <span className="text-2xl text-white  font-primary font-semibold cursor-pointer">EVENTLY</span>
      </div>

      <div className="md:flex md:items-center md:justify-between space-x-4"> 
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
              className="bg-white text-primary rounded-md  duration-500 px-6"
              onClick={() => {
                // Implement logout functionality
                logout();
                toast.success("Logout successfully")
                router.push('/login');
              }}
            >
              Logout
            </button>
          </>
        ) : (
          // If the user is not authenticated, show signup and login links
          <>
            <button className="bg-white text-primary rounded-md  duration-500 px-6">
              <Link href="/signup">Signup</Link>
            </button>

            <button className="bg-white text-primary rounded-md duration-500 px-6">
              <Link href="/login">Login</Link>
            </button>
          </> 
        )}
      </div>
    </nav>
  );
};
