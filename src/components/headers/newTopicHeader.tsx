import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';

type Props = {};

export default function NewTopicHeader({}: Props) {
  return (
    <div className='w-full h-14 flex justify-between items-center px-2 md:px-10  bg-[#e7e7e7]'>
      <div className='flex items-end font-bold space-x-4'>
        <span className='text-3xl md:inline hidden'>RIGHT APP</span>
        <Link href='/'>
          <span>Create Topic</span>
        </Link>
      </div>
      <div className='flex cursor-pointer space-x-2'>
        <span className='hover:bg-slate-400 px-2 rounded-md'>Edit</span>
        <span className='hover:bg-slate-400 px-2 rounded-md'>Preview</span>
      </div>
      <div>
        <AiOutlineClose className='hover:bg-slate-400' />
      </div>
    </div>
  );
}
