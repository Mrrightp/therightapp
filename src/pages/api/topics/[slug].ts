import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let slug: any = req.query.slug;
  try {
    const topicData = await prisma.topic.findMany({
      where: {
        slug: slug,
      },
      take: 10,
      orderBy: {
        id: 'desc',
      },
    });
    if (topicData.length > 0) {
      res.status(200).json(topicData);
    } else {
      res.status(404).json({
        data: 'topic not found',
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
