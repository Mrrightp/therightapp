import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body;
  const { userId } = data;

  const getUserInfo = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      topics: true,
      followedBy: true,
      following: true,
      department: true,
      faculty: true,
      materials: true,
      likedMaterials: true,
      likedTopics: true,
    },
  });
  res.json({
    getUserInfo,
  });
}
