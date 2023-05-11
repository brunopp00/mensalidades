import { api } from '@/src/lib/axios'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { CardAluno, Container, Tabela } from './styles'
import moment from 'moment'
import 'moment/locale/pt-br'
import { Box, Heading } from '@design-system-brunopp00/react'
import {
  AccordionDetails,
  AccordionSummary,
  Dialog,
  IconButton,
} from '@mui/material'
import { Formulario } from '../Formulario'

moment.locale('pt-br')

export interface Pagamentos {
  id: number
  alunoId: string
  mes: string
  valor: number
  createAt: string
}

export interface Aluno {
  id: string
  name: string
  pagamentos: Pagamentos[]
}

export const Listagem = () => {
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false)
  const [listaAlunos, setListaAlunos] = useState<Aluno[]>([])
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno>({
    id: '',
    name: '',
    pagamentos: [],
  })

  const listagemAlunos = useCallback(() => {
    api.post<Aluno[]>('/alunos').then((res) => {
      if (res.status === 200) {
        setListaAlunos(res.data)
      }
    })
  }, [])

  useEffect(() => {
    listagemAlunos()
  }, [listagemAlunos])

  useLayoutEffect(() => {
    window.requestAnimationFrame(() => {})
  }, [])

  function formataMes(mes: string) {
    switch (mes) {
      case '01':
        return 'Janeiro'
      case '02':
        return 'Fevereiro'
      case '03':
        return 'Março'
      case '04':
        return 'Abril'
      case '05':
        return 'Maio'
      case '06':
        return 'Junho'
      case '07':
        return 'Julho'
      case '08':
        return 'Agosto'
      case '09':
        return 'Setembro'
      case '10':
        return 'Outubro'
      case '11':
        return 'Novembro'
      case '12':
        return 'Dezembro'
      default:
        break
    }
  }

  return (
    <Container>
      <Box>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Heading>Lista de Alunos</Heading>
        </div>
        {listaAlunos.map((aluno) => {
          return (
            <CardAluno
              key={aluno.id}
              style={{
                backgroundColor: '#1b8760',
              }}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Heading>{aluno.name}</Heading>
              </AccordionSummary>
              <AccordionDetails style={{ padding: '30px' }}>
                <Tabela>
                  <thead>
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Heading>Lista De Pagamentos | {aluno.name}</Heading>
                      <IconButton
                        onClick={() => {
                          setAlunoSelecionado(aluno)
                          setOpenDialogForm(true)
                        }}
                      >
                        <Heading>+</Heading>
                      </IconButton>
                    </div>
                    <tr>
                      <th style={{ borderRight: 'none' }}>Mês</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aluno.pagamentos.map((pagamento) => {
                      return (
                        <tr key={pagamento.id}>
                          <td style={{ borderRight: 'none' }}>
                            {formataMes(pagamento.mes)}
                          </td>
                          <td>R${pagamento.valor},00</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Tabela>
              </AccordionDetails>
            </CardAluno>
          )
        })}
      </Box>
      <Dialog
        open={openDialogForm}
        onClose={() => setOpenDialogForm(false)}
        maxWidth="md"
        fullWidth
      >
        <Formulario
          alunoSelecionado={alunoSelecionado}
          listagemAlunos={listagemAlunos}
          setOpenDialogForm={setOpenDialogForm}
        />
      </Dialog>
    </Container>
  )
}
