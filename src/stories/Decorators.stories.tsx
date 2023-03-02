import { TaskPriorities, TaskStatuses } from '../app/types'

import { Provider } from 'react-redux'
import { combineReducers, legacy_createStore } from 'redux'

import { tasksReducer } from '@features/tasks/tasks-reducer'
import { todoListReducer } from '@features/todolists/todolist-reducer'
import { RootStateType } from '@app/store'


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListReducer,
})

const initialGlobalState: RootStateType = {
  todos: {
    todos: [
      {
        id: 'todoListID1',
        title: 'What to learn',
        filter: 'active',
        order: 2,
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: 'todoListID2',
        title: 'What to buy',
        filter: 'active',
        order: 2,
        addedDate: '',
        entityStatus: 'idle',
      },
    ],
    status: 'idle',
    error: null,
  },
  tasks: {
    todoListID1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.Completed,
        startDate: '',
        priority: TaskPriorities.Hi,
        order: 2,
        description: '',
        deadline: '',
        addedDate: '',
        todoListId: 'todoListID1',
        entityStatus: 'idle',
      },
    ],
    todoListID2: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.Completed,
        startDate: '',
        priority: TaskPriorities.Hi,
        order: 2,
        description: '',
        deadline: '',
        addedDate: '',
        todoListId: 'todoListID2',
        entityStatus: 'idle',
      },
    ],
  },
  app: {
    status: 'idle',
    error: null,
    isInit: false,
  },
  login: {
    isLoggedIn: false,
  },
}

export const store = legacy_createStore(rootReducer, initialGlobalState as RootStateType)

export const DecoratorStories = (Story: any) => {
  return (
    <Provider store={store}>
      <Story />
    </Provider>
  )
}