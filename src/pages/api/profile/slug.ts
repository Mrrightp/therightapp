import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body;
  const { slug, userId } = data;
  try {
    if (slug.length > 15) {
      res.json({
        success: false,
        message: 'Id is too long',
      });
    } else {
      const saveSlug = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          slug: slug,
        },
      });
      res.json({
        success: true,
        message: 'Your Id have been Updated',
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: 'Something Went Wrong, report messaage to an admin',
    });
  }
}
