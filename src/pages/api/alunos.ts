// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/src/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  username: string
  id: string
  created_at: string
  valor_ultimo_pagamento: string
  data_ultimo_pagamentos: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { method } = req

  console.log(req.body)
  if (method === 'POST') {
    const listaAlunos = await prisma.alunos.findMany({
      select: {
        pagamentos: true,
        name: true,
        id: true,
      },
    })

    console.log(listaAlunos)
    return res.send(JSON.parse(JSON.stringify(listaAlunos)))
  }
}
