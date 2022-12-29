import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { materialId } = req.body;
  console.log(materialId, 'materialId ');
  try {
    const deleteMaterial = await prisma.material.delete({
      where: {
        id: materialId,
      },
    });
    console.log(deleteMaterial);
    res.json({
      success: true,
      message: 'deleted succesfully',
      body: deleteMaterial,
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}
