import { todoListsAPI } from '@app/api'
import { APIResultCodes, ITodoList, TStatusType } from '@app/types'

import { errorAPIHandler, handleServerNetworkError } from '@utils/error-handler'


import { Dispatch } from 'redux'


export type FilterValuesType = 'all' | 'active' | 'completed'

export type ITodoListDomain = ITodoList & {
  filter: FilterValuesType
  entityStatus: TStatusType
}

export const todoListReducer = (
  state: ITodoListDomain[] = [],
  action: TodoActionsType,
): ITodoListDomain[] => {
  switch (action.type) {
    case 'TODOLISTS/SET_TODOLISTS': {
      return action.payload.map((item) => {
        return {
          ...item,
          filter: 'all',
          entityStatus: 'idle',
        }
      })
    }
    case 'TODOLISTS/ADD-TODOLIST': {
      return [{ ...action.payload.todoList, filter: 'all', entityStatus: 'idle' }, ...state]
    }
    case 'TODOLISTS/REMOVE-TODOLIST': {
      return state.filter((stateItem) => stateItem.id !== action.payload.todoListID)
    }
    case 'TODOLISTS/CHANGE-TODOLIST-TITLE': {
      return state.map((stateItem) =>
        stateItem.id === action.payload.todoListID
          ? {
            ...stateItem,
            title: action.payload.newTitle,
          }
          : stateItem,
      )
    }
    case 'TODOLISTS/CHANGE-TODOLIST-FILTER': {
      return state.map((stateItem) =>
        stateItem.id === action.payload.todoListID
          ? {
            ...stateItem,
            filter: action.payload.filter,
          }
          : stateItem,
      )
    }
    case 'TODOLISTS/CHANGE_TODOLIST_STATUS': {
      return state.map((stateItem) =>
        stateItem.id === action.payload.todoListId
          ? { ...stateItem, entityStatus: action.payload.status }
          : stateItem,
      )
    }
    default: {
      return state
    }
  }
}

export type TodoActionsType =
  | ReturnType<typeof setTodoListsAC>
  | ReturnType<typeof deleteTodoListAC>
  | ReturnType<typeof createTodoListAC>
  | ReturnType<typeof updateTodoListAC>
  | ReturnType<typeof changeEntityStatusAC>
  | ReturnType<typeof changeTodoListFilterAC>

export const setTodoListsAC = (todoLists: ITodoListDomain[]) =>
  ({
    type: 'TODOLISTS/SET_TODOLISTS',
    payload: todoLists,
  } as const)
export const deleteTodoListAC = (todoListID: string) => {
  return {
    type: 'TODOLISTS/REMOVE-TODOLIST',
    payload: {
      todoListID,
    },
  } as const
}
export const createTodoListAC = (todoList: ITodoList) => {
  return {
    type: 'TODOLISTS/ADD-TODOLIST',
    payload: {
      todoList,
    },
  } as const
}
export const updateTodoListAC = (todoListID: string, newTitle: string) => {
  return {
    type: 'TODOLISTS/CHANGE-TODOLIST-TITLE',
    payload: {
      todoListID,
      newTitle,
    },
  } as const
}
export const changeTodoListFilterAC = (todoListID: string, filter: FilterValuesType) => {
  return {
    type: 'TODOLISTS/CHANGE-TODOLIST-FILTER',
    payload: {
      todoListID,
      filter,
    },
  } as const
}
export const changeEntityStatusAC = (todoListId: string, status: TStatusType) =>
  ({
    type: 'TODOLISTS/CHANGE_TODOLIST_STATUS',
    payload: {
      todoListId,
      status,
    },
  } as const)

// Thunks

// export const fetchTodoLists = () => async (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC('loading'))
//   try {
//     const response = await todoListsAPI.getTodoLists()
//     dispatch(setAppStatusAC('succeeded'))
//     dispatch(setTodoListsAC(response.data))
//   } catch (error) {
//     handleServerNetworkError(error, dispatch)
//   }
// }

// export const createTodolistThunk =
//   (title: string) =>
//     async (dispatch: Dispatch) => {
//       dispatch(setAppStatusAC('content-loading'))
//       try {
//         const response = await todoListsAPI.createTodoList(title)
//         if (response.data.resultCode === APIResultCodes.SUCCEEDED) {
//           dispatch(setAppStatusAC('content-succeeded'))
//           dispatch(createTodoListAC(response.data.data.item))
//         } else {
//           errorAPIHandler(response.data, dispatch)
//         }
//       } catch (error) {
//         handleServerNetworkError(error, dispatch)
//       }
//     }

// export const deleteTodoListThunk =
//   (todoListID: string) =>
//     async (dispatch: Dispatch) => {
//       dispatch(changeEntityStatusAC(todoListID, 'loading'))
//       dispatch(setAppStatusAC('content-loading'))
//       try {
//         const response = await todoListsAPI.deleteTodoLists(todoListID)
//         if (response.data.resultCode === APIResultCodes.SUCCEEDED) {
//           dispatch(setAppStatusAC('content-succeeded'))
//           dispatch(changeEntityStatusAC(todoListID, 'succeeded'))
//           dispatch(deleteTodoListAC(todoListID))
//         } else {
//           errorAPIHandler(response.data, dispatch)
//         }
//       } catch (error) {
//         handleServerNetworkError(error, dispatch)
//       } finally {
//         dispatch(changeEntityStatusAC(todoListID, 'idle'))
//       }
//     }

export const updateTodoListThunk =
  (todoListID: string, title: string) =>
    async (dispatch: Dispatch) => {
      dispatch(changeEntityStatusAC(todoListID, 'loading'))
      try {
        const response = await todoListsAPI.updateTodoLists(todoListID, title)
        if (response.data.resultCode === APIResultCodes.SUCCEEDED) {
          dispatch(changeEntityStatusAC(todoListID, 'succeeded'))
          dispatch(updateTodoListAC(todoListID, title))
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handleServerNetworkError(error, dispatch)
      } finally {
        dispatch(changeEntityStatusAC(todoListID, 'idle'))
      }
    }