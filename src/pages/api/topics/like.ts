import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { topic_id, likesCount, userId } = req.body;
    const findLike: any = await prisma.topiclike.findMany({
      where: {
        likedTopicId: topic_id,
        likeUserId: userId,
      },
    });
    console.log(findLike, 'findLike');
    if (findLike.length > 0) {
      res.send({
        success: false,
        message: 'user already liked this topic',
        body: { likeId: findLike[0].id, hasLiked: true },
      });
    } else {
      const createLike = await prisma.topiclike.create({
        data: {
          userId: {
            connect: {
              id: userId,
            },
          },
          topicId: {
            connect: {
              id: topic_id,
            },
          },
        },
      });
      console.log(createLike, 'gggggg');
      if (createLike) {
        res.send({
          success: true,
          likeId: createLike.id,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
