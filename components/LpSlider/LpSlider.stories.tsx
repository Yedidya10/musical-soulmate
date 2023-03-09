import { ComponentMeta, ComponentStory } from '@storybook/react'
import LpSlider, { ILpSlider } from './LpSlider'
import { mockLpSliderProps } from './LpSlider.mocks'

export default {
  title: 'Sliders/LpSlider',
  component: LpSlider,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof LpSlider>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LpSlider> = (args) => (
  <LpSlider {...args} />
)

export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockLpSliderProps.base,
} as ILpSlider
