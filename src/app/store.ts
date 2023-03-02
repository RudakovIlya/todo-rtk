import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appReducer } from '@features/app/app-reducer'
import { loginReducer } from '@features/login/login-reducer'
import todoListsReducer from '@features/todolists/todo-slice'
import tasksReducer from '@features/tasks/tasks-slice'

const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  tasks: tasksReducer,
  todos: todoListsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})


export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
