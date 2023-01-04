// import { trpc } from "../utils/trpc";
import HomePage from '../components/homePage';
import axios from 'axios';
import prisma from '../utils/prisma';
import NotFound from '../components/404';
import LandingComponent from '../components/landingComponents';

export default function Name(props: any) {
  // const nameQuery = trpc.useQuery(["names.getName", { name: "nexxel" }]);

  if (props.topics) {
    return (
      <>
        <div className='text '>
          <HomePage topics={props.topics} />
        </div>
      </>
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

  const data = JSON.parse(JSON.stringify(result));

  return {
    props: { topics: data },
  };
}
