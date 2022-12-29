import * as React from 'react';
import prisma from '../../utils/prisma';
import UserProfile from '../../components/userProfile';
import BottomNav from '../../components/mobleBottom';
import NotFound from '../../components/404';

export interface IUserProps {
  topics: object;
  userInfo: object;
}

export default function User({ userInfo }: IUserProps) {
  if (userInfo) {
    return (
      <div>
        <UserProfile userInfo={userInfo} />
        <BottomNav />
      </div>
    );
  } else {
    return (
      <>
        <NotFound />
      </>
    );
  }
}
export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  console.log(slug);

  const getUserInfo = await prisma.user.findFirst({
    where: {
      slug: slug,
    },
    include: {
      topics: {
        include: {
          author: true,
          Category: true,
          likes: true,
        },
        orderBy: {
          id: 'desc',
        },
      },
      followedBy: true,
      following: true,
      department: true,
      faculty: true,
      materials: true,
      likedMaterials: true,
      likedTopics: true,
      SavedMaterials: true,
      SavedTopics: true,
    },
  });
  const userdata = JSON.parse(JSON.stringify(getUserInfo));
  // console.log(userdata, 'dd');

  return {
    props: { userInfo: userdata },
  };
}
