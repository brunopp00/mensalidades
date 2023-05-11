import { styled } from '@design-system-brunopp00/react'
import { Accordion } from '@mui/material'

export const Container = styled('div', {
  width: '100%',
  padding: '10px',
})

export const CardAluno = styled(Accordion, {
  marginTop: '10px',
  width: '100%',
  color: '$ignite500',
  backgroundColor: '$ignite500',
  borderRadius: '5px',
  padding: '10px',
  cursor: 'pointer',
})

export const Tabela = styled('table', {
  width: '100%',
  borderRadius: '10px',
  backgroundColor: '$ignite700',
  padding: '$2',
  textAlign: 'start',
  fontFamily: 'Roboto, sans-serif',

  thead: {
    color: '$white',
    fontSize: '1.5rem',
  },

  td: {
    borderBottom: '1px solid $white',
    padding: '8px',
    textAlign: 'left',
  },

  th: {
    padding: '8px',
    textAlign: 'left',
  },

  tbody: {
    color: '$gray100',
    border: '1px solid black',
  },
})
