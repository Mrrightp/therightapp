import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let allTopics = await prisma.topic.findMany({
      take: 10,
      orderBy: {
        id: 'desc',
      },
    });
    res.json(allTopics);
    // res.json({
    //   topics: allTopics,
    //   sucess: 1,
    // });
  } catch (err) {
    res.status(500).json(err);
  }
}
