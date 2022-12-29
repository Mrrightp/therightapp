import React, { useState } from 'react';
import LoadingSpinner from '../loadingUi/loadingSpinner';
import { AiOutlineCloseCircle } from 'react-icons/ai';

type Props = {
  message: string;
  isOpen: boolean;
};

export default function InfoMaodal({}: Props) {
  const [isOpen, setIsopen] = useState();
  return (
    <div className='flex fixed justify-center top-0 right-0 left-0 bottom-0 items-center '>
      <div className='bg-[#fff] left-10  text-sm rounded-sm  mt-10 w-[250px] h-[100px]'>
        <div className='flex  border-b justify-between items-center py-1 px-2'>
          <span>Info</span>
          {/* <AiOutlineCloseCircle className='text-lg' /> */}
        </div>
        <div className='flex font-bold p-3 h-full bg-[#040138] text-[#fff] items-center '>
          <div className='text-xs pl-3'>
            <LoadingSpinner />
          </div>

          <p>summiting your post dont close this page</p>
        </div>
      </div>
    </div>
  );
}
