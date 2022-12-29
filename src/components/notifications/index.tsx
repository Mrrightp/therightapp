import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

type Props = { toggleNotification: any };

export default function Notifications({ toggleNotification }: Props) {
  return (
    <div className=' w-screen bg-white h-screen z-10'>
      <div className='flex bg-slate-300 h-16 items-center text-2xl space-x-10 px-5 text-[fff]'>
        <BsArrowLeft onClick={toggleNotification} />
        <span>Notifications</span>
      </div>
      <div></div>
    </div>
  );
}
