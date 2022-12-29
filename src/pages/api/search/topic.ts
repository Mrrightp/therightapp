import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchString = req.body.searchString;
  console.log(searchString);
  const result = await prisma.topic.findMany({
    where: {
      title: {
        contains: searchString,
      },
      content: {
        contains: searchString,
      },
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
  });
  res.send(result);
}
