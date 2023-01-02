import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: any = req.body;
  const saveToDb = await prisma.upload.create({
    data: {
      link: data.UploadUrl,
      name: data.name,
      size: data.size,
      material: {
        connect: {
          id: data.materialId,
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
