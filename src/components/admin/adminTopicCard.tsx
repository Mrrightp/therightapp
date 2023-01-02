import Image from 'next/image';
import React, { useState } from 'react';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { MdAdminPanelSettings } from 'react-icons/md';
import { GoRepoPush } from 'react-icons/go';
import { FaBan } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import Router from 'next/router';

type Props = {
  topicData: any;
};

export default function AdminTopicCard({ topicData }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='p-2 cursor-default m-1 w-full border-black space-y-1 border'>
      <div className='flex space-x-4'>
        <div className='flex justify-between w-full'>
          <div className='flex flex-col'>
            <span className='text-xl font-bold'>{topicData.title}</span>
            <div className='flex space-x-3'>
              <strong>Status:</strong>
              <span>{topicData.status}</span>
            </div>
          </div>
          <span
            onClick={() => {
              isOpen ? setIsOpen(false) : setIsOpen(true);
            }}
            className='font-semibold border h-fit w-fit border-black px-1 m-2'
          >
            Toggle Options
          </span>
        </div>
      </div>
      {isOpen ? (
        <div className='space-x-2 flex flex-wrap  items-center '>
          <div
            onClick={async () => {
              const data = {
                topicId: topicData.id,
                status: 'PUBLISHED',
              };
              const publish = await axios.post(
                '/api/topics/changestatus',
                data
              );

              if (publish) {
                Router.push(`/topic/${topicData.slug}`);
              }
            }}
            className=' items-center space-x-1 px-1 w-fit border border-black flex'
          >
            <MdAdminPanelSettings className='text-lg' />
            <span>Publish topic</span>
          </div>
          <div
            onClick={async () => {
              const data = {
                topicId: topicData.id,
                status: 'DRAFT',
              };
              const DRAFT = await axios.post('/api/topics/changestatus', data);
              if (DRAFT) {
                Router.push(Router.asPath);
              }
            }}
            className=' items-center space-x-1 px-1 w-fit border border-black flex'
          >
            <MdAdminPanelSettings className='text-lg' />
            <span>draft topic</span>
          </div>
          <div
            onClick={async () => {
              const data = {
                topicId: topicData.id,
                status: 'TRASHED',
              };
              const TRASHED = await axios.post(
                '/api/topics/changestatus',
                data
              );
              if (TRASHED) {
                Router.push(Router.asPath);
              }
            }}
            className=' items-center space-x-1 px-1 w-fit border border-black flex'
          >
            <AiFillDelete className='text-[#c90000]' />
            <span>delete</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
