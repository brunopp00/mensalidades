import { prisma } from '@/src/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  if (method === 'POST') {
    await prisma.payment.delete({
      where: {
        id: req.body.paymentId,
      },
    })

    return res.send(200)
  }
}
