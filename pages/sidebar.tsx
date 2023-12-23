// components/Sidebar.js
import { useRouter } from 'next/router';
import Link from 'next/link';

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="bg-[#00A9FF] p-4w-1/5">
        <h1 className="text-2xl cursor-pointer  mb-4">EVENTLY</h1>

        {/* Sidebar Links */}
        <nav>
          <ul>
            <li className="mx-4" >
              
                <a className="text-xl text-white hover:text-cyan-100 duration-500">Add User</a>
              
            </li>
            <li className="mx-4">
              
                <a className="text-xl text-white hover:text-cyan-100 duration-500">Add Event</a>
              
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <button className="bg-red-500 p-2 rounded mt-4">Logout</button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
