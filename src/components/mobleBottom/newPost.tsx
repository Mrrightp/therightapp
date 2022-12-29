import Link from 'next/link';
import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdTextFields } from 'react-icons/md';
import { TbFileDescription } from 'react-icons/tb';

type Props = {
  handleIsOpen: any;
  isOpen: any;
};

export default function NewPost({ isOpen, handleIsOpen }: Props) {
  return (
    <div className=' text-[#002D72] z-30  justify-center items-center space-y-3  flex flex-col'>
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
  );
}
