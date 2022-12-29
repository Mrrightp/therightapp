import React, { useEffect, useState } from 'react';
import { AiOutlineHome, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { IoMdContact } from 'react-icons/io';
import { MdOutlineForwardToInbox, MdTextFields } from 'react-icons/md';
import Link from 'next/link';
import { TbFileDescription } from 'react-icons/tb';
export interface IBottomNavProps {}

export default function AdminBottom(props: IBottomNavProps) {
  return (
    <div className=''>
      <div className=' admin-bottom-nav bg-[#000] text-white fixed   items-center flex justify-around '>
        <Link href={'/rightmain/topics'}>Topics</Link>
        <Link href={'#'}>Materials</Link>
        <Link href={'#'}>Votings</Link>
        <Link href={'/rightmain/users'}>Users</Link>
      </div>
    </div>
  );
}
