import React from 'react';
import NewTopicHeader from '../components/headers/newTopicHeader';
import NewTopicComponent from '../components/newTopic';
import NewTopicSideBar from '../components/sidebar/newTopicSideBar';
import prisma from '../utils/prisma';
type Props = {
  topic: any;
};

export default function NewTopic({ topic }: Props) {
  return (
    <div>
      <NewTopicHeader />
      <div className='flex bg-[#efefef] justify-between '>
        <NewTopicComponent topic={topic} />
        <NewTopicSideBar />
      </div>
    </div>
  );
}
NewTopic.getLayout = function pageLayout(page: any) {
  return <>{page}</>;
};
export async function getServerSideProps(context: any) {
  const { edittopicId } = context.query;
  if (edittopicId) {
    const topic = await prisma.topic.findUnique({
      where: {
        id: +edittopicId,
      },
      include: {
        Category: true,
      },
    });
    const topicData = JSON.parse(JSON.stringify(topic));
    if (!topic) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        topic: topicData,
      },
    };
  }
  return {
    props: {
      topic: {},
    },
  };
}
