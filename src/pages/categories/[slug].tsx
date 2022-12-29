import React from 'react';
import CategorieComponent from '../../components/categorie';
import HomePageHeader from '../../components/headers/HomepageHeader';
import BottomNav from '../../components/mobleBottom';
import prisma from '../../utils/prisma';

type Props = {
  category: any;
};

export default function SingleCategoty({ category }: Props) {
  return (
    <>
      <CategorieComponent category={category} />
      <BottomNav />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  const category = await prisma.category.findFirst({
    where: {
      slug: slug,
    },
    include: {
      topics: {
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
      },
    },
  });
  const categoryData = JSON.parse(JSON.stringify(category));

  return {
    props: { category: categoryData, slug: slug },
  };
}
