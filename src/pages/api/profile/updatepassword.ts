import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body;
  const { currentPassword, newPassword, confirmnewPassword, userId } = data;

  const getuser: any = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!compareSync(currentPassword, getuser.password)) {
    res.json({
      success: false,
      message: 'Incorrect password',
    });
  } else if (newPassword !== confirmnewPassword) {
    res.json({
      success: false,
      message: 'NewPassword do not March',
    });
  } else if(newPassword.length < 5){
     res.json({
       success: false,
       message: 'password is too weak',
     });
  }else {
    const salt = genSaltSync(10);
    const hashPassword = hashSync(newPassword, salt);
    try {
      const updatePassword = await prisma.user.update({
        where: {
          email: getuser.email,
        },
        data: {
          password: hashPassword,
        },
      });
      if (updatePassword) {
        res.json({
          success: true,
          message: 'Password has been updated',
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: 'Something Went Wrong, report messaage to an admin',
      });
    }
  }
}
