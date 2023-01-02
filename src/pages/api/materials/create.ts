import type { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';
import prisma from '../../../utils/prisma';
const wordCount = (str: string) => {
  const wordArray = str.split(' ');
  return wordArray.filter((word) => word !== '').length;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  const title = body.title;
  let topicSlug = slugify(body.title, {
    replacement: '-',
    strict: true,
    lower: true,
  });
  if (wordCount(title) < 4) {
    return res.json({
      success: false,
      message: 'title is too short, make it more discriptive ',
    });
  } else if (wordCount(body.description) < 10) {
    return res.json({
      success: 0,
      message: 'your description is too short, make it more discriptive ',
    });
  } else {
    const getTopicSlugs = await prisma.material.findUnique({
      where: {
        slug: topicSlug,
      },
    });

    if (getTopicSlugs) {
      res.json({
        success: 0,
        message:
          'this title has already been used, you need to make your title unique',
      });
    } else if (body.courseCode == null || undefined) {
      res.json({
        success: 0,
        message: 'Pls Select the Course Code',
      });
    } else {
      try {
        const createTopic = await prisma.material.create({
          data: {
            title: title,
            description: body.description,
            slug: topicSlug,
            courseCode: {
              connect: {
                id: body.courseCode,
              },
            },
            author: {
              connect: {
                id: body.userId,
              },
            },
          },
        });
        if (createTopic.id) {
          res.json({
            success: 1,
            message: 'Topic created sucesfully',
            body: createTopic,
          });
        } else {
          res.json({
            success: 0,
            message: 'something went wrong',
          });
        }
      } catch (error: any) {
        console.log(error.message);
        res.json({
          success: 0,
          message: error.message,
        });
      }
    }
  }
}
