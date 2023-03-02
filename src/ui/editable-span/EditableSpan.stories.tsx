import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { EditableSpan } from './EditableSpan'


export default {
  title: 'EditableSpan',
  component: EditableSpan,
  argTypes: {
    title: {
      description: 'Title',
    },
    changeTitle: {
      description: 'Double-clicking on a title draws an input for entering a new title',
    },
  },
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />

export const Default = Template.bind({})

Default.args = {
  title: 'Title',
  changeTitle: action('Title was changed!'),
}