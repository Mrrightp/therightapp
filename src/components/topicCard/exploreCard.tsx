import React from 'react';
import { BsEye, BsFillHeartFill } from 'react-icons/bs';
import abbreviateNumber from '../../utils/abbreviateNumber';
import Link from 'next/link';
type Props = {
  topic: any;
};

export default function ExploreCard({ topic }: Props) {
  return (
    <div className='border-b flex justify-between items-end border-black  py-1'>
      <div className='font-bold text-xs flex'>
        <Link href={`/topic/${topic.slug}`}>
          <a>{topic.title}</a>
        </Link>
      </div>
      <div className='flex space-x-3'>
        <span className='flex text-[10px] font-extrabold space-x-1  items-center'>
          <BsFillHeartFill className='text-[#e60a0a]' />
          <p> {abbreviateNumber(topic.likes.length)}</p>
        </span>
        <span className='flex text-[10px] font-extrabold space-x-1  items-center'>
          <BsEye
            className='
text-[#e60a0a]'
          />
          <p>{abbreviateNumber(topic.viwes)}</p>
        </span>
      </div>
    </div>
  );
}
