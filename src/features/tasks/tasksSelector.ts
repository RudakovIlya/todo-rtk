import { DefaultTakType, TaskStatuses } from '../../app/types'

import { FilterValuesType } from '../todolists/todolist-reducer'

export const filteredTaskSelector = (tasks: DefaultTakType[], filter: FilterValuesType): DefaultTakType[] => {
  switch (filter) {
    case 'all': {
      return tasks
    }
    case 'active': {
      return tasks.filter((task) => task.status === TaskStatuses.New)
    }
    case 'completed': {
      return tasks.filter((task) => task.status === TaskStatuses.Completed)
    }
    default: {
      return tasks
    }
  }
}