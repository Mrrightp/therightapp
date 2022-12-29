import React from 'react';
import NotFound from '../../components/404';
import HomePageHeader from '../../components/headers/HomepageHeader';
import SigleMaterial from '../../components/materials/sigleMaterial';
import BottomNav from '../../components/mobleBottom';
import prisma from '../../utils/prisma';

type Props = {
  material: any;
};

export default function MaterialPage({ material }: Props) {
  if (material) {
    return (
      <>
        <HomePageHeader />
        <div>
          <SigleMaterial materialData={material} />
        </div>
      </>
    );
  } else {
    return <NotFound />;
  }
}
export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  const material = await prisma.material.findUnique({
    where: {
      slug: slug,
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
      courseCode: {
        select: {
          name: true,
          slug: true,
        },
      },
      materialLike: {
        select: {
          id: true,
          userId: true,
        },
      },
      uploads: true,
    },
  });
  const materialData = JSON.parse(JSON.stringify(material));

  const topicLikes = await prisma.materialLike.findMany({
    where: {
      likedMaterialId: materialData.id,
    },
  });

  return {
    props: { material: materialData },
  };
}
