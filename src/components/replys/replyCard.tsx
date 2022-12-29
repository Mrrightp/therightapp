import React, { useState } from 'react';
import Image from 'next/image';
import NextedReplyCard from './nestedReplyCard';
import { BsDot, BsFillHeartFill } from 'react-icons/bs';
import { HiDotsHorizontal } from 'react-icons/hi';

type Props = {};

export default function ReplyCard({}: Props) {
  const [replyIsOpen, setReplyIsOpen] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [likesCount, setLikesCount] = useState(1);

  const toggleLike = () => {
    if (isLike) {
      setLikesCount(likesCount - 1);
      setIsLike(false);
    } else {
      setIsLike(true);
      setLikesCount(likesCount + 1);
    }
  };
  return (
    <div className='p-2 border-b '>
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
      <div className='text-lg   font-bold'>
        an answer or response in words or writing. a response made by some
        action, performance, etc
      </div>
      <div className='flex justify-between items-center'>
        <span className='flex py-4 space-x-1 items-center'>
          <div className='flex py-4 space-x-1 items-center'>
            <BsFillHeartFill
              onClick={toggleLike}
              className={`${isLike ? 'text-[#ff0000]' : ''}`}
            />
            <p>{likesCount}</p>
          </div>
          <div
            onClick={() => {
              replyIsOpen ? setReplyIsOpen(false) : setReplyIsOpen(true);
            }}
            className='text-md border px-1 font-bold'
          >
            {replyIsOpen ? 'Hide Replies' : 'Show Replies'}
          </div>
        </span>
        <div>
          <span className='border bg-[#000] px-1 rounded-lg text-[#fff]'>
            Reply
          </span>
        </div>
      </div>
      {replyIsOpen ? <NextedReplyCard /> : null}
    </div>
  );
}
