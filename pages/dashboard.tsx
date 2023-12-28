import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const Dashboard= () => {
  
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-[#00A9FF] p-3 md:flex md:justify-between relative">
        
        <ul className=" md:items-center  space-x-2">
          <li className="mx-2 mb-4">
            <Link href="/userstable" className="text-lg text-white hover:text-cyan-100 duration-500">
              Users
            </Link>
          </li>
          <li className="mx-4 mb-4">
            <Link href="/eventable" className="text-lg text-white hover:text-cyan-100 duration-500  ">
              Events
            </Link>
          </li>
          
        </ul>
        <div className="bg-blue-200"></div>
      </div>
      </div>
      

      
  );
};

export default Dashboard;
