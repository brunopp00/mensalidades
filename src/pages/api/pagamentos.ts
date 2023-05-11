// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/src/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  if (method === 'POST') {
    await prisma.pagamento.create({
      data: {
        valor: req.body.valor,
        mes: req.body.mes,
        alunosId: req.body.alunosId,
      },
    })

    return res.send(200)
  }
}
