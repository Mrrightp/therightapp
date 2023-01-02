import React from 'react';
import Link from 'next/link';
import BottomNav from '../components/mobleBottom';

export default function NotFound() {
  return (
    <>
      <div className='p-10 flex flex-col items-center justify-center'>
        <span className='text-3xl'>404 Page</span>
        <p className='border p-3 m-3 border-[#000]'>
          I know how it feels to be lost, but if you can find your way back
          home, then you are not lost
        </p>
        <p className='font-bold space-x-3'>
          GO 🏠👉 <Link href='/'>HOME</Link>
        </p>
      </div>
      <BottomNav />
    </>
  );
}
