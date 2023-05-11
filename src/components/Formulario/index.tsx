import { api } from '@/src/lib/axios'
import { Button } from '@design-system-brunopp00/react'
import {
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Typography,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Aluno } from '../listagem'

interface FormularioProps {
  monthSelected: Aluno
  listagemAlunos: () => void
  setOpenDialogForm: Dispatch<SetStateAction<boolean>>
}

interface FormikProps {
  studentId: number
}

interface AutoCompleteProps {
  id: string
  name: string
}

export function Formulario({
  monthSelected,
  listagemAlunos,
  setOpenDialogForm,
}: FormularioProps) {
  const [autoCompleteAlunos, setAutoCompleteAlunos] = useState<
    AutoCompleteProps[]
  >([])

  const initialValues = {
    studentId: 0,
  }
  async function salvarPagamento(values: FormikProps, resetForm: () => void) {
    await api
      .post('/pagamentos', {
        studentId: values.studentId,
        monthId: monthSelected.id,
      })
      .then((res) => {
        if (res.status === 200) {
          listagemAlunos()
          resetForm()
          setOpenDialogForm(false)
        }
      })
  }

  const listaAutoComplete = useCallback(() => {
    api
      .post('/autocomplete', { monthAtual: monthSelected.name })
      .then((res) => {
        if (res.status === 200) {
          setAutoCompleteAlunos(res.data)
        }
      })
  }, [monthSelected.name])

  useEffect(() => {
    listaAutoComplete()
  }, [listaAutoComplete])

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
                {autoCompleteAlunos.length > 0 ? (
                  <>
                    <Grid item xs={12}>
                      <Field
                        label="Estudante"
                        component={TextField}
                        name="studentId"
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        select
                      >
                        {autoCompleteAlunos.map((aluno) => {
                          return (
                            <MenuItem key={aluno.id} value={aluno.id}>
                              {aluno.name}
                            </MenuItem>
                          )
                        })}
                      </Field>
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
                  </>
                ) : (
                  <Grid item xs={12}>
                    <Typography>Todas as pessoas pagaram esse mês.</Typography>
                  </Grid>
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </>
  )
}
