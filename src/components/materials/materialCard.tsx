import React from 'react';
import { AiFillFolderOpen, AiOutlineDownload } from 'react-icons/ai';
import { BiDotsVertical } from 'react-icons/bi';
import Image from 'next/image';
import Link from 'next/link';
import { BsEye, BsFillHeartFill } from 'react-icons/bs';
import abbreviateNumber from '../../utils/abbreviateNumber';
import { relativeDate } from '../../utils/dayjs';

type Props = {
  materialData: any;
};

export default function MaterialCard({ materialData }: Props) {
  return (
    <div className='flex border-b p-3 cursor-default px-2  space-x-4'>
      <div className='topic-card-left pt-1 '>
        <Link href={`/user/${materialData.author.slug}`}>
          {materialData.author.profileImgUrl ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_FILE_API_URL}/user/profileimage/${materialData.author.profileImgUrl}`}
              alt='avatar'
              className='rounded-lg object-cover topic-card-avatar'
              width={61}
              height={61}
            />
          ) : (
            <Image
              src={`/ufprofileimg.png`}
              alt='avatar'
              className='rounded-lg object-cover topic-card-avatar'
              width={61}
              height={61}
            />
          )}
        </Link>
      </div>
      <div className='flex text-sm  flex-col  w-full'>
        <div className='flex topic-card-middle items-start  justify-between'>
          <h2 className='text-lg '>
            <Link href={`/material/${materialData.slug}`}>
              {materialData.title}
            </Link>
          </h2>
          <BiDotsVertical className='text-2xl' />
        </div>
        <div className='space-y-2s'>
          <div className='flex w-full items-end  mt-1 text-md space-x-4'>
            <div className='flex w-full  text-xs space-x-3'>
              <p>{relativeDate(materialData.createdDate, false)}</p>
              <p>{materialData.courseCode.name}</p>
              <Link href={`/user/${materialData.author.slug}`}>
                <p className='font-extrabold'>
                  by {materialData.author.username}
                </p>
              </Link>
            </div>
            <div className='flex font-bold space-x-1'></div>
          </div>
          <div className='flex w-full justify-between font-bold text-md space-x-4'>
            <span className='flex items-center space-x-1'>
              <AiFillFolderOpen className='text-xl' />
              <p>
                {materialData.uploads.length}{' '}
                {materialData.uploads.length > 1 ? 'files' : 'file'}
              </p>
            </span>
            {/* <span className='flex items-center space-x-1'>
              <AiOutlineDownload />
              <p>50</p>
            </span> */}
            <div className='flex space-x-[2px] items-center space-around'>
              <BsEye className='  text-[12px] text-[#ff0000]' />
              <span className=''>{abbreviateNumber(materialData.viwes)}</span>
            </div>
            <div className='flex items-center space-x-1'>
              <BsFillHeartFill className='text-[#ff0000] ' />
              <span className=' font-bold'>
                {abbreviateNumber(materialData.materialLike.length)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
