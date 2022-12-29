import React, { useState } from 'react';
import Explore from '../components/explore';
import ExploreHeader from '../components/headers/exploreHeader';
import BottomNav from '../components/mobleBottom';
import prisma from '../utils/prisma';

type Props = {
  topics: any;
  materials: any;
};

export default function ExplorePage({ topics, materials }: Props) {
  return (
    <div>
      <ExploreHeader topics={topics} materials={materials} />
      <BottomNav />
    </div>
  );
}
export async function getServerSideProps(context: any) {
  const result = await prisma.topic.findMany({
    where: {
      status: 'PUBLISHED',
    },
    include: {
      author: {
        select: {
          username: true,
          role: true,
          profileImgUrl: true,
          slug: true,
        },
      },
      Category: {
        select: {
          title: true,
          slug: true,
        },
      },
      likes: true,
    },
    orderBy: {
      id: 'desc',
    },
  });
  const result2 = await prisma.material.findMany({
    include: {
      author: {
        select: {
          username: true,
          role: true,
          profileImgUrl: true,
          slug: true,
        },
      },
      courseCode: true,
      uploads: true,
      materialLike: true,
    },

    orderBy: {
      id: 'desc',
    },
  });

  const data = JSON.parse(JSON.stringify(result));
  const data2 = JSON.parse(JSON.stringify(result2));

  return {
    props: { topics: data, materials: data2 },
  };
}
