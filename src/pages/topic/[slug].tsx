import axios from 'axios';
import React, { useEffect } from 'react';
import Head from 'next/head';
import NotFound from '../../components/404';
import SingleTopic from '../../components/singleTopic/index';
import prisma from '../../utils/prisma';
import useAuth from '../../../hooks/useAuth';
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
  const { auth }: any = useAuth();
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
  console.log(topic, auth);
  if (topic.status == 'TRASHED' && !(auth.role == 'ADMIN')) {
    return <NotFound />;
  } else if (topic) {
    return (
      <>
        <Head>
          <meta name='twitter:card' content='summary' key='twcard' />
          <meta
            name='twitter:creator'
            content={'https://twitter.com/unilorinforum'}
            key='twhandle'
          />

          {/* Open Graph */}
          <meta property='og:url' content={topic.slug} key='ogurl' />
          <meta
            property='og:image'
            content={`${process.env.NEXT_PUBLIC_FILE_API_URL}/topic/coverimage/${topic.coverImageUrl}`}
            key='ogimage'
          />
          <meta
            property='og:site_name'
            content={'Unilorin Forum'}
            key='ogsitename'
          />
          <meta property='og:title' content={topic.title} key='ogtitle' />
          <meta
            property='og:description'
            content={topic.metaDiscription}
            key='ogdesc'
          />
          <title>{topic.title}</title>
          <meta name='keywords' content={`${topic.title}`} />
          <meta name='description' content={topic.metaDiscription} />
          <meta
            property='og:image'
            content={`${process.env.NEXT_PUBLIC_FILE_API_URL}/topic/coverimage/${topic.coverImageUrl}`}
          />
        </Head>
        <div>
          <SingleTopic
            topicSaved={topicSaved}
            topicLikes={topicLikes}
            topic={topic}
          />
        </div>
      </>
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
          topics: {
            include: {
              author: true,
              likes: true,
              Category: true,
            },
          },
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
