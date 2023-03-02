import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { tasksAPI } from '@app/api'
import { AxiosError, isAxiosError } from 'axios'
import { DefaultTakType, TaskType } from '@app/types'
import { TasksType } from '@features/tasks/tasks-reducer'
import { createTodolist, fetchTodos } from '@features/todolists/todo-slice'

interface FetchParams {
  todoListId: string,
  anyParam: string
}

export const fetchTasks = createAsyncThunk<{ tasks: DefaultTakType[], todoId: string }, string, {
  rejectValue: string
}>('@@tasks/fetch-tasks', async (todoId, { rejectWithValue }) => {
  try {
    const response = await tasksAPI.getTasks(todoId)
    const tasks = response.data.items
    return {
      tasks,
      todoId,
    }
  } catch (error) {
    const errors = error as
      | Error
      | AxiosError<{ message: string | null }>
    if (!isAxiosError(error)) {
      return rejectWithValue(error as string)
    } else {
      return rejectWithValue(errors.message)
    }
  } finally {
    console.log('finally')
  }
})

export const deleteTask = createAsyncThunk<FetchParams, FetchParams, {
  rejectValue: string
}>('@@tasks/delete-task', async ({ todoListId, anyParam: id }, { rejectWithValue }) => {
  try {
    await tasksAPI.deleteTask(todoListId, id)
    return { todoListId: todoListId, anyParam: id }
  } catch (error) {
    const errors = error as
      | Error
      | AxiosError<{ message: string | null }>
    if (!isAxiosError(error)) {
      return rejectWithValue(error as string)
    } else {
      return rejectWithValue(errors.message)
    }
  }
})

export const createTask = createAsyncThunk<{ item: TaskType }, FetchParams, {
  rejectValue: string
}>('@@tasks/create', async ({ todoListId, anyParam: title }, { rejectWithValue }) => {
  try {
    const response = await tasksAPI.createTask(todoListId, title)
    return response.data.data
  } catch (error) {
    const errors = error as
      | Error
      | AxiosError<{ message: string | null }>
    if (!isAxiosError(error)) {
      return rejectWithValue(error as string)
    } else {
      return rejectWithValue(errors.message)
    }
  }
})

export const tasksSlice = createSlice({
  name: '@@tasks',
  initialState: {} as TasksType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        action.payload.forEach(todo => {
          state[todo.id] = []
        })
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        const todoId = action.payload.id
        state[todoId] = []
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todoId] = action.payload.tasks
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.anyParam)
        if (index > -1) state[action.payload.todoListId].splice(index, 1)
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const todoId = action.payload.item.todoListId
        state[todoId].unshift({ ...action.payload.item, entityStatus: 'idle' })
      })
  },
})

export default tasksSlice.reducer


// import axios, { AxiosError } from 'axios'
// import { Dispatch } from 'redux'
//
// import { setAppError, setAppStatus } from 'app/appSlice'
//
// export const errorUtils = (e: Error | AxiosError<{ error: string }>, dispatch: Dispatch) => {
//   const err = e as Error | AxiosError<{ error: string }>
//
//   if (axios.isAxiosError(err)) {
//     const error = err.response?.data ? err.response.data.error : err.message
//
//     dispatch(setAppError(error))
//     console.log(error)
//   } else {
//     dispatch(setAppError(Native error ${err.message}))
//     console.log(err.message)
//   }
//   dispatch(setAppStatus('failed'))
// }