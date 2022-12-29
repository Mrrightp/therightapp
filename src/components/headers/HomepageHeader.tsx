import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { GrNotification } from 'react-icons/gr';
import useAuth from '../../../hooks/useAuth';
import Link from 'next/link';
import Image from 'next/image';
import Notifications from '../notifications';
import toast, { Toaster } from 'react-hot-toast';

export interface HomePageHeaderProps {}

export default function HomePageHeader({}: HomePageHeaderProps) {
  const { auth, setAuth }: any = useAuth();
  const [showNotification, setShowNotification] = useState(false);

  const toggleNotification = () => {
    showNotification ? setShowNotification(false) : setShowNotification(true);
  };
  const info = () => {
    toast('Cannot perform this opration at this time', {
      icon: '😢',
    });
  };

  return (
    <>
      <Toaster position='bottom-center' reverseOrder={false} />
      {showNotification ? (
        <Notifications toggleNotification={toggleNotification} />
      ) : null}
      <div className='home-page-header border-b-2 md:hidden text-[#002D72] font- px-4 items-center  flex justify-between'>
        <div className='heade-logo font-extrabold text-xl'>
          <Link href={'/'}>
            <a>
              <Image src={'/uniforumlogo.png'} height={25} width={25} alt='' />
            </a>
          </Link>
        </div>
        <div className='flex  space-x-4 '>
          {auth.id ? (
            <>
              <span className=''>
                <FiSettings className='text-3xl' />
              </span>
              <span onClick={toggleNotification}>
                <GrNotification className='text-3xl' />
              </span>
            </>
          ) : (
            <div onClick={info} className='items-center space-x-2'>
              <span className='font-bold'>
                <span>
                  <a>login</a>
                </span>
              </span>
              <span className='font-bold whitespace-nowrap rounded-md p-1 px-2'>
                <span>
                  <a>Sign Up</a>
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
      <div id='ezoic-pub-ad-placeholder-609'> </div>
    </>
  );
}
