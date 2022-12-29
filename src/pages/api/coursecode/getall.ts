import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allCourseCode = await prisma.courseCode.findMany();
  res.json({
    success: true,
    message: allCourseCode,
  });
}
