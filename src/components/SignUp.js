import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import YupPassword from 'yup-password';
YupPassword(Yup); // extend yup

const SignUp = () => {
  const [messageNewUser, setMessageNewUser] = useState(false);
  const [error, setError] = useState(false);

  const createNewUser = async (loginFormValues) => {
    let path = `${process.env.REACT_APP_WARDROBE_API}/users/`;
    try {
      let response = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(loginFormValues),
      });
      console.log(response.body);
      if (response.status === 201) {
        // setMessageNewUser(response.statusText);
        setMessageNewUser('Account created successfully');
        alert('You signed up!');
      } else {
        let error = new Error(`${response.statusText}: ${response.url}`);
        error.status = response.status;
        throw error;
      }
    } catch (error) {
      console.log('There was an error when updating data', error);
      // setError(error.message);
      setError('There was an error signing up');
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().min(2, 'Min 2 letters').required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().password().max(72, 'Must be 72 characters or less').required('Required'),
    }),
    onSubmit: (values) => {
      console.log('values in onsubmit', values);
      // alert(JSON.stringify(values, null, 2));
      createNewUser(values);
    },
  });

  let inputFieldNames = Object.keys(formik.initialValues);
  return (
    <div className='form-container'>
      <form onSubmit={formik.handleSubmit} className='d-flex flex-column align-items-center'>
        {inputFieldNames.map((inputField) => {
          if (inputField === 'url' || inputField === 'id') {
            return null;
          }
          return (
            <div key={inputField} className='d-flex flex-row m-2'>
              <label htmlFor={inputField} className='m-1'>
                {' '}
                {inputField}
              </label>
              {inputField === 'password' ? (
                <input id={inputField} name={inputField} type='password' placeholder={`Add ${inputField}`} onChange={formik.handleChange} />
              ) : (
                <input id={inputField} name={inputField} type='text' placeholder={`Add ${inputField}`} onChange={formik.handleChange} />
              )}
              {formik.touched[inputField] && formik.errors[inputField] ? (
                <div className='text-danger'>{`${inputField} is ${formik.errors[inputField]}`}</div>
              ) : null}
            </div>
          );
        })}

        <Button type='submit' variant='primary'>
          Sign Up
        </Button>
      </form>
      {/* {error ? <div>{error.message}</div> : null} */}
      {error ? <div>{error}</div> : null}
      {messageNewUser ? <div className='signup_message'>{messageNewUser}</div> : null}
    </div>
  );
};

export default SignUp;
