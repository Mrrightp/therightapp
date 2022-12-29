import type { NextApiRequest, NextApiResponse } from 'next';
import z from 'zod';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import slugify from 'slugify';

import prisma from '../../../utils/prisma';
type Data = {
  success: Number;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;
  console.log(body);
  //   res.send('error');
  const date = Date.now();
  const salt = genSaltSync(10)
  body.password = hashSync(body.password, salt);
  const password = body.password;
  try {
    const emailResult = await prisma.user.findMany({
      where: { email: body.email },
    });
    console.log('ffff', emailResult);
    if (emailResult.length >= 1) {
      res.send({
        success: 0,
        message: 'this email is already exist',
      });
    } else {
      const usernameResult = await prisma.user.findMany({
        where: { username: body.username },
      });
      if (usernameResult.length >= 1) {
        res.send({
          success: 0,
          message: 'this username is alread taken ',
        });
      } else {
        const { email, username, password } = req.body;
        const user = await prisma.user.create({
          data: {
            email: email,
            username: username,
            password: password,
            slug: slugify(username, { replacement: '_', strict:true, lower:true}),
          },
        });
        if (user) {
          res.status(200).json({
            success: 1,
            message: 'registration sucessfull, systerm will redirect you',
          });
        } else {
          res.status(200).json({
            success: 0,
            message: 'something went wrong',
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    // res.send(error);
  }
}
