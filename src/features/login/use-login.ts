import { ILoginData } from '../../app/types'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useAuth } from '@features/login/use-auth'


const schema = yup
  .object({
    email: yup.string().email('Email must be a valid!').required('Required'),
    password: yup.string().required('Required').min(4, 'Must be 4 characters or less!'),
    rememberMe: yup.boolean().optional(),
  })
  .required()

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginData>({
    resolver: yupResolver(schema),
  })
  const { onSubmit: submit, isLoggedIn } = useAuth()

  const onSubmit = (data: ILoginData) => {
    submit(data)
    reset()
  }

  const emailError = errors.email ? errors.email.message : null
  const passwordError = errors.password ? errors.password.message : null

  return {
    emailError,
    passwordError,
    register,
    isLoggedIn,
    onSubmit: handleSubmit(onSubmit),
  }
}