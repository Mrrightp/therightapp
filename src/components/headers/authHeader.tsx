import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import Link from 'next/link';

export interface HomePageHeaderProps {}

export default function AuthHeader({}: HomePageHeaderProps) {
  return (
    <div className='home-page-header border-b-2 text-[#002D72] font- px-4 items-center  flex justify-between'>
      <div className='heade-logo'>
        <Link href='/'>
          <a>RightApp</a>
        </Link>
      </div>
      <div className='flex  space-x-2'>
        <AiFillCloseCircle />
      </div>
    </div>
  );
}
