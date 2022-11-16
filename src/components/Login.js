import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup); // extend yup

const Login = (props) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState();

  const loginUser = async (input) => {
    console.log(input);
    let path = `${process.env.REACT_APP_WARDROBE_API}/users/login`;
    try {
      let response = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      if (response.status === 200) {
        console.log(response);
        let data = await response.json();
        let token = data.token;
        // save to localStorage
        localStorage.setItem('token', JSON.stringify(token));
        setMessage('You are logged in!');
        // change state of loggedIn
        props.setLoggedIn(true);
      } else {
        let error = new Error(`${response.statusText}: ${response.url}`);
        error.status = response.status;
        throw error;
      }
    } catch (error) {
      console.log('There was an error when logging in user', error);
      setError({ message: 'There was an error when logging in' });
    }
  };
  return (
    <div className='Login form'>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={Yup.object({
          username: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
          password: Yup.string().password().max(72, 'Must be 72 characters or less').required('Required'),
        })}
        onSubmit={(values) => {
          console.log('in onSubmit', values);
          loginUser(values);
        }}
      >
        <Form className='d-flex flex-column m-5'>
          <label htmlFor='username'>Username</label>
          <Field name='username' type='text' id='username' />
          <ErrorMessage name='username' />
          <label htmlFor='password'>Password</label>
          <Field name='password' type='password' id='password' />
          <ErrorMessage name='password' />
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
      {message ? <div className='login_message'>{message}</div> : null}
      {error ? <div>{error.message}</div> : null}
    </div>
  );
};

export default Login;
