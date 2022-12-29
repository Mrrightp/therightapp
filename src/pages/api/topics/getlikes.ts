import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type Data = {
  name: string;
  likes: any;
  topicLikes: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body;
  const topicLikes: any = await prisma.topiclike.findMany({
    where: {
      likedTopicId: data.topicId,
    },
  });
  res.send(topicLikes);
}
