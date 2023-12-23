// components/EventForm.js
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EventForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const initialValues = {
    eventName: '',
    date: '',
    time: '',
    venue: '',
    contact: '',
    eventType: [],
  };
  async function addDataToFirestore(userInput:any) {
    try {
      const docRef = await addDoc(collection(db, 'eventuser'), userInput);
      console.log('Document written with id:', docRef.id);
      return true;
    } catch (error) {
      console.error('Error adding document', error);
      return false;
    }
  }
 
  const eventType:any=['decoration', 'catering','transportation','entertainment','specialGuest','promotionLmaterial'];
  const validationSchema = Yup.object().shape({
    eventName: Yup.string().required('Event Name is required'),
    date: Yup.date().required('Date is required'),
    time: Yup.string().required('Time is required'),
    venue: Yup.string().required('Venue is required'),
    contact: Yup.string().required('Contact is required'),
    eventType: Yup.array().min(1, 'Select at least one event type'),
  });
  
 
  const formik:any = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const added = await addDataToFirestore(values);

        if (added) {
          formik.resetForm();
          toast.success('Data Stored in db!');
          
        }
      } catch (err) {
        console.error(err);
        setErrorMessage('Error during registration');
      }
    },
    validationSchema, // Move validationSchema here
  });
  return (
    <div className="flex items-center justify-center min-w-full mt-20">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <div>
          <h1 className="text-2xl font-extrabold mb-4 font-serif">New Event</h1>
          <form onSubmit={formik.handleSubmit}>
            {/* Event Name Field */}
            <div className="form-control">
              <label className="block mb-2 font-bold ">Name of Event:</label>
              <input
                type="text"
                name="eventName"
                className={`w-full p-2 border rounded mb-4 ${formik.touched.eventName && formik.errors.eventName ? 'border-red-500' : ''}`}
                placeholder="Event Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.eventName}
              />
              {formik.touched.eventName && formik.errors.eventName && (
                <div className="error text-red-500">{formik.errors.eventName}</div>
              )}
            </div>
            {/* Date Field */}
            <div className="form-control">
              <label className="block mb-2 font-bold">Date:</label>
              <input
                type="date"
                name="date"
                className={`w-full p-2 border rounded mb-4 ${formik.touched.date && formik.errors.date ? 'border-red-500' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
              />
              {formik.touched.date && formik.errors.date && (
                <div className="error text-red-500">{formik.errors.date}</div>
              )}
            </div>
            {/* Time Field */}
            <div className="form-control">
              <label className="block mb-2 font-bold">Time:</label>
              <input
                type="time"
                name="time"
                className={`w-full p-2 border rounded mb-4 ${formik.touched.time && formik.errors.time ? 'border-red-500' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.time}
              />
              {formik.touched.time && formik.errors.time && (
                <div className="error text-red-500">{formik.errors.time}</div>
              )}
            </div>
            {/* Venue Field */}
            <div className="form-control">
  <label className="block mb-2 font-bold">Venue:</label>
  <textarea
    name="venue"
    className={`w-full p-2 border rounded mb-4 ${formik.touched.venue && formik.errors.venue ? 'border-red-500' : ''}`}
    placeholder="Event Venue"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.venue}
  />
  {formik.touched.venue && formik.errors.venue && (
    <div className="error text-red-500">{formik.errors.venue}</div>
  )}
</div>

            {/* Contact Field */}
            <div className="form-control">
              <label className="block mb-2 font-bold">Contact:</label>
              <input
                type="text"
                name="contact"
                className={`w-full p-2 border rounded mb-4 ${formik.touched.contact && formik.errors.contact ? 'border-red-500' : ''}`}
                placeholder="Contact"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contact}
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="error text-red-500">{formik.errors.contact}</div>
              )}
            </div>
            {/* Event Planners Checkboxes */}
                {/* Event Types Checkboxes */}
                 {/* Event Types Checkboxes */}
<div className="form-control">
  <label className="block mb-2 font-semibold">Event Types:</label>
  {eventType.map((type: any) => (
    <div key={type} className="flex items-center mb-2">
      <input
        type="checkbox"
        id={type}
        name="eventType"
        value={type}
        checked={formik.values.eventType.includes(type)}
        onChange={() => {
          const newEventTypes = formik.values.eventType.includes(type)
            ? formik.values.eventType.filter((eventType: string) => eventType !== type)
            : [...formik.values.eventType, type];

          formik.setFieldValue('eventType', newEventTypes);
        }}
      />
      <label htmlFor={type} className="ml-2">{type}</label>
    </div>
  ))}
  {formik.touched.eventType && formik.errors.eventType && (
    <div className="error text-red-500">{formik.errors.eventType}</div>
  )}
</div>
        {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Create Event
            </button>
            {/* Error Message */}
            {errorMessage && (
              <div className="error text-red-500 mt-2">{errorMessage}</div>
            )}
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default EventForm;
