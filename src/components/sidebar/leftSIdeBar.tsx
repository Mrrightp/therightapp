import React from 'react';
import { FaHome, FaRegComments } from 'react-icons/fa';
import { BsSearch, BsInbox } from 'react-icons/bs';
import { CgProfile, CgPoll } from 'react-icons/cg';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FcAbout } from 'react-icons/fc';
import { AiOutlineContacts, AiOutlineFilePdf } from 'react-icons/ai';
import { BiNotepad } from 'react-icons/bi';
import Image from 'next/image';
import Link from 'next/link';
import useAuth from '../../../hooks/useAuth';
import { useRouter } from 'next/router';
type Props = {};

export default function LeftSIdeBar({}: Props) {
  const router = useRouter();
  const currentRouter = router.asPath;
  console.log(currentRouter);
  const { auth }: any = useAuth();

  return (
    <div className='top-0 hidden md:sticky md:flex bottom-0  p-3  flex-col border-r-2 pr-16 pt-5 '>
      <div className='pb-4 font-semibold text-3xl'>
        <Link href={'/'}>RightApp</Link>
      </div>
      <div className='mt-8 text-[#000]'>
        <div className='space-y-3'>
          <span className='text-sm font-bold '>Navigation</span>
          <div className='pl-4 space-y-1'>
            <div
              className={`flex ${
                currentRouter == '/' ? 'bg-[#002D72] text-[#fff]' : ''
              }  pr-8 pl-2 py-3  rounded-md  items-center space-x-2 `}
            >
              <FaHome />
              <Link href={'/'}>Home</Link>
            </div>
            <div
              className={`flex ${
                currentRouter == '/explore' ? 'bg-[#002D72] text-[#fff]' : ''
              }  pr-8 pl-2 py-3  rounded-md  items-center space-x-2 `}
            >
              <BsSearch />
              <Link href={'/explore'}>Explore</Link>
            </div>
            <div
              className={`flex ${
                currentRouter == '/materials' ? 'bg-[#002D72] text-[#fff]' : ''
              }  pr-8 pl-2 py-3  rounded-md  items-center space-x-2 `}
            >
              <AiOutlineFilePdf />
              <Link href={`/materials`}>Materials</Link>
            </div>
            <div
              className={`flex ${
                currentRouter == `/user/${auth.slug}`
                  ? 'bg-[#002D72] text-[#fff]'
                  : ''
              }  pr-8 pl-2 py-3  rounded-md  items-center space-x-2 `}
            >
              <CgProfile />
              <Link href={`/user/${auth.slug}`}>Profile</Link>
            </div>
          </div>
          <span className='text-sm font-bold '>Insights</span>
          <div className='pl-4 text-md space-y-3'>
            <div className='flex items-center space-x-3'>
              <BsInbox />
              <span>Inbox</span>
              <span className='rounded-full bg-[#FF9100] px-1 text-xs text-[#fff]'>
                10
              </span>
            </div>
            <div className='flex items-center space-x-3'>
              <IoMdNotificationsOutline />
              <span>Notifications</span>
              <span className='rounded-full bg-[#FF9100] px-1 text-xs text-[#fff]'>
                10
              </span>
            </div>
            <div className='flex items-center space-x-3'>
              <FaRegComments />
              <span>Comments</span>
              <span className='rounded-full bg-[#FF9100] px-1 text-xs text-[#fff]'>
                10
              </span>
            </div>
          </div>
          <span className='text-sm font-bold '>Pages</span>
          <div className='pl-4 text-md space-y-3'>
            <div className='flex items-center space-x-3'>
              <FcAbout />
              <span>About us</span>
            </div>
            <div className='flex items-center space-x-3'>
              <AiOutlineContacts />
              <span>Contact us</span>
            </div>
            <div className='flex items-center space-x-3'>
              <BiNotepad />
              <span>Guidlines</span>
            </div>
          </div>
        </div>
        <div className='flex space-x-1 mt-6'>
          <Image
            alt=''
            width={100}
            height={100}
            src={'/sammy.jpg'}
            className='object-cover'
          />
          <div className='flex flex-col space-y-0'>
            <span className='text-lg font-bold'>sammy.awdit</span>
            <span className='text-sm'>@sammy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
