import React, { useState } from 'react';
import { AiFillDelete, AiFillEdit, AiFillCloseCircle } from 'react-icons/ai';
import { RiDraftFill } from 'react-icons/ri';
import { MdReportGmailerrorred } from 'react-icons/md';
import axios from 'axios';
import QuestionMaodal from '../modals/question';
import Router from 'next/router';
import Link from 'next/link';
type Props = {
  toggleOptions: any;
  topic: any;
};

export default function TopicOptions({ toggleOptions, topic }: Props) {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isYes, setIsYes] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const toggleOpen = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };
  const handleDelete = async () => {
    setMessage('are you sure you want to delete this topic?');
    toggleOpen();
    setIsDelete(true);
  };
  const onYesClick = async () => {
    toggleOpen();
    toggleOptions();

    if (isDelete) {
      const data = {
        topicId: topic.id,
      };
      const deleteTopic = await axios.post('/api/topics/trashtopic', data);
      if (deleteTopic.data.success) {
        Router.push('/');
      }
    }
  };

  return (
    <>
      <QuestionMaodal
        onYesClick={onYesClick}
        toggleOpen={toggleOpen}
        isOpen={isOpen}
        message={message}
      />
      <div className='rounded-md fixed bottom-[75px] z-10 bg-[#12014e] text-teal-50  text-sm space-y-5 py-2 justify-around items-start px-3 flex flex-col right-2'>
        <div onClick={handleDelete} className='flex items-center space-x-1'>
          <AiFillDelete className='text-[#e60a0a]' />
          <span>Delete</span>
        </div>
        <div className='flex items-center space-x-1'>
          <RiDraftFill className='text-[#e60a0a]' />
          <span>Draft</span>
        </div>
        <div className='flex items-center space-x-1'>
          <AiFillEdit className='text-[#e60a0a]' />
          <Link href={`/new-topic?edittopicId=${topic.id}`}>
            <span>Edit</span>
          </Link>
        </div>
        <div className='flex items-center space-x-1'>
          <MdReportGmailerrorred className='text-[#e60a0a]' />
          <span>Report</span>
        </div>
        <div onClick={toggleOptions} className='flex items-center space-x-1'>
          <AiFillCloseCircle className='text-[#e60a0a]' />
          <span>Close</span>
        </div>
      </div>
    </>
  );
}
