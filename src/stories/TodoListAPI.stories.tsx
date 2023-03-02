import { tasksAPI, todoListsAPI } from '../app/api'

import { useState } from 'react'

export default {
  title: 'API',
}

export const GetTodoLists = () => {
  const [state, setState] = useState<any>(null)

  const onClick = () => {
    todoListsAPI.getTodoLists().then((response) => setState(response))
  }
  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <button onClick={onClick}>get todos</button>
    </>
  )
}

export const CreateTodoList = () => {
  const [state, setState] = useState<any>(null)

  const onClick = () => {
    todoListsAPI.createTodoList(`I'M NEW TITLE!`).then((data) => setState(data))
  }

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <button onClick={onClick}>create todos</button>
    </>
  )
}

export const DeleteTodoList = () => {
  const [state, setState] = useState<any>(null)

  const onClick = () => {
    todoListsAPI.deleteTodoLists('33f9eae0-fdc2-4f26-9ec5-07848079dff6').then((data) => setState(data))
  }

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <button onClick={onClick}>delete todos</button>
    </>
  )
}

export const UpdateTodoListTitle = () => {
  const [state, setState] = useState<any>(null)

  const onClick = () => {
    todoListsAPI
      .updateTodoLists(`I'M UPDATE TITLE!!!`, 'f6ef176d-3397-4e81-ae70-6f39223827fd')
      .then((data) => setState(data))
  }

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <button onClick={onClick}>update todos</button>
    </>
  )
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)

  const onClick = () => {
    tasksAPI.getTasks('9b4816da-bc95-4c94-9e82-7b11eb78b7d0').then((response) => {
      setState(response.data.items)
    })
  }

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <button onClick={onClick}>get tasks</button>
    </>
  )
}

export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null)

  const onClick = () => {
    tasksAPI
      .deleteTask('9b4816da-bc95-4c94-9e82-7b11eb78b7d0', 'c4704cd2-3a23-4273-8ace-b92ca725f43c')
      .then((response) => {
        setState(response.data.data)
      })
  }

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <button onClick={onClick}>delete task</button>
    </>
  )
}

export const CreateTasks = () => {
  const [state, setState] = useState<any>(null)

  const onClick = () => {
    tasksAPI.createTask('9b4816da-bc95-4c94-9e82-7b11eb78b7d0', 'YO-YO-YO-YO!').then((response) => {
      setState(response.data.data)
    })
  }

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <button onClick={onClick}>create task</button>
    </>
  )
}

export const UpdateTasks = () => {
  const [state, setState] = useState<any>(null)

  const onClick = () => {
    tasksAPI
      .updateTask('9b4816da-bc95-4c94-9e82-7b11eb78b7d0', '68dc9cab-f749-4c02-8f67-cac842c3e64c', {
        title: 'New QWERTY Title',
        description: 'Описание',
        priority: 10,
        startDate: '',
        status: 2,
      })
      .then((response) => {
        setState(response.data.data)
      })
  }

  return (
    <>
      <b>{JSON.stringify(state)}</b>
      <button onClick={onClick}>update task</button>
    </>
  )
}