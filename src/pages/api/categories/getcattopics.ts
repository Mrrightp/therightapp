// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  try {
    const result = await prisma.topic.findMany({
      where: {
        authorId: data.catId,
      },
      include: {
        author: {
          select: {
            username: true,
            role: true,
            profileImgUrl: true,
            slug: true,
          },
        },
        Category: {
          select: {
            title: true,
            slug: true,
          },
        },
        likes: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
