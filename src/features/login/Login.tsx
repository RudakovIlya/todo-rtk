import Grid from '@mui/material/Grid'

import { Form } from '@features/login/Form'

export const Login = () => {
  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <Form />
      </Grid>
    </Grid>
  )
}