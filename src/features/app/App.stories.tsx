import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DecoratorStories } from '@stories/Decorators.stories'

import { App } from './App'


export default {
  title: 'App',
  component: App,
  decorators: [DecoratorStories],
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = () => <App />

export const Default = Template.bind({})