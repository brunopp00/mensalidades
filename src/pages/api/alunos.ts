// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/src/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  if (method === 'POST') {
    const meses = await prisma.month.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        payments: {
          select: {
            id: true,
            month: true,
            monthId: true,
            student: true,
            studentId: true,
          },
        },
        name: true,
        id: true,
      },
    })

    return res.send(JSON.parse(JSON.stringify(meses)))
  }
}
