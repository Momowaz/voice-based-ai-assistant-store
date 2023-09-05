import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { styled } from '@mui/system'; // Import styled from @mui/system

// Create styled components
const Wrapper = styled('div')({
  textAlign: 'center',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center horizontally
  minHeight: '100vh', // Ensure the form fills the screen vertically
});

const Title = styled('h1')({
  marginBottom: '16px',
});

const InputField = styled('div')({
  marginBottom: '16px',
  width: '100%',
  maxWidth: '300px', // Limit the width for better readability
});

const Label = styled('label')({
  display: 'block',
  marginBottom: '8px',
});

const Input = styled('input')({
  width: '100%',
  padding: '8px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
});

const ErrorMessageText = styled('div')({
  color: 'red',
  fontSize: '14px',
  marginTop: '4px',
});

const SubmitButton = styled('button')({
  background: 'blue',
  color: 'white',
  padding: '10px 20px', // Adjust padding as needed
  fontSize: '16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '16px', // Move the button to the bottom
});

const AdminLogin = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState('');
  // another state for user

  // Define the initial form values
  const initialValues = {
    lastname: '',
    email: '',
  };

  // Define validation schema
  const validationSchema = Yup.object().shape({
    lastname: Yup.string().required('Lastname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/AdminLoginPage`, values); // Adjust the URL as needed

      if (response.status === 200) {
        // Successful login, redirect to the admin dashboard
        console.log("Loggedin")
        //add into user state
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred during login.');
      }
      setSubmitting(false);
    }
  };

  return (

    //if user <AdminPage/>
    <Wrapper>
      <Title>Admin Login</Title>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <InputField>
              <Label htmlFor="id">Lastname:</Label>
              <Field as={Input} type="text" id="lastname" name="lastname" />
              <ErrorMessage name="lastname" component={ErrorMessageText} />
            </InputField>

            <InputField>
              <Label htmlFor="email">Email:</Label>
              <Field as={Input} type="email" id="email" name="email" />
              <ErrorMessage name="email" component={ErrorMessageText} />
            </InputField>


            <InputField>
              <SubmitButton type="submit" disabled={isSubmitting}>
                Login
              </SubmitButton>
            </InputField>

            {errorMessage && <ErrorMessageText>{errorMessage}</ErrorMessageText>}
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default AdminLogin;
