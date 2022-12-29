import axios from 'axios';
import React, { useEffect } from 'react';
import NotFound from '../../components/404';
import SingleTopic from '../../components/singleTopic/index';
import prisma from '../../utils/prisma';
type Props = {
  topic: any;
  topicLikes: object;
  topicSaved: object;
};

export default function SingleTopicPage({
  topic,
  topicLikes,
  topicSaved,
}: Props) {
  useEffect(() => {
    if (topic) {
      const addViwe = async () => {
        const data = {
          viwesCount: topic.viwes + 1,
          topicId: topic.id,
        };
        await axios.post('/api/topics/viwe', data);
      };
      addViwe();
    }
  });

  if (topic) {
    return (
      <div>
        <SingleTopic
          topicSaved={topicSaved}
          topicLikes={topicLikes}
          topic={topic}
        />
      </div>
    );
  } else {
    return <NotFound />;
  }
}
export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  const topic = await prisma.topic.findUnique({
    where: {
      slug: slug,
    },
    include: {
      author: {
        select: {
          username: true,
          role: true,
          profileImgUrl: true,
        },
      },
      Category: {
        select: {
          title: true,
          slug: true,
        },
      },
      upload: true,

      comments: {
        include: {
          replys: true,
        },
      },
      savedTopics: true,
    },
  });
  if (topic) {
    const topicData = JSON.parse(JSON.stringify(topic));

    const topicLikes = await prisma.topiclike.findMany({
      where: {
        likedTopicId: topicData.id,
      },
    });

    const topicLikesData = JSON.parse(JSON.stringify(topicLikes));

    const topicSaved = await prisma.savedTopics.findMany({
      where: {
        SavedTopicId: topicData.id,
      },
    });
    const topicSavedData = JSON.parse(JSON.stringify(topicSaved));
    return {
      props: {
        topic: topicData,
        topicLikes: topicLikesData,
        topicSaved: topicSavedData,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
