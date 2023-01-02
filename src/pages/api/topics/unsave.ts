import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { savedId } = req.body;
    const deleteLike = await prisma.savedTopics.delete({
      where: {
        id: savedId,
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
