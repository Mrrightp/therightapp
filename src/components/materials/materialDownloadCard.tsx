import React from 'react';
import { VscFilePdf } from 'react-icons/vsc';
import { BsFillCloudDownloadFill } from 'react-icons/bs';
import { FcDownload } from 'react-icons/fc';
import { BiDotsVertical } from 'react-icons/bi';
import Link from 'next/link';

type Props = {
  uploadsData: any;
};

export default function MaterialDownloadCard({ uploadsData }: Props) {
  return (
    <div className='flex w-full space-x-2 p-1 py-2 border-2'>
      <div>
        <VscFilePdf className='text-3xl' />
      </div>
      <div className='w-full space-y-2'>
        <div className='flex text-center justify-between'>
          <h2>{uploadsData.name}</h2>
          <BiDotsVertical className='text-2xl' />
        </div>

        <div className='flex justify-between pr-5'>
          <span className='font-bold'>{uploadsData.size}</span>
          <Link
            href={`${process.env.NEXT_PUBLIC_FILE_API_URL}/materials/${uploadsData.link}`}
          >
            <FcDownload className='text-xl' />
          </Link>
        </div>
        <div>
          <hr className='border-2 w-full border-[#dc1010]' />
        </div>
      </div>
    </div>
  );
}
