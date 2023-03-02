import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddItemForm } from './AddItemForm'


export default {
  title: 'AddItemForm',
  component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />

export const Default = Template.bind({})

Default.args = {
  addItem: action('Button inside form clicked'),
}