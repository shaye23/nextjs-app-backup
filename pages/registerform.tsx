import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { db } from '@/config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

// Function to add data to Firestore
async function addDataToFirestore(userInput: any) {
  try {
    const docRef = await addDoc(collection(db, 'users'), userInput);
    console.log('Document written with id:', docRef.id);
    return true;
  } catch (error) {
    console.error('Error adding document', error);
    return false;
  }
}

// Component for the registration form
const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<any>();
  const router=useRouter();

  // Initial form values
  const initialValues = {
    userName: '',
    phoneNumber: '',
    email: '',
    country: '',
    state: '',
    eventType: [],
  };

  // List of countries
  const countries: any = ['India']; // Add your list of countries here
  const eventType:any=['Decoration', 'Catering','Transportation','Entertainment','SpecialGuest','PromotionLmaterial'];

  // List of states for each country
  const states: any = {
    India: ['Tamilnadu', 'Kerala', 'Andhra Pradesh'],
  };

  // Form validation schema
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('User Name is required'),
    phoneNumber: Yup.string()
      .required('Phone Number is required')
      .matches(/^\d{10}$/, 'Phone Number must be exactly 10 digits'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .matches(/@/, 'Email must contain "@"'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    eventType: Yup.array().min(1, 'Select at least one event type'),
  });

  // Formik form handling
  const formik: any = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const added = await addDataToFirestore(values);

        if (added) {
          formik.resetForm();
          toast.success('Data Stored in db!');
          router.push('/dashboard')
        }
      } catch (err) {
        console.error(err);
        setErrorMessage('Error during registration');
      }
    },
    validationSchema,
  });

  // Render the registration form
  return (
    <div className="flex items-center justify-center min-w-full mt-20">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <div>
          <h1 className="text-2xl font-bold mb-4">REGISTER</h1>
          <form onSubmit={formik.handleSubmit}>
            {/* User Name Field */}
            <div className="form-control">
              <label className="block mb-1 font-semibold">Name:</label>
              <input
                type="text"
                name="userName"
                className={`w-full p-2 border rounded mb-1 ${
                  formik.touched.userName && formik.errors.userName ? 'border-red-500' : ''
                }`}
                placeholder="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
              />
              {formik.touched.userName && formik.errors.userName && (
                <div className="error text-red-500">{formik.errors.userName}</div>
              )}
            </div>
            {/* Phone Number Field */}
            <div className="form-control">
              <label className="block mb-1 font-semibold">Phone Number:</label>
              <input
                type="tel"
                name="phoneNumber"
                className={`w-full p-2 border rounded mb-1 ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : ''
                }`}
                placeholder="Your phonenumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="error text-red-500">{formik.errors.phoneNumber}</div>
              )}
            </div>
            {/* Email Field */}
            <div className="form-control">
              <label className="block mb-1 font-semibold">Email:</label>
              <input
                type="email"
                name="email"
                className={`w-full p-2 border rounded mb-1 ${
                  formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                }`}
                placeholder="Your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error text-red-500">{formik.errors.email}</div>
              )}
            </div>
            {/* Country Dropdown */}
            <div className="form-control">
              <label className="block mb-2 font-semibold">Country:</label>
              <select
                name="country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                className={`w-full p-2 border rounded mb-1 ${
                  formik.touched.country && formik.errors.country ? 'border-red-500' : ''
                }`}
              >
                <option value="" label="Select a country" />
                {countries.map((country: any) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {formik.touched.country && formik.errors.country && (
                <div className="error text-red-500 mb-2">{formik.errors.country}</div>
              )}
            </div>
            {/* State Dropdown */}
            <div className="form-control">
              <label className="block mb-1 font-semibold">State:</label>
              <select
                name="state"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
                className={`w-full p-2 border rounded mb-1 ${
                  formik.touched.state && formik.errors.state ? 'border-red-500' : ''
                }`}
              >
                <option value="" label="Select a state" />
                {formik.values.country &&
                  states[formik.values.country].map((state: any) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
              </select>
              {formik.touched.state && formik.errors.state && (
                <div className="error text-red-500">{formik.errors.state}</div>
              )}
            </div>
               {/* Event Types Checkboxes */}
               <div className="form-control">
  <label className="block mb-1 font-semibold">Event Types:</label>
  {eventType.map((type:any) => (
    <div key={type} className="flex items-center mb-1">
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
              Register
            </button>
          </form>
          
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="error text-red-500 mt-2">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
