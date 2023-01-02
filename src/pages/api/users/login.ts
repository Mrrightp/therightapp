import type { NextApiRequest, NextApiResponse } from 'next';
import { compareSync } from 'bcrypt';
import prisma from '../../../utils/prisma';

type Data = {
  success: Number;
  message: string;
  userId?: number;
  email?: String;
  username?: string;
  slug?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;
  let results = await prisma.user.findMany({
    where: { email: body.email },
  });
  if (results.length === 0) {
    res.json({
      success: 0,
      message: 'email is not registered',
    });
  } else {
    const resultData: any = results[0];
    const result = compareSync(body.password, resultData.password);
    if (result) {
      resultData.password = undefined;
      //   const jsontoken = sign({ userData: resultData }, process.env.JWT_SECRET, {
      //     expiresIn: '1h',
      //   });
      console.log(resultData.email);

      //   setCookie('UNILORINFORUM_JWT', jsontoken, {
      //     req,
      //     res,
      //     httpOnly: true,
      //     maxAge: 60 * 60 * 24 * 90, //90 days
      //     path: '/',
      //     sameSite: 'strict',
      //   });
      const { id, slug, email, username } = resultData;
      const userId = id;
      return res.json({
        success: 1,
        message: 'logged in successfully',
        // token: jsontoken,
        userId,
      });
    } else {
      res.json({
        success: 0,
        message: 'password is not correct',
      });
    }
  }
}
