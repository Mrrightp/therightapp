// import { trpc } from "../utils/trpc";
import Materials from '../../components/materials';
import prisma from '../../utils/prisma';

export default function MaterialsPage({ materials }: any) {
  // const nameQuery = trpc.useQuery(["names.getName", { name: "nexxel" }]);

  return (
    <>
      <div className='text'>
        <Materials materials={materials} />
      </div>
    </>
  );
}
export async function getServerSideProps(context: any) {
  const result = await prisma.material.findMany({
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
      materialLike: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  const data = JSON.parse(JSON.stringify(result));

  return {
    props: { materials: data },
  };
}
