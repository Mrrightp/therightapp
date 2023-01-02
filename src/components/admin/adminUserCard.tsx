import Image from 'next/image';
import React, { useState } from 'react';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { MdAdminPanelSettings } from 'react-icons/md';
import { GoRepoPush } from 'react-icons/go';
import { FaBan } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import Router from 'next/router';

type Props = {
  userData: any;
};

export default function AdminUserCard({ userData }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='p-2 cursor-default m-1 w-full border-black space-y-1 border'>
      <div className='flex space-x-4'>
        <div>
          <Image alt='img' src={'/blood.PNG'} width='100px' height={70} />
        </div>
        <div className='flex justify-between w-full'>
          <div className='flex flex-col'>
            <span className='text-xl font-bold'>{userData.username}</span>
            <span>{userData.role}</span>
          </div>
          <span
            onClick={() => {
              isOpen ? setIsOpen(false) : setIsOpen(true);
            }}
            className='font-semibold border h-fit w-fit border-black px-1 m-2'
          >
            Toggle Options
          </span>
        </div>
      </div>
      {isOpen ? (
        <div className='space-x-2 flex flex-wrap  items-center '>
          <div
            onClick={async () => {
              const data = {
                userId: userData.id,
              };
              const newAdmin = await axios.post('/api/users/makeadmin', data);

              if (newAdmin) {
                Router.push(`/user/${userData.slug}`);
              }
            }}
            className=' items-center space-x-1 px-1 w-fit border border-black flex'
          >
            <MdAdminPanelSettings className='text-lg' />
            <span>Make Admin</span>
          </div>
          <div
            onClick={async () => {
              const data = {
                userId: userData.id,
              };
              const newRep = await axios.post('/api/users/makeclassrep', data);

              Router.push(`${Router.asPath}`);
            }}
            className=' items-center space-x-1 px-1 w-fit border border-black flex'
          >
            <GoRepoPush className='' />
            <span>Make Class Rep</span>
          </div>
          <div className=' items-center space-x-1 px-1 w-fit border border-black flex'>
            <AiTwotoneEdit className='' />
            <span>Edit User</span>
          </div>
          <div className=' items-center space-x-1 px-1 w-fit border border-black flex'>
            <FaBan className='text-[#c90000]' />
            <span>Ban User</span>
          </div>
          <div className=' items-center space-x-1 px-1 w-fit border border-black flex'>
            <AiFillDelete className='text-[#c90000]' />
            <span>delete</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
