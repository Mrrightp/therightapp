import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  try {
    const updateStaus = await prisma.topic.update({
      where: {
        id: data.topicId,
      },
      data: {
        status: data.status,
      },
    });
    res.json(updateStaus);
  } catch (error) {
    console.log(error);
  }
}
