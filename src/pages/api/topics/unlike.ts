import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { likeId } = req.body;
    const deleteLike = await prisma.topiclike.delete({
      where: {
        id: likeId,
      },
    });

    if (deleteLike) {
      res.send({
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
