import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  let lastDay: any = Date.now() - 3 * 24 * 60 * 60 * 1000;
  lastDay = new Date(lastDay).toISOString();
  const topicTopLikes: any = await prisma.topic.findMany({
    take: 5,
    orderBy: {
      likes: {
        _count: 'desc',
      },
    },
    where: {
      createdDate: {
        gte: lastDay,
      },
    },
    select: {
      Category: true,
      createdDate: true,
      viwes: true,
      title: true,
      coverImageUrl: true,
      slug: true,
      author: true,
      likes: true,
      content: true,
    },
  });
  res.json({
    message: 'successful',
    success: true,
    body: topicTopLikes,
  });
}
