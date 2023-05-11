import { api } from '@/src/lib/axios'
import { Button } from '@design-system-brunopp00/react'
import { DialogContent, DialogTitle, Grid, MenuItem } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import React, { Dispatch, SetStateAction } from 'react'
import { Aluno } from '../listagem'

interface FormularioProps {
  alunoSelecionado: Aluno
  listagemAlunos: () => void
  setOpenDialogForm: Dispatch<SetStateAction<boolean>>
}

interface FormikProps {
  mes: string
  valor: number
}

export function Formulario({
  alunoSelecionado,
  listagemAlunos,
  setOpenDialogForm,
}: FormularioProps) {
  const initialValues = {
    mes: '',
    valor: 130,
  }

  async function salvarPagamento(values: FormikProps, resetForm: () => void) {
    console.log('AQUI')
    await api
      .post('/pagamentos', {
        alunosId: alunoSelecionado.id,
        valor: values.valor,
        mes: values.mes,
      })
      .then((res) => {
        if (res.status === 200) {
          listagemAlunos()
          resetForm()
          setOpenDialogForm(false)
        }
      })
  }

  return (
    <>
      <DialogTitle>Cadastro de Aluno</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            salvarPagamento(values, resetForm)
            setSubmitting(false)
          }}
        >
          {({ isSubmitting, submitForm }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    label="Mês"
                    component={TextField}
                    name="mes"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    select
                  >
                    <MenuItem value={'01'}>Janeiro</MenuItem>
                    <MenuItem value={'02'}>Fevereiro</MenuItem>
                    <MenuItem value={'03'}>Março</MenuItem>
                    <MenuItem value={'04'}>Abril</MenuItem>
                    <MenuItem value={'05'}>Maio</MenuItem>
                    <MenuItem value={'06'}>Junho</MenuItem>
                    <MenuItem value={'07'}>Julho</MenuItem>
                    <MenuItem value={'08'}>Agosto</MenuItem>
                    <MenuItem value={'09'}>Setembro</MenuItem>
                    <MenuItem value={'10'}>Outubro</MenuItem>
                    <MenuItem value={'11'}>Novembro</MenuItem>
                    <MenuItem value={'12'}>Dezembro</MenuItem>
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    label="Valor"
                    component={TextField}
                    name="valor"
                    type="number"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    style={{ width: '100%' }}
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Salvar Pagamento
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </>
  )
}
