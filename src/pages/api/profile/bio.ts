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
  const { bio, userId } = data;
  try {
    if (bio.length > 200) {
      res.json({
        success: false,
        message: 'bio is too long',
      });
    } else {
      const saveBio = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          bio: bio,
        },
      });
      res.json({
        success: true,
        message: 'Your Bio have been Updated',
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
