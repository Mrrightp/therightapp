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
  const { whatsapp, userId } = data;
  try {
    if (whatsapp.length !== 11) {
      res.json({
        success: false,
        message: 'whatsapp number should be 11 digit',
      });
    } else {
      const savewhatsapp = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          whatsApp: whatsapp,
        },
      });
      res.json({
        success: true,
        message: 'Your whatsapp have been Updated',
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
