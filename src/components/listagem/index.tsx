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
import { Plus, Trash } from 'phosphor-react'

moment.locale('pt-br')

export interface Student {
  id: number
  name: string
}

export interface Pagamentos {
  id: number
  month: []
  monthId: number
  student: Student
  studentId: number
}

export interface Aluno {
  id: string
  name: string
  payments: Pagamentos[]
}

export const Listagem = () => {
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false)
  const [listaAlunos, setListaAlunos] = useState<Aluno[]>([])
  const [monthSelected, setMonthSelected] = useState<Aluno>({
    id: '',
    name: '',
    payments: [],
  })

  const listagemAlunos = useCallback(() => {
    api.post<Aluno[]>('/alunos').then((res) => {
      if (res.status === 200) {
        setListaAlunos(res.data)
      }
    })
  }, [])

  const excluiAluno = (paymentId: number) => {
    api.post('/excluiPagamento', { paymentId }).then((res) => {
      if (res.status === 200) {
        listagemAlunos()
      }
    })
  }

  useEffect(() => {
    listagemAlunos()
  }, [listagemAlunos])

  useLayoutEffect(() => {
    window.requestAnimationFrame(() => {})
  }, [])

  return (
    <Container>
      <Box>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Heading>Meses</Heading>
        </div>
        {listaAlunos.map((month) => {
          return (
            <CardAluno
              key={month.id}
              style={{
                backgroundColor: '#1b8760',
              }}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Heading>{month.name}</Heading>
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
                      <Heading>Lista de pagamentos de {month.name}</Heading>
                      <IconButton
                        title="Adicionar novo pagamento"
                        onClick={() => {
                          setMonthSelected(month)
                          setOpenDialogForm(true)
                        }}
                      >
                        <Plus color="white" />
                      </IconButton>
                    </div>
                  </thead>
                  <tbody>
                    {month.payments.map((pagamento) => {
                      return (
                        <tr key={pagamento.id}>
                          <td>{pagamento.student?.name}</td>
                          <td>
                            <IconButton
                              onClick={() => excluiAluno(pagamento.id)}
                              title="Excluir pagamento"
                            >
                              <Trash color="white" />
                            </IconButton>
                          </td>
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
          monthSelected={monthSelected}
          listagemAlunos={listagemAlunos}
          setOpenDialogForm={setOpenDialogForm}
        />
      </Dialog>
    </Container>
  )
}
