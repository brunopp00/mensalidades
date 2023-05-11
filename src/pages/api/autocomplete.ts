// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/src/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  if (method === 'POST') {
    const payments = await prisma.payment.findMany({
      where: {
        month: {
          name: req.body.monthAtual,
        },
      },
      include: {
        student: true,
      },
    })

    const studentsWithoutPayment = await prisma.student.findMany({
      where: {
        NOT: {
          id: {
            in: payments.map((payment) => payment.studentId),
          },
        },
      },
    })

    return res.send(JSON.parse(JSON.stringify(studentsWithoutPayment)))
  }
}
