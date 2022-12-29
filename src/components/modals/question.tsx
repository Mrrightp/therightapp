import React, { useState } from 'react';
import LoadingSpinner from '../loadingUi/loadingSpinner';
import { AiOutlineCloseCircle } from 'react-icons/ai';

type Props = {
  message: string;
  isOpen: boolean;
  toggleOpen: any;
  onYesClick: any;
};

export default function QuestionMaodal({
  toggleOpen,
  isOpen,
  message,
  onYesClick,
}: Props) {
  return (
    <div
      className={`absolute left-0 top-0 bottom-0 right-0 opacity-1 flex z-10 items-center justify-center modal  cursor-default   ${
        !isOpen ? 'hidden' : ''
      }`}
    >
      <div className='bg-[#fff] z-20 text-sm rounded-sm mt-10 border border-[#040138]  w-[250px] h-[100px]'>
        <div className='flex border-b justify-between items-center py-1 px-2'>
          <span>??</span>
          <AiOutlineCloseCircle className='text-lg' onClick={toggleOpen} />
        </div>
        <div className='bg-[#040138] text-[#fff] '>
          <div className='flex font-bold p-3 h-full text-center items-center '>
            <p>{message.toUpperCase()}</p>
          </div>
          <div className='flex p-2 px-4 justify-between text-md'>
            <span onClick={toggleOpen}>Close</span>
            <div className='flex space-x-2 justify-between '>
              <span onClick={onYesClick}>Yes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
