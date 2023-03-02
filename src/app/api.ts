import axios, { AxiosResponse } from 'axios'

import { ITodoListDomain } from '@features/todolists/todolist-reducer'

import {
  IAuthResponse,
  IGetTasksResponse,
  ILoginData,
  ITodoList,
  ResponseType,
  TaskType,
  UpdateTaskType,
} from './types'


const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '367cf08c-f571-4561-8d65-4e880879ca88',
  },
})

export const todoListsAPI = {
  getTodoLists: () => {
    return instance.get<ITodoListDomain[]>('todo-lists')
  },
  createTodoList: (title: string) => {
    return instance.post<ResponseType<{ item: ITodoList }>>('todo-lists', { title: title })
  },
  updateTodoLists(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, { title: title })
  },
  deleteTodoLists(todoId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoId}`)
  },
}

export const tasksAPI = {
  getTasks: (todoListsID: string) => {
    return instance.get<IGetTasksResponse>(`todo-lists/${todoListsID}/tasks`)
  },
  deleteTask: (todoListsID: string, taskID: string) => {
    return instance.delete<ResponseType>(`todo-lists/${todoListsID}/tasks/${taskID}`)
  },
  createTask: (todoListsID: string, title: string) => {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListsID}/tasks`, { title })
  },
  updateTask: (todoListsID: string, taskID: string, data: Partial<UpdateTaskType>) => {
    return instance.put<UpdateTaskType, AxiosResponse<ResponseType<{ item: TaskType }>>>(
      `todo-lists/${todoListsID}/tasks/${taskID}`,
      data,
    )
  },
}

export const authMeAPI = {
  authMe: () => {
    return instance.get<ResponseType<IAuthResponse>>(`auth/me`)
  },
  login: (data: ILoginData) => {
    return instance.post<ResponseType<{ userId: number }>>(`auth/login`, data)
  },
  logout: () => {
    return instance.delete<ResponseType>(`auth/login`)
  },
}