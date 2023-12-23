import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="bg-[#00A9FF] p-5 md:flex md:items-center md:justify-between">
      <div>
        <span className="text-2xl cursor-pointer">EVENTLY</span>
      </div>

      <ul className="md:flex md:items-center md:justify-between">
        <li className="mx-4">
          <a href="#" className="text-xl text-white hover:text-cyan-100 duration-500">
            Home
          </a>
        </li>

        <li className="mx-4">
          <a href="#" className="text-xl text-white hover:text-cyan-100 duration-500">
            About
          </a>
        </li>
        <li className="mx-4">
              <a href="#" className="text-xl text-white hover:text-cyan-100 duration-500">
                Contact Us
              </a>
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
              <Link href="/signup">Signup</Link>
            </button>
            
            <li className="mx-4">
              <Link href="/Login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
