import React, { useState, useEffect, useCallback } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { FaShare, FaSave } from 'react-icons/fa';
import { BsFillHeartFill } from 'react-icons/bs';
import { HiDotsVertical } from 'react-icons/hi';
import useAuth from '../../../hooks/useAuth';
// import Replys from '../replys';
import axios from 'axios';
type Props = {};

export default function MaterialBottom({}: Props) {
  const [likeSate, setLikeSate] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [likesCount, setLikesCount] = useState();
  const [likeArr, setLikeArr]: any = useState([]);
  const { auth, setAuth }: any = useAuth();

  return (
    <>
      <div className=''>
        <div className='text-2xl w-full Topic-bottom fixed   items-center flex justify-around '>
          <div className='flex space-x-[5px]'>
            <div className='flex  items-center '>
              <BsFillHeartFill
                className={` 'hidden ' : 'block' font-extrabold `}
              />
              <BsFillHeartFill
                className={`${
                  likeSate ? ' block' : 'hidden'
                } font-extrabold text-[#ff0000]`}
              />
            </div>
            <span className='text-sm  ml-5'>{}3</span>
          </div>
          <div className='flex  items-center space-x-[5px]'>
            <AiOutlineComment />
            <span className='text-sm'>10k</span>
          </div>
          <div className='flex  items-center space-x-[5px]'>
            <FaShare />
            <span className='text-sm'>10k</span>
          </div>
          <div className='flex  items-center space-x-[5px]'>
            <FaSave />
            <span className='text-sm'>10k</span>
          </div>
          <div className='flex  items-center space-x-[5px]'>
            <HiDotsVertical />
          </div>
        </div>
      </div>
    </>
  );
}
