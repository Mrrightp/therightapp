import React from 'react';
import Image from 'next/image';

type Props = {};

export default function UserCard({}: Props) {
  return (
    <div className='flex justify-between w-3/4  texr-sm items-center'>
      <div className='flex space-x-2 items-center'>
        <Image
          alt=''
          width={50}
          height={50}
          src={'/sammy.jpg'}
          className='object-cover'
        />
        <div className='flex flex-col'>
          <span>Mr Right</span>
          <span className='text-xs'>@right_possible</span>
        </div>
      </div>
      <div className='text-[10px] text-[#002D72] font-bold'>
        <span>20k following</span>
      </div>
    </div>
  );
}
