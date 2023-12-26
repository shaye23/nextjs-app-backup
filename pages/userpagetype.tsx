// UserTypePage.tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import FetchData from './dashboard';  // Import the FetchData component

const UserTypePage = () => {
  const [selectedUserType, setSelectedUserType] = useState<any>();
  const [selectedEventType, setSelectedEventType] = useState<any>();
  const router = useRouter();
  const eventType:any=['Decoration', 'Catering','Transportation','Entertainment','SpecialGuest','PromotionLmaterial'];


  const handleUserTypeChange = (e:any) => {
    setSelectedUserType(e.target.value);
  };

  const handleEventTypeChange = (e:any) => {
    setSelectedEventType(e.target.value);
  };

  const handleShowData = () => {
    if (selectedUserType && selectedEventType) {
      // Redirect to the FetchData page with the selected user type and event type as query parameters
      router.push(`/fetchdata?userType=${selectedUserType}&eventType=${selectedEventType}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select User Type and Event Type</h1>

      <div className="mb-4">
        <label htmlFor="userType" className="mr-2">
          User Type:
        </label>
        <select
          id="userType"
          onChange={handleUserTypeChange}
          value={selectedUserType}
          className="p-2 border border-gray-300 rounded mr-4"
        >
          <option value="">Select User Type</option>
          {/* Add your user types based on your data */}
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
          {/* Add more options as needed */}
        </select>

        <label htmlFor="eventType" className="mr-2">
          Event Type:
        </label>
        <select
          id="eventType"
          onChange={handleEventTypeChange}
          value={selectedEventType}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Select Event Type</option>
          {eventType.map((type:any) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleShowData}
        disabled={!selectedUserType || !selectedEventType}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Show Data
      </button>
    </div>
  );
};

export default UserTypePage;
