import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { toast } from 'react-toastify';
import { number } from 'yup';
import Link from 'next/link';

const Fulldetails = () => {
  const router = useRouter();
  const { eventType } = router.query;

  const eventTypeArray = Array.isArray(eventType) ? eventType : [eventType];

  const [assignedPersons, setAssignedPersons] = useState<any>([]);
  const [checkedItems, setCheckedItems] = useState<
  Array<{ started: boolean; pending: boolean; finished: boolean; assignedPerson: string }>
>(eventTypeArray.map(() => ({ started: false, pending: false, finished: false, assignedPerson: '' })));

  
  const [paymentStatusArray, setPaymentStatusArray] = useState<Array<string>>([]);
  const [notesArray, setNotesArray] = useState<Array<string>>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersQuery = query(collection(db, 'users'));
        const querySnapshot = await getDocs(usersQuery);
        const data:any = [];

        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setAssignedPersons(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (rowIndex: number, column: string) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems :any= [...prevCheckedItems];
  
      // Check if the row exists before updating it
      if (newCheckedItems[rowIndex]) {
        newCheckedItems[rowIndex] = {
          ...newCheckedItems[rowIndex],
          [column]: !newCheckedItems[rowIndex][column],
        };
      }
      else {
        // If the row doesn't exist, create a new row object
        newCheckedItems[rowIndex] = {
          started: false,
          pending: false,
          finished: false,
          [column]: true,
        };
      }
  
      return newCheckedItems;
    });
  };
  const handleAssignedPersonChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    rowIndex: number,
    assignedPersonsForType: any[]
  ) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      newCheckedItems[rowIndex] = {
        ...newCheckedItems[rowIndex],
        assignedPerson: e.target.value,
      };
      return newCheckedItems;
    });
  };
  
  
  const handlePaymentStatusChange = (e: any, rowIndex: number) => {
    const newPaymentStatusArray = [...paymentStatusArray];
    newPaymentStatusArray[rowIndex] = e.target.value;
    setPaymentStatusArray(newPaymentStatusArray);
  };

  const handleNotesChange = (e: any, rowIndex: number) => {
    const newNotesArray = [...notesArray];
    newNotesArray[rowIndex] = e.target.value;
    setNotesArray(newNotesArray);
  };

  return (
    
    <div className="container mx-auto p-4 py-16">
     
      <h1 className="text-2xl font-bold mb-4 space-x-2 py-4s">Event Details</h1>
  
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-[#A0E9FF]">
            <th className="py-2 px-4 border-b">Event Type</th>
            <th className="py-2 px-4 border-b">Assigned Person</th>
            <th className="py-2 px-4 border-b">Started</th>
            <th className="py-2 px-4 border-b">Pending</th>
            <th className="py-2 px-4 border-b">Finished</th>
            <th className="py-2 px-4 border-b">Payment status</th>
            <th className="py-2 px-4 border-b">Notes</th>
          </tr>
        </thead>
        <tbody>
        {eventTypeArray.map((type: any, index: any) => {
  const assignedPersonsForType = assignedPersons.filter((person: any) => {
    const personEventType = String(person.eventType).toLowerCase();
    return personEventType === type.toLowerCase();
  });

  const assignedPersonOptions = assignedPersonsForType.map((person: any) => ({
    value: person.userName,
    label: person.userName,
  }));

            return (
              <tr className="hover:bg-[#A0E9FF]" key={index}>
              <td className="py-2 px-4 border-b text-center">{type}</td>
              <td className="py-2 px-4 border-b text-center">
                {assignedPersonsForType.length > 1 ? (
                  <select
                    value={checkedItems[index]?.assignedPerson || ''}
                    onChange={(e) =>
                      handleAssignedPersonChange(e, index, assignedPersonsForType)
                    }
                    className="py-1 px-2 border rounded"
                  >
                    <option value="">Select</option>
                    {assignedPersonOptions.map((option:any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  assignedPersonsForType[0] ? (
                    assignedPersonsForType[0].userName
                  ) : (
                    <span>No Assigned Person</span>
                  )
                )}
              </td>
                <td className="py-2 px-4 border-b text-center">
                <input
                  type="checkbox"
                  checked={checkedItems[index]?.started || false}
                  onChange={() => handleCheckboxChange(index, 'started')}
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                <input
                  type="checkbox"
                  checked={checkedItems[index]?.pending || false}
                  onChange={() => handleCheckboxChange(index, 'pending')}
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                <input
                  type="checkbox"
                  checked={checkedItems[index]?.finished || false}
                  onChange={() => handleCheckboxChange(index, 'finished')}
                />
              </td>
                <td className="py-2 px-4 border-b text-center">
                  <select
                     value={paymentStatusArray[index] || ''}
                     onChange={(e) => handlePaymentStatusChange(e, index)}
                    className="py-1 px-2 border rounded"
                  >
                    <option value="">Select</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <input
                    type="text"
                    value={notesArray[index] || ''}
  onChange={(e) => handleNotesChange(e, index)}
                    placeholder="Write something..."
                    className="py-1 px-2 border rounded"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link href='/eventable'>
      <button
  type="submit"
  className="bg-cyan-700 text-white duration-500 px-4 mb-4 mt-4"
 
>
  Back 
</button>
</Link>
<button
  type="submit"
  className="bg-cyan-700 text-white duration-500 px-4 mb-4  mt-4  ml-auto float-right"
  onClick={() => toast.success("Saved Successfully")}
>
  save
</button>
    </div>
    
  );
};

export default Fulldetails;