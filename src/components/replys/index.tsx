import React, { useState } from 'react';

import { BiArrowBack } from 'react-icons/bi';
import { BsFillHeartFill, BsFillArrowUpCircleFill } from 'react-icons/bs';
import { AiOutlineComment } from 'react-icons/ai';
import ReplyCard from './replyCard';

type Props = {
  toggleReply: any;
};

export default function Replys({ toggleReply }: Props) {
  const [replyInput, setReplyInput] = useState('');
  const handleChange = (e: any) => {
    setReplyInput(e.target.value);
  };
  return (
    <>
      <div className='z-10 rounded-t-lg flex bg-white items-end bottom-0 fixed border-2 w-screen md:w-11/12 border-[#040646] '>
        <div
          contentEditable='true'
          placeholder='Your Comment here...'
          onChange={handleChange}
          className='w-full pl-2 pb-2 text-xl min-h-fit overflow-y-hidden outline-none color'
        ></div>
        <BsFillArrowUpCircleFill className='text-5xl' />
      </div>
      <div className='w-full bg-[#f7f7f7]'>
        <div className='flex px-5 text-[#fff] font-medium text-2xl space-x-7 h-16 bg-[#030131] items-center'>
          <BiArrowBack onClick={toggleReply} />
          <span>Replys</span>
        </div>

        <div className='flex flex-col border  border-[#030131] space-y-2 m-4 p-2'>
          <span className='text-sm'>Replying to</span>
          <span className='font-extrabold'>
            What is the meaning of reply, and what other words can be used
            instead
          </span>
          <div className='flex justify-between'>
            <span className='text-sm'>Mr Right</span>
            <div className='flex space-x-2'>
              <span className='flex items-center'>
                <BsFillHeartFill className='text-[#ff0000]' />
                <p>10k</p>
              </span>
              <span className='flex items-center'>
                <AiOutlineComment />
                <p>10k</p>
              </span>
            </div>
          </div>
        </div>
        <div className='mx-5'>
          <ReplyCard />
          <ReplyCard />
          <ReplyCard />
          <ReplyCard />
        </div>
      </div>
    </>
  );
}
