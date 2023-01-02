import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { shareCount, topicId } = req.body;
    const addShare = await prisma.topic.update({
      where: {
        id: topicId,
      },
      data: {
        shareCount: shareCount,
      },
    });
    res.json({
      message: 'successfull',
      success: true,
      body: addShare,
    });
  } catch (error) {
    console.log(error);
  }
}
