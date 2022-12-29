import React from 'react';
import AuthHeader from '../components/headers/authHeader';
import LoginModal from '../components/modals/loginModal';

type Props = {};

export default function Login({}: Props) {
  return (
    <>
      <div className='flex flex-col justify-center  items-center bg-[#000000] px-2 h-screen '>
        <LoginModal />
      </div>
    </>
  );
}

Login.getLayout = function pageLayout(page: any) {
  return <>{page}</>;
};
