import { tasksAPI } from '@app/api'
import { APIResultCodes, DefaultTakType, TStatusType, UpdateTaskType } from '@app/types'

import { errorAPIHandler, handleServerNetworkError } from '@utils/error-handler'
import { createTodoListAC, deleteTodoListAC, setTodoListsAC } from '../todolists/todolist-reducer'
import { Dispatch } from 'redux'
import { RootStateType } from '@app/store'


export type TasksType = {
  [key: string]: DefaultTakType[]
}

export const tasksReducer = (state: TasksType = {}, action: TasksActionsType): TasksType => {
  switch (action.type) {
    case 'TASKS/REMOVE-TASK': {
      return {
        ...state,
        [action.payload.todoListID]: state[action.payload.todoListID].filter(
          (stateItem) => stateItem.id !== action.payload.taskID,
        ),
      }
    }
    case 'TASKS/ADD-TASK': {
      return {
        ...state,
        [action.payload.todoListID]: [action.payload.task, ...state[action.payload.todoListID]],
      }
    }
    case 'TASKS/SET_TASKS': {
      return {
        ...state,
        [action.payload.todoListID]: action.payload.tasks.map((stateItem) => ({
          ...stateItem,
          entityStatus: 'idle',
        })),
      }
    }
    case 'TASKS/UPDATE_TASK': {
      return {
        ...state,
        [action.payload.todoListsID]: state[action.payload.todoListsID].map((stateItem) =>
          stateItem.id === action.payload.taskID ? { ...stateItem, ...action.payload.model } : stateItem,
        ),
      }
    }
    case 'TASKS/CHANGE-ENTITY-STATUS': {
      return {
        ...state,
        [action.payload.todoListsID]: state[action.payload.todoListsID].map((stateItem) =>
          stateItem.id === action.payload.taskID
            ? {
              ...stateItem,
              entityStatus: action.payload.status,
            }
            : stateItem,
        ),
      }
    }
    case 'TODOLISTS/ADD-TODOLIST': {
      return {
        ...state,
        [action.payload.todoList.id]: [],
      }
    }
    case 'TODOLISTS/REMOVE-TODOLIST': {
      const copy = { ...state }
      delete copy[action.payload.todoListID]
      return copy
    }
    case 'TODOLISTS/SET_TODOLISTS': {
      return action.payload.reduce(
        (accum, item) => {
          accum[item.id] = []
          return accum
        },
        { ...state },
      )
    }
    default:
      return state
  }
}

export type TasksActionsType =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTodoListsAC>
  | ReturnType<typeof deleteTodoListAC>
  | ReturnType<typeof createTodoListAC>
  | ReturnType<typeof changeEntityStatusAC>

export const addTaskAC = (todoListID: string, task: DefaultTakType) =>
  ({
    type: 'TASKS/ADD-TASK',
    payload: {
      todoListID,
      task,
    },
  } as const)
export const setTasksAC = (todoListID: string, tasks: DefaultTakType[]) =>
  ({
    type: 'TASKS/SET_TASKS',
    payload: {
      todoListID,
      tasks,
    },
  } as const)
export const removeTaskAC = (todoListID: string, taskID: string) =>
  ({
    type: 'TASKS/REMOVE-TASK',
    payload: {
      todoListID,
      taskID,
    },
  } as const)
export const updateTaskAC = (todoListsID: string, taskID: string, model: Partial<UpdateTaskType>) =>
  ({
    type: 'TASKS/UPDATE_TASK',
    payload: {
      todoListsID,
      taskID,
      model,
    },
  } as const)
export const changeEntityStatusAC = (todoListsID: string, taskID: string, status: TStatusType) =>
  ({
    type: 'TASKS/CHANGE-ENTITY-STATUS',
    payload: {
      todoListsID,
      taskID,
      status,
    },
  } as const)
// Thunks

// export const fetchTasks =
//   (todoListID: string) =>
//     async (dispatch: Dispatch) => {
//       try {
//         const response = await tasksAPI.getTasks(todoListID)
//         dispatch(setTasksAC(todoListID, response.data.items))
//       } catch (error) {
//         handleServerNetworkError(error, dispatch)
//       } finally {
//         dispatch(setAppStatusAC('idle'))
//       }
//     }

export const deleteTaskThunk =
  (todoListsID: string, taskID: string) =>
    async (dispatch: Dispatch) => {
      dispatch(changeEntityStatusAC(todoListsID, taskID, 'loading'))
      try {
        const response = await tasksAPI.deleteTask(todoListsID, taskID)
        if (response.data.resultCode === APIResultCodes.SUCCEEDED) {
          dispatch(changeEntityStatusAC(todoListsID, taskID, 'succeeded'))
          dispatch(removeTaskAC(todoListsID, taskID))
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handleServerNetworkError(error, dispatch)
      }
    }

export const createTaskThunk =
  (todoListsID: string, title: string) =>
    async (dispatch: Dispatch) => {
      try {
        const response = await tasksAPI.createTask(todoListsID, title)
        if (response.data.resultCode === APIResultCodes.SUCCEEDED) {
          dispatch(
            addTaskAC(todoListsID, {
              ...response.data.data.item,
              entityStatus: 'idle',
            }),
          )
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handleServerNetworkError(error, dispatch)
      }
    }

export const updateTaskThunk =
  (todoListsID: string, taskID: string, model: Partial<UpdateTaskType>) =>
    async (dispatch: Dispatch, getState: RootStateType) => {
      dispatch(changeEntityStatusAC(todoListsID, taskID, 'loading'))
      try {
        const task = getState.tasks[todoListsID].find((task) => task.id === taskID)
        const response = await tasksAPI.updateTask(todoListsID, taskID, { ...task, ...model })
        if (response.data.resultCode === APIResultCodes.SUCCEEDED) {
          dispatch(changeEntityStatusAC(todoListsID, taskID, 'succeeded'))
          dispatch(updateTaskAC(todoListsID, taskID, model))
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handleServerNetworkError(error, dispatch)
      }
    }