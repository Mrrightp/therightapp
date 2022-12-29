import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { BiArrowBack } from 'react-icons/bi';
import router from 'next/router';

type Props = {
  pageName: string;
};

export default function UploadHeader({ pageName }: Props) {
  return (
    <div className='home-page-header border-b-2 text-[#002D72] font- px-4 items-center  flex justify-between'>
      <div className='text-3xl'>
        <BiArrowBack
          onClick={() => {
            router.back();
          }}
        />
      </div>
      <div className='heade-logo'>
        <span>{pageName}</span>
      </div>
      <div className='flex text-3xl  space-x-2'>
        <span className=''>
          <FiSettings className='' />
        </span>
      </div>
    </div>
  );
}
