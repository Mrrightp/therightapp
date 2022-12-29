import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type Data = {
  success: boolean;
  message: string;
  imgUrl?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body;
  const { imgUrl, userId } = data;

  const setProfileLink = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      profileImgUrl: imgUrl,
    },
  });
  if (setProfileLink) {
    res
      .status(200)
      .json({ success: true, imgUrl: imgUrl, message: 'Updated succesfully' });
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
}
