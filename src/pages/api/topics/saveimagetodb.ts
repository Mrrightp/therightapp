import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: any = req.body;

  //mad ppl
  const saveToDb = await prisma.topicUpload.create({
    data: {
      link: data.UploadUrl,
      name: data.name,
      size: data.size,
      topic: {
        connect: {
          id: data.topicId,
        },
      },
    },
  });

  if (saveToDb) {
    res.status(200).json({
      id: saveToDb.id,
      success: true,
      materialUrl: data.materialUrl,
      message: 'Updated succesfully',
    });
  } else {
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
}
