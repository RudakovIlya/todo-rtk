import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import { Navigate } from 'react-router-dom'

import { useLogin } from '@features/login/use-login'

import { CustomButton } from '@ui/button/CustomButton'
import { Paragraph } from '@ui/paragraph/Paragraph'


export const Form = () => {
  const { passwordError, emailError, register, onSubmit, isLoggedIn } = useLogin()

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={onSubmit}>
      <FormControl>
        <Box sx={{ marginTop: 2 }}>
          <Paragraph>
            To log in get registered
            <a rel='noreferrer' href={'https://social-network.samuraijs.com/'} target={'_blank'}>
              {' '}
              here
            </a>
          </Paragraph>
          <Paragraph>or use common test account credentials:</Paragraph>
          <Paragraph>
            <strong>Email: free@samuraijs.com</strong>
          </Paragraph>
          <Paragraph>
            <strong>Password: free</strong>
          </Paragraph>
        </Box>
        <FormGroup>
          <TextField {...register('email')} label='Email' margin='normal' />
          {passwordError && <Paragraph color={'#d50000'}>{emailError}</Paragraph>}
          <TextField {...register('password')} type='password' label='Password' margin='normal' />
          {passwordError && <Paragraph color={'#d50000'}>{passwordError}</Paragraph>}
          <FormControlLabel
            {...register('rememberMe')}
            label={'Remember me'}
            control={<Checkbox color='default' />}
          />
          <CustomButton type={'submit'} variant={'contained'}>
            Login
          </CustomButton>
        </FormGroup>
      </FormControl>
    </form>
  )
}