import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const createCategories = await prisma.category.createMany({
      data: [
        { title: 'Events', slug: 'events', forAdmin: false },
        { title: 'Gossip', slug: 'gossip', forAdmin: false },
        { title: 'Story', slug: 'story', forAdmin: false },
        { title: 'Sugestion', slug: 'sugestion', forAdmin: false },
        { title: 'Just In', slug: 'news', forAdmin: true },
        { title: 'Announcement', slug: 'announcement', forAdmin: true },
        { title: 'Sponsored', slug: 'sponsored', forAdmin: true },
        { title: 'Weekly Bulletin', slug: 'weekly-bulletin', forAdmin: true },
      ],
    });

    const createFaculty = await prisma.faculty.createMany({
      data: [
        { name: 'Management Science', slug: 'management-science' },
        { name: 'Life Science', slug: 'life-science' },
        { name: 'Pharmaceutical Science', slug: 'pharmaceutical-science' },
        { name: 'Agriculture', slug: 'agriculture' },
        { name: 'Arts', slug: 'Arts' },
        { name: 'Physical Science', slug: 'physical-science' },
        { name: 'Education', slug: 'education' },
        {
          name: 'Communication & Information Science',
          slug: 'communication-information-science',
        },
        { name: 'Basic Medical Science', slug: 'basic-medical-science' },
        { name: 'Clinical Science', slug: 'clinical-science' },
        { name: 'Engineering', slug: 'engineering' },
        { name: 'Environmental Science', slug: 'environmental-science' },
        { name: 'Law', slug: 'Law' },
        { name: 'Veterinary Medicine', slug: 'veterinary-medicine' },
      ],
    });
    res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(200).json({ error });
  }
}
