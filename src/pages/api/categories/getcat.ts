import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const getAllUserCat = await prisma.category.findMany({});
  res.status(200).json(getAllUserCat);
}
