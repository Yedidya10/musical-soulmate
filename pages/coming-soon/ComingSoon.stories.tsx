import { ComponentMeta, ComponentStory } from '@storybook/react'
import ComingSoon, { IComingSoon } from '.'
import { mockComingSoonProps } from './ComingSoon.mocks'

export default {
  title: 'pages/ComingSoon',
  component: ComingSoon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ComingSoon>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ComingSoon> = (args) => (
  <ComingSoon {...args} />
)

export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockComingSoonProps.base,
} as IComingSoon
