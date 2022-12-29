import React, { useState } from 'react';
import Image from 'next/image';
import { BsDot, BsFillHeartFill } from 'react-icons/bs';
import { HiDotsHorizontal } from 'react-icons/hi';

type Props = {};

export default function NextedReplyCard({}: Props) {
  const [isLike, setIsLike] = useState(false);

  const toggleLike = () => {
    isLike ? setIsLike(false) : setIsLike(true);
  };
  return (
    <div className='p-2 border-l ml-3 border-[#000] '>
      <div className='flex justify-between items-center'>
        <div className='flex my-3 space-x-2 items-center'>
          <Image
            src={'/theboss.jpg'}
            width={20}
            height={20}
            className='rounded-full '
          />
          <span>Hikmah</span>
          <BsDot />
          <span>2h ago</span>
        </div>
        <HiDotsHorizontal />
      </div>
      <div className='text-lg text-justify  font-bold'>
        an answer or response in words or writing. a response made by some
        action, performance, etc
      </div>
      <div className='flex justify-between items-center'>
        <span className='flex py-4 space-x-1 items-center'>
          <BsFillHeartFill
            onClick={toggleLike}
            className={`${isLike ? 'text-[#ff0000]' : ''}`}
          />
          <p>10K</p>
        </span>
        <div>
          <span className='border bg-[#000] px-1 rounded-lg text-[#fff]'>
            Reply
          </span>
        </div>
      </div>
    </div>
  );
}
