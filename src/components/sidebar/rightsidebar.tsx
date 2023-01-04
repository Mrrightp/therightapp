import React from 'react';
import UserCard from '../userCard';

type Props = {};

export default function RightSideBar({}: Props) {
  return (
    <div className='top-0 z-[-10] hidden md:block md:sticky  bottom-0 text- border-l pl-10 pt-2  '>
      <div className='flex flex-col space-y-4'>
        <span className='text-sm whitespace-nowrap '>
          Categories you might like
        </span>
        <div>
          <div className='text-[#002D72] flex flex-col space-y-2 pt-3'>
            <span className='bg-[#CED5E0] w-[290px] py-3 align-middle text-center rounded-full'>
              Breaking
            </span>
            <span className='bg-[#CED5E0] w-[290px] py-3 align-middle text-center rounded-full'>
              Gist
            </span>
            <span className='bg-[#CED5E0] w-[290px] py-3 align-middle text-center rounded-full'>
              Education
            </span>
            <span className='bg-[#CED5E0] w-[290px] py-3 align-middle text-center rounded-full'>
              Trending
            </span>
          </div>
        </div>
        <span className='text-sm whitespace-nowrap '>Notable follows</span>
        <div className='text-[#002D72] flex flex-col space-y-2 pt-3'>
          <div className='space-y-2 border-b-2 pb-3'>
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
          </div>
        </div>
        <div className='text-center text-xs'>
          <span>
            Copyright 2022 @UniForum desinged by <strong>sammy</strong>{' '}
            developed by <strong>Mr Right</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
