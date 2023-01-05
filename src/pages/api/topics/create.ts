import type { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';
import prisma from '../../../utils/prisma';
const wordCount = (str: string) => {
  const wordArray = str.split(' ');
  return wordArray.filter((word) => word !== '').length;
};
// /pages/api/upload.js

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '12mb', // Set desired value here
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  console.log(body);
  const regex = /(<([^>]+)>)/gi;
  const title = body.title
    .replace(/<\/?p[^>]*>/g, '')
    .replace(regex, '')
    .replace(/^\xa0*([^\xa0])\xa0$/g, '')
    .replace(/\xA0/g, ' ')
    .replace(/&nbsp;/g, ' ');
  let topicSlug = slugify(title);
  if (wordCount(title) < 4 || title == null) {
    return res.json({
      success: false,
      message: 'title is too short, make it more discriptive ',
    });
  } else if (wordCount(body.topicContent) < 10) {
    return res.json({
      success: false,
      message: 'your content is too short, make it more discriptive ',
    });
  } else if (!body.categoryId) {
    return res.json({
      success: false,
      message: 'please select a category',
    });
  } else if (wordCount(body.metaDiscription) < 6 || title == null) {
    return res.json({
      success: false,
      message: 'Meta discription should be at least 6 words',
    });
  } else if (wordCount(body.metaDiscription) > 20 || title == null) {
    return res.json({
      success: false,
      message: 'Meta discription should not be more than 20 words',
    });
  }
  const getTopicSlugs = await prisma.topic.findUnique({
    where: {
      slug: topicSlug,
    },
  });
  if (getTopicSlugs) {
    res.json({
      success: false,
      message:
        'this title has already been used, you need to make your title unique',
    });
  } else {
    try {
      const createTopic = await prisma.topic.create({
        data: {
          title: title,
          content: body.topicContent,
          metaDiscription: body.metaDiscription,
          slug: topicSlug,
          Category: {
            connect: {
              id: body.categoryId,
            },
          },
          coverImageUrl: body.coverImageUrl,
          author: {
            connect: {
              id: body.userId,
            },
          },
        },
      });
      if (createTopic.id) {
        res.json({
          success: true,
          message: 'Topic created sucesfully',
          body: createTopic,
        });
      } else {
        res.json({
          success: 0,
          message: 'something went wrong',
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: error,
      });
    }
  }
}
