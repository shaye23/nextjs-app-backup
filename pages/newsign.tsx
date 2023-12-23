import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/context/AuthContext';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/config/firebase';

const Newsign = () => {
  const { signup } = useAuth();

  const initialValues = {
    phoneNumber: '',
  };

  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
      size: 'normal',
      callback: (response:any) => {},
      'expired-callback': () => {},
    });
  }, [auth]);

  const handlePhoneNumberChange = (e:any) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      const authInstance = getAuth(); // Get the auth instance
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;
      const confirmation:any = await signInWithPhoneNumber(authInstance, formattedPhoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber('');
      alert('OTP sent');
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Invalid phone number'), // Adjust the validation as per your requirements
  });

  const formik = useFormik({
    initialValues,
    onSubmit: async () => {
      // You can add any additional logic here if needed
    },
    validationSchema,
  });

  return (
    <div className="flex items-center justify-center min-w-full mt-20">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Phone Number Signup</h1>
          <form onSubmit={formik.handleSubmit}>
            {/* Phone Number Field */}
            <div className="form-control">
              <label className="block mb-2">Phone Number:</label>
              <input
                type="tel"
                name="phoneNumber"
                className={`w-full p-2 border rounded mb-4 ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : ''}`}
                placeholder="Your phone number"
                onChange={handlePhoneNumberChange}
                value={phoneNumber}
              />
            </div>

            {/* Recaptcha Container */}
            <div id="recaptcha-container"></div>

            {/* Send OTP Button */}
            <button
              type="button"
              className="w-full bg-blue-500 text-white p-2 rounded"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>

            {/* Error Message */}
            {formik.errors.phoneNumber && (
              <div className="error text-red-500 mt-2">{formik.errors.phoneNumber}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsign;
