import { Navigate, Route, Routes } from 'react-router-dom'

import { ErrorPage } from '@components/404'

import { Login } from '@features/login/Login'
import { TodoListPage } from '@features/todolists/TodoListPage'

import { RequiredAuth } from '../hoc/RequiredAuth'


const MainRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<RequiredAuth children={<TodoListPage />} />} />
      <Route path={'/login'} element={<Login />} />

      <Route path={'/404'} element={<ErrorPage />} />
      <Route path={'*'} element={<Navigate to={'/404'} />} />
    </Routes>
  )
}

export default MainRoutes