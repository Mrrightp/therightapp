import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  let lastDay: any = Date.now() - 7 * 24 * 60 * 60 * 1000;
  lastDay = new Date(lastDay).toISOString();
  const materialTopLikes: any = await prisma.material.findMany({
    take: 5,
    where: {
      createdDate: {
        gte: lastDay,
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
      courseCode: true,

      materialLike: true,
      uploads: true,
    },

    orderBy: {
      id: 'desc',
    },
  });
  console.log(materialTopLikes);
  res.json({
    message: 'successful',
    success: true,
    body: materialTopLikes,
  });
}
