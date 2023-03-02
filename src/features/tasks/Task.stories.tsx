import { TaskPriorities, TaskStatuses } from '../../app/types'

import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { DecoratorStories } from '@stories/Decorators.stories'

import { Task } from './Task'


export default {
  title: 'Task',
  component: Task,
  decorators: [DecoratorStories],
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />

export const TaskIsDone = Template.bind({})

TaskIsDone.args = {
  task: {
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
}

export const TaskNotDone = Template.bind({})

TaskNotDone.args = {
  task: {
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
}