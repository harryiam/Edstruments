import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch('https://apisi-harry-edstruments.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('session', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setErrors({ username: data.message });
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
          validationSchema={Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Confirm Password is required'),
          })}
          onSubmit={handleRegister}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1">Username</label>
                <Field name="username" className="w-full p-2 border rounded" />
                <ErrorMessage name="username" className="text-red-500 text-sm" component="div" />
              </div>

              <div className="relative">
                <label className="block mb-1">Password</label>
                <div className="flex items-center">
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="w-full p-2 border rounded pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 text-gray-600"
                  >
                    {showPassword ? '👁️' : '🙈'}
                  </button>
                </div>
                <ErrorMessage name="password" className="text-red-500 text-sm" component="div" />
              </div>

              <div className="relative">
                <label className="block mb-1">Confirm Password</label>
                <div className="flex items-center">
                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="w-full p-2 border rounded pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 text-gray-600"
                  >
                    {showConfirmPassword ? '👁️' : '🙈'}
                  </button>
                </div>
                <ErrorMessage name="confirmPassword" className="text-red-500 text-sm" component="div" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account? <Link to="/" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
