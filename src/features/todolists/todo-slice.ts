import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todoListsAPI } from '@app/api'
import { AxiosError, isAxiosError } from 'axios'
import { ITodoList, TStatusType } from '@app/types'
import { isFulfilled, isPending, isRejected } from '@utils/is-error'

export type FilterValuesType = 'all' | 'active' | 'completed'

export type ITodoListDomain = ITodoList & {
  filter: FilterValuesType
  entityStatus: TStatusType
}

export interface ITodoLists {
  error: null | string
  status: TStatusType
  todos: ITodoListDomain[]
}

export const fetchTodos = createAsyncThunk<ITodoListDomain[], void, {
  rejectValue: string
}>('@@todo/fetch-todos', async (_, { rejectWithValue }) => {
  try {
    const response = await todoListsAPI.getTodoLists()
    return response.data
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
export const createTodolist = createAsyncThunk<ITodoList, string, {
  rejectValue: string
}>('@@todo/create-todo', async (title, { rejectWithValue }) => {
  try {
    const response = await todoListsAPI.createTodoList(title)
    return response.data.data.item
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
export const deleteTodolist = createAsyncThunk<string, string, {
  rejectValue: string
}>('@@todo/delete-todo', async (id, { rejectWithValue }) => {
  try {
    await todoListsAPI.deleteTodoLists(id)
    return id
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
export const updateTodolist = createAsyncThunk<{ id: string, title: string }, { id: string, title: string }, {
  rejectValue: string
}>(
  '@@todo/update-todo',
  async (args, { rejectWithValue }) => {
    try {
      await todoListsAPI.updateTodoLists(args.id, args.title)
      return args
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
  },
)

const initialState: ITodoLists = {
  todos: [],
  error: null,
  status: 'idle',
}

export const todoSlice = createSlice({
  name: '@@todos',
  initialState: initialState,
  reducers: {
    changeTodoListFilter: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
      state.todos.forEach(item => {
        if (item.id === action.payload.id) item.filter = action.payload.filter
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.todos = action.payload.map((item) => {
          return {
            ...item,
            filter: 'all',
            entityStatus: 'idle',
          }
        })
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        state.todos.unshift({ ...action.payload, filter: 'all', entityStatus: 'idle' })
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload)
        index !== -1 && state.todos.splice(index, 1)
      })
      .addCase(updateTodolist.fulfilled, (state, action) => {
        state.todos.forEach(todo => {
          if (todo.id === action.payload.id) todo.title = action.payload.title
        })
      })
      .addMatcher(isPending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'content-succeeded'
        state.error = null
      })
      .addMatcher(isRejected, (state, action: PayloadAction<string>) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { changeTodoListFilter } = todoSlice.actions
export default todoSlice.reducer

