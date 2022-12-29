import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = req.body;
    const savedTopic = await prisma.savedTopics.create({
      data: {
        SavedTopicId: data.topicId,
        SavedUserId: data.userId,
      },
    });
    res.json({
      success: true,
      message: 'saved sucessfully',
      body: savedTopic,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: 'not saved',
      body: null,
    });
  }
}
