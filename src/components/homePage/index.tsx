import * as React from 'react';
import TopicCard from '../topicCard';
import Header from '../headers/HomepageHeader';
import BottomNav from '../mobleBottom';
import { MdTextFields } from 'react-icons/md';
import Link from 'next/link';
import useAuth from '../../../hooks/useAuth';
import NewPost from '../mobleBottom/newPost';
export interface HomePageProps {
  topics: any;
}

export default function HomePage(props: HomePageProps) {
  return (
    <>
      <Header />
      <div className=''>
        <span className='text-center align-middle items-center hidden md:flex justify-center mt-7'>
          <h1>Home</h1>
        </span>
        <div className='pb-[88px]'>
          {props.topics.map((topic: any) => (
            <>
              <TopicCard key={topic.id} topic={topic} />
            </>
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
