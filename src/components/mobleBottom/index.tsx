import React, { useEffect, useState } from 'react';
import { AiOutlineHome, AiOutlinePlusCircle } from 'react-icons/ai';
import { VscFilePdf } from 'react-icons/vsc';
import { BiSearchAlt } from 'react-icons/bi';
import { IoMdContact } from 'react-icons/io';
import { MdOutlineForwardToInbox, MdTextFields } from 'react-icons/md';
import Link from 'next/link';
import { TbFileDescription } from 'react-icons/tb';
import useAuth from '../../../hooks/useAuth';
export interface IBottomNavProps {}

export default function BottomNav(props: IBottomNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { auth }: any = useAuth();
  const handleIsOpen = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <div className=''>
      {auth.id ? (
        <div className='bottom-add-icon z-20 text-[#002D72]  justify-center items-center space-y-3 fixed flex flex-col'>
          <Link href={'/new-topic'}>
            <a>
              <MdTextFields
                className={`text-5xl bg-[#e6e3e3] p-1 rounded-xl ${
                  !isOpen ? 'hidden' : 'inline'
                }`}
              />
            </a>
          </Link>
          <Link href={'/new-material'}>
            <a>
              <TbFileDescription
                className={`text-5xl bg-[#e6e3e3]  p-1 rounded-xl ${
                  !isOpen ? 'hidden' : 'inline'
                } `}
              />
            </a>
          </Link>

          <AiOutlinePlusCircle
            onClick={handleIsOpen}
            className='bg-[#ffffff] p-1 rounded-xl text-6xl '
          />
        </div>
      ) : null}

      <div className='text-2xl bottom-nav fixed md:hidden  items-center flex justify-around '>
        <Link href={'/'}>
          <AiOutlineHome />
        </Link>
        <Link href={'/explore'}>
          <a>
            <BiSearchAlt />
          </a>
        </Link>
        <Link href={'/materials'}>
          <VscFilePdf />
        </Link>
        {auth.id ? (
          <Link href={`/user/${auth.slug}`}>
            <IoMdContact />
          </Link>
        ) : (
          <Link href={`/login`}>
            <IoMdContact />
          </Link>
        )}
      </div>
    </div>
  );
}
