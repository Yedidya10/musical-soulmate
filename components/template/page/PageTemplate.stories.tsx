import { ComponentMeta, ComponentStory } from '@storybook/react'
import PageTemplate, { IPageTemplate } from '.'
import { mockPageTemplateProps } from './PageTemplate.mocks'

export default {
  title: 'pages/Page',
  component: PageTemplate,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof PageTemplate>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PageTemplate> = (args) => (
  <PageTemplate {...args} />
)

export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockPageTemplateProps.base,
} as IPageTemplate
