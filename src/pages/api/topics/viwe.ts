import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { viwesCount, topicId } = req.body;
    console.log(req.body);
    const addViwe = await prisma.topic.update({
      where: {
        id: topicId,
      },
      data: {
        viwes: viwesCount,
      },
    });
    console.log(addViwe);
    res.json({
      message: 'successfull',
      success: true,
      body: addViwe,
    });
  } catch (error) {
    console.log(error);
  }
}
