import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await prisma.user.update({
    where: {
      id: req.body.userId,
    },
    data: {
      role: {
        set: 'CLASS_REP',
      },
    },
  });

  res.send('all done');
}
