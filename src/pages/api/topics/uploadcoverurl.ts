import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { coverImageUrl, topicId } = req.body;
    const updateUrl = await prisma.topic.update({
      where: {
        id: topicId,
      },
      data: {
        coverImageUrl: coverImageUrl,
      },
    });
    res.json({
      success: true,
      message: 'updated successfully',
      body: updateUrl,
    });
  } catch (error: any) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
}
