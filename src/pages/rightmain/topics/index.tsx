import React from 'react';
import AdminBottom from '../../../components/admin/adminBottom';
import AdminTopicCard from '../../../components/admin/adminTopicCard';
import AdminHearder from '../../../components/admin/header';
import prisma from '../../../utils/prisma';
type Props = {
  topicsData: any;
};

export default function index({ topicsData }: Props) {
  return (
    <>
      <div className='w-full'>
        <div className='text-center items-center justify-center flex text-xl font-semibold bg-black text-white h-[60px]'>
          User Page
        </div>
        <div className='space-y-1'>
          {topicsData.map((topicsData: any) => (
            <AdminTopicCard key={topicsData.id} topicData={topicsData} />
          ))}
        </div>
      </div>
      <AdminBottom />
    </>
  );
}
export async function getServerSideProps(context: any) {
  const result = await prisma.topic.findMany({});

  const data = JSON.parse(JSON.stringify(result));

  return {
    props: { topicsData: data },
  };
}
