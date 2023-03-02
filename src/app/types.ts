import { AllAppActionsType } from '@features/app/app-reducer'
import { AllLoginTypes } from '@features/login/login-reducer'
import { TasksActionsType } from '@features/tasks/tasks-reducer'
import { TodoActionsType } from '@features/todolists/todolist-reducer'


export interface ITodoList {
  id: string
  title: string
  addedDate: string
  order: number
}

export type ResponseType<T = {}> = {
  resultCode: number
  messages: string[]
  data: T
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TaskType = {
  id: string
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  todoListId: string
  order: number
  addedDate: string
}

export interface DefaultTakType extends TaskType {
  entityStatus: TStatusType
}

export type UpdateTaskType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}

export type IGetTasksResponse = {
  items: DefaultTakType[]
  totalCount: 0 | 1
  error: null | string
}

export interface IAuthResponse {
  id: number
  email: string
  login: string
}

export interface ILoginData {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: boolean
}

export type TStatusType =
  | 'idle'
  | 'loading'
  | 'succeeded'
  | 'failed'
  | 'content-loading'
  | 'content-succeeded'

export enum APIResultCodes {
  SUCCEEDED,
  FAILED,
  CAPTCHA = 10,
}

export type AllActionsType = TasksActionsType | TodoActionsType | AllAppActionsType | AllLoginTypes