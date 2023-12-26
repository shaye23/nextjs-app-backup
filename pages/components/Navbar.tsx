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
    <nav className="bg-[#00A9FF] p-5 md:flex md:items-center md:justify-between">
      <div>
        <span className="text-2xl text-white cursor-pointer">EVENTLY</span>
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
              className="bg-cyan-700 text-white duration-500 px-6"
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
            <button className="bg-cyan-700 text-white duration-500 px-6">
              <Link href="/signup">Signup</Link>
            </button>

            <button className="bg-cyan-700 text-white duration-500 px-6">
              <Link href="/login">Login</Link>
            </button>
          </> 
        )}
      </div>
    </nav>
  );
};
