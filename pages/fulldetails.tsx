import { useRouter } from 'next/router';
import React from 'react'


const Fulldetails = ( ) => {
    const router = useRouter();
  const { eventType } = router.query;

  return (
      
    <table className="min-w-full bg-white border border-gray-300 ">
  <thead>
    <tr>
      <th className="py-2 px-4 border-b ">Event Type</th>
      <th className="py-2 px-4 border-b">Assigned Person</th>
      <th className="py-2 px-4 border-b">Started</th>
      <th className="py-2 px-4 border-b">Pending</th>
      <th className="py-2 px-4 border-b">Finished</th>
      <th className="py-2 px-4 border-b">Payment status</th>
      <th className="py-2 px-4 border-b">Notes</th>
    </tr>
  </thead>
 
      <tbody>
        
          <tr >
            <td className="py-2 px-4 border-b text-center">{eventType}</td>
            <td className="py-2 px-4 border-b text-centre"></td>
            <td className="py-2 px-4 border-b text-centre"></td>
            <td className="py-2 px-4 border-b text-center"></td>
            <td className="py-2 px-4 border-b text-center"></td>
            <td className="py-2 px-4 border-b text-center"></td>
          </tr>
        
      </tbody>
</table>
  );
};



  
export default Fulldetails