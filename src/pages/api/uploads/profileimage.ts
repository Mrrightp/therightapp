import { NextApiRequest, NextApiResponse } from 'next';
import S3 from 'aws-sdk/clients/s3';
import dayjs from 'dayjs';
import { v4 } from 'uuid';
import prisma from '../../../utils/prisma';

const s3 = new S3({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    let { name, type, userId } = req.body;
    const year = dayjs().format('YYYY');
    const id = v4().substring(0, 6);
    const imgUrl = `${year}/${id}-${name}`;
    const fileParams = {
      Bucket: process.env.BUKETNAME,
      Key: `user/profileimage/${imgUrl}`,
      Expires: 600,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise('putObject', fileParams);
    console.log(url);
    res.status(200).json({ success: true, url: url, imgUrl: imgUrl });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb', // Set desired value here
    },
  },
};
