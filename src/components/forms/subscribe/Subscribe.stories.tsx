import { Meta, StoryObj } from '@storybook/react'
import Subscribe, { ISubscribe } from './Subscribe'
import { mockSubscribeProps } from './Subscribe.mocks'

const meta: Meta<typeof Subscribe> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Forms/Subscribe',
  component: Subscribe,
  /* 👇 The argTypes prop is optional.
   * See https://storybook.js.org/docs/react/api/argtypes
   * to learn how to configure args for your stories
   * and https://storybook.js.org/docs/react/writing-stories/args
   * to learn how to use args in your stories
   * and https://storybook.js.org/docs/react/writing-stories/args#setting-args-through-the-url
   * to learn how to set args through the URL
  */
  argTypes: {},
};

export default meta;
