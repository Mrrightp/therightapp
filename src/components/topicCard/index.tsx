import React, { useState } from 'react';
import Image, { ImageLoader } from 'next/image';
import { HiDotsHorizontal } from 'react-icons/hi';
import { BsEye, BsFillHeartFill, BsDot } from 'react-icons/bs';
import Link from 'next/link';
import axios from 'axios';
import { relativeDate } from '../../utils/dayjs';
import abbreviateNumber from '../../utils/abbreviateNumber';
import { removeHtml } from '../../utils/removeHtml';
import Router from 'next/router';
export interface TopicCardProps {
  topic: any;
}

export default function TopicCard({ topic }: TopicCardProps) {
  const trimString = (string: string, lenth: number) => {
    return string.substring(0, lenth).replace('/<p[^>]*>/g', '');
  };

  return (
    <div className='text-2xl border-b px-2 mt-1 flex w-full '>
      <div className=' min-w-fit pt-1 '>
        <Link href={`/user/${topic.author.slug}`}>
          {topic.author.profileImgUrl ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_FILE_API_URL}/user/profileimage/${topic.author.profileImgUrl}`}
              alt='avatar'
              className='rounded-lg object-cover topic-card-avatar'
              width={40}
              height={41}
            />
          ) : (
            <Image
              src={`/ufprofileimg.png`}
              alt='avatar'
              className='rounded-lg object-cover topic-card-avatar'
              width={40}
              height={41}
            />
          )}
        </Link>
      </div>
      <div className='right pt-3  px-2  flex flex-col  w-full'>
        <div className='topic-card-top-content text-sm space-x-2 flex justify-between'>
          <div className='flex text-[12px] items-end '>
            <span className='topic-card-author'>
              <Link href={`/user/${topic.author.slug}`}>
                <a>{topic.author.username}</a>
              </Link>
            </span>
            <BsDot className='text-lg' />
            <span className='topic-card-time'>
              {relativeDate(topic.createdDate, true)}
            </span>
            <BsDot className='text-lg' />
            <span className='topic-card-cat'>
              <Link href={`categories/${topic.Category.slug}`}>
                {topic.Category.title}
              </Link>
            </span>
          </div>
          <div className='flex  space-x-2 text-[10px] items-center '>
            <div className='flex space-x-1 items-center space-around'>
              <BsEye className=' font-bold   text-[#ff9912]' />
              <span className=''>{abbreviateNumber(topic.viwes)}</span>
            </div>
            <div className='flex items-center space-x-1'>
              <BsFillHeartFill className='text-[#ff9912] ' />
              <span className=' font-bold'>
                {abbreviateNumber(topic.likes.length)}
              </span>
            </div>
          </div>
        </div>
        <div className='topic-card-middle mt-2   font-bold'>
          <h2 className='text-justify'>
            <Link href={`/topic/${topic.slug}`}>
              <a>{topic.title}</a>
            </Link>
          </h2>
        </div>
        <div className='topic-card-excerpt pb-2 justify-between text-justify flex text-xs mt-1 '>
          <div>{removeHtml(trimString(topic.content, 170))} ...</div>
        </div>
        {topic.coverImageUrl ? (
          <div className=''>
            <Image
              className='rounded-lg object-cover'
              width={500}
              height={250}
              src={`${process.env.NEXT_PUBLIC_FILE_API_URL}/user/coverimage/${topic.coverImageUrl}`}
              alt='avatar'
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
