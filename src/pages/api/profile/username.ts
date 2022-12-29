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
  const { username, userId, email } = data;
  console.log(userId);
  try {
    if (username.length > 15) {
      res.json({
        success: false,
        message: 'username is too long',
      });
    } else {
      const saveUsername = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          username: username,
        },
      });
      res.json({
        success: true,
        message: 'Your username have been Updated',
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
