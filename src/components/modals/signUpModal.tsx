import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import useAuth from '../../../hooks/useAuth';

type Props = {};

export default function SignUpModal({}: Props) {
  const { auth }: any = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const emailRef = useRef();
  const errRef = useRef();
  const usernameRef = useRef();

  useEffect(() => {
    if (auth.id) {
      Router.push('/');
    }
  }, [auth]);

  const handleSubmmit = async (event: any) => {
    event.preventDefault();
    const id = toast.loading('Submiting...', {
      className: 'font-bold text-sm ',
      position: 'top-right',
      autoClose: 5000,
      transition: Slide,
    });
    if (password !== passwordConfirm) {
      toast.update(id, {
        render: 'Password does not march',
        type: 'error',
        isLoading: false,
        closeButton: true,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    } else {
      const data = { username, email, password, passwordConfirm };

      try {
        const response = await axios.post('/api/users/register', data);
        if (response.data.success == 0) {
          toast.update(id, {
            render: response.data.message,
            type: 'error',
            isLoading: false,
            closeButton: true,
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
        }
        if (response.data.success == 1) {
          toast.update(id, {
            render: response.data.message,
            type: 'success',
            isLoading: false,
            closeButton: true,
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
          Router.push('/login');
        }
      } catch (error: any) {
        console.log(error);
        toast.update(id, {
          render: error.message,
          type: 'error',
          isLoading: false,
          closeButton: true,
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        });
      }
    }
  };
  return (
    <>
      <ToastContainer
        transition={Slide}
        style={{
          width: '300px',
          height: '150px',
          top: '60px',
          left: '15px',
          marginLeft: '20px',
        }}
      />

      <div className='flex flex-col justify-center mb-3 mt-12 items-center '></div>
      <div className='bg-[#01183a] bg-gradient-to-t w-[361px] rounded-sm sm:mx-2 from-[#0b3989] px-10 mt-4 pt-2 h-min '>
        <div className=' flex items-center justify-center'>
          <span className='text-[#ffffff] text-center font-bold text-xl w-[300px] '></span>
        </div>
        <form
          onSubmit={handleSubmmit}
          className='flex flex-col justify-between items-center mt-7'
        >
          <div className='p-2 px-3 space-y-4'>
            <input
              name='username'
              type='text'
              required
              value={username}
              autoComplete='off'
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Chose a username'
              className='flex bg-[#FFFFFF] outline-none italic normal px-4 text-[#1D498BAB] rounded-md w-[312px] h-[48px]'
            />
            <input
              name='email'
              type='email'
              required
              value={email}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter e-mail'
              className='flex bg-[#FFFFFF] outline-none italic normal px-4 text-[#1D498BAB] rounded-md w-[312px] h-[48px]'
            />
            <input
              name='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete='off'
              placeholder='Enter password'
              className='flex bg-[#FFFFFF] outline-none italic normal px-4 text-[#1D498BAB] rounded-md w-[312px] h-[48px]'
            />
            <input
              name='passwordConfirm'
              type='password'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              autoComplete='off'
              placeholder='confirm password'
              className='flex bg-[#FFFFFF] italic normal px-4 text-[#1D498BAB] rounded-md w-[312px] h-[48px]'
            />
          </div>
          {/* <p>{result.message}</p> */}
          <input
            className=' font-bold text-center outline-nones text-[#faf9f9] w-[240px] h-[40px] bg-[#002D72] mt-8 cursor-pointer rounded-full border-2 '
            type='submit'
            value='Sign Up'
          />
        </form>
        <div className='flex flex-col justify-items-center '>
          {/* <span className='mt-6 text-center font-bold text-[#f4f2ef] '>
              or sign up with Google
            </span>
            <div className='flex justify-center space-x-4 mt-6 justify-self-center '>
              <span className='cursor-pointer bg-[#002d72] p-2 rounded-md '>
                <BsGoogle style={SocialLogin} />
              </span>
              <span className='cursor-pointer bg-[#002d72] p-2  rounded-md '>
                <BsFacebook style={SocialLogin} />
              </span>
            </div> */}
          <div className='flex flex-col justify-center text-sm items-center space-y-7 mt-4'>
            <div className='text-[#e5e3e1] font-bold'>
              By signing up you agree with our{' '}
              <span className='text-[#120339]  font-bold'>
                {' '}
                terms of services agrements
              </span>{' '}
              and
              <span className='text-[#120339] font-bold'> privacy policy</span>
            </div>
            <div className=' mb-5 pb-6 text-[#e5e3e1] font-bold'>
              alredy have an account?{' '}
              <span className='text-[#120339] font-bold'>
                <Link href='/login'>Login</Link>
              </span>{' '}
              Instead
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
