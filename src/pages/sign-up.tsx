import React from 'react';
import AuthHeader from '../components/headers/authHeader';
import SignUpModal from '../components/modals/signUpModal';

type Props = {};

export default function SignUpPage({}: Props) {
  return (
    <>
      {/* <div className='md:hidden'>
        <AuthHeader />
      </div> */}
      <div className='flex flex-col justify-center h-screen items-center bg-[#000112]'>
        <SignUpModal />
      </div>
    </>
  );
}
SignUpPage.getLayout = function pageLayout(page: any) {
  return <>{page}</>;
};
