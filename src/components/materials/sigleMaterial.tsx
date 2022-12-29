import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsEyeFill } from 'react-icons/bs';
import Replys from '../replys';
import MaterialDownloadCard from './materialDownloadCard';
import MaterialBottom from './materialBottom';
import { relativeDate } from '../../utils/dayjs';
import abbreviateNumber from '../../utils/abbreviateNumber';
export interface SingleTopicProps {
  materialData: any;
}

export default function SingleTopic({ materialData }: SingleTopicProps) {
  const [followingState, setFollowingState] = useState(false);
  const [isReply, setIsReply] = useState(false);

  const toggleFollow = () => {
    if (followingState) {
      setFollowingState(false);
    } else {
      setFollowingState(true);
    }
  };

  const toggleReply = () => {
    if (isReply) {
      setIsReply(false);
    } else {
      setIsReply(true);
    }
  };
  return (
    <>
      {isReply ? <Replys toggleReply={toggleReply} /> : null}
      <div className={`${isReply ? 'hidden' : null} `}>
        <div className='pb-[70px] px-2'>
          <div className=' flex flex-col py-2 px-1 border-[#000] mb-1'>
            <h2 className='md:text-2xl text-xl pt-3 pb-1  font-semibold leading-5'>
              {materialData.title}
            </h2>
          </div>

          <div className='flex border-[#000] text-lg whitespace-nowrap p-4 space-x-2'>
            <div>
              {materialData.author.profileImgUrl ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_API_URL}/user/profileimage/${materialData.author.profileImgUrl}`}
                  width={40}
                  height={40}
                  alt='avatar'
                  className='rounded-lg'
                />
              ) : (
                <Image
                  src={`/ufprofileimg.png`}
                  width={40}
                  height={40}
                  alt='avatar'
                  className='rounded-lg'
                />
              )}
            </div>
            <div className='flex w-full space-x-1  text-sm justify-between'>
              <div className=''>
                <div className='space-x-3'>
                  <Link href={`/user/${materialData.author.slug}`}>
                    <a className='font-bold'>{materialData.author.username}</a>
                  </Link>
                  <span
                    onClick={toggleFollow}
                    className={` border-2 rounded-full px-2 text-sm`}
                  >
                    {followingState ? 'following' : 'Follow'}
                  </span>
                </div>
                <div className='flex space-x-2 text-xs'>
                  <span>{relativeDate(materialData.createdDate, false)}</span>{' '}
                  <div className='flex space-x-1 items-center'>
                    <BsEyeFill />
                    <span>{abbreviateNumber(materialData.viwes)}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className='flex space-x-1 text-xs items-center'>
                  <span className=' rounded-md text-[#fff] border bg-[#0b0346] px-3'>
                    <Link href={`/coursecode`}>
                      {materialData.courseCode.name}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='text-justify mb-3'>
            <p>{materialData.description}</p>
          </div>

          <div className=' w-full text-sm space-y-1 px-1'>
            {materialData.uploads.map((upload: any) => (
              <MaterialDownloadCard key={upload.id} uploadsData={upload} />
            ))}
          </div>
        </div>
      </div>
      <MaterialBottom />
      {/* {isReply ? null : <TopicBottom toggleReply={toggleReply} />} */}
    </>
  );
}
