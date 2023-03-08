import { ComponentMeta, ComponentStory } from '@storybook/react'
import Subscribe, { ISubscribe } from './Subscribe'
import { mockSubscribeProps } from './Subscribe.mocks'

export default {
  title: 'forms/Subscribe',
  component: Subscribe,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Subscribe>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Subscribe> = (args) => (
  <Subscribe {...args} />
)

export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockSubscribeProps.base,
} as ISubscribe
