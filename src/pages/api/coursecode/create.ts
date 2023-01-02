import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';
import slugify from 'slugify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  const slug = slugify(data.name, {
    replacement: '_',
    strict: true,
    lower: true,
  });
  const currentCourseCode = await prisma.courseCode.findMany({
    where: {
      name: data.name,
      slug: slug,
    },
  });
  if (currentCourseCode.length > 0) {
    res.json({
      message: 'already exsit',
      success: false,
    });
  } else {
    const newCourseCode = await prisma.courseCode.create({
      data: {
        name: data.name,
        slug: slug,
      },
    });
    res.json({
      message: newCourseCode,
      success: true,
    });
  }
}
