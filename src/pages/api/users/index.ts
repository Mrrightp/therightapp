// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let allUsers = await prisma.user.findMany();
    res.json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
