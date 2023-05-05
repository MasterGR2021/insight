import { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';

// stylesheet
import classes from './Login.module.css';

// toastify
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// env
import env from 'react-dotenv';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const navigateToHome = () => {
    return navigate('/');
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    const id = toast.loading('Please wait...');

    // console.log(process.env);

    const response = await fetch(`${process.env.REACT_APP_API_URI}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const json = await response.json();

    if (response.status === 200) {
      toast.update(id, {
        render: 'Success! Redirecting...',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        position: 'top-right',
        closeOnClick: true,
      });
      setTimeout(() => {
        setUserInfo(json);
        navigateToHome();
      }, 2000);
    } else {
      toast.update(id, {
        render: 'LogIn Failed!',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
        position: 'top-right',
        closeOnClick: true,
      });
    }
  };

  return (
    <div className='container'>
      <div className={classes.loginContainer}>
        <h2>Log In</h2>
        <form onSubmit={handleSubmission}>
          <label htmlFor='email'>Email*</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='alex@email.com'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor='password'>Password*</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='*********'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className='btn-primary'>Log In</button>
          <span>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </span>
        </form>
      </div>
      <ToastContainer transition={Flip} autoClose={3000} limit={1} />
    </div>
  );
};

export default Login;
