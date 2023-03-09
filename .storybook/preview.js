import * as NextImage from 'next/image'
import '../styles/globals.scss'
import { BREAKPOINTS } from '../lib/storybook'

const customViewports = Object.fromEntries(
  Object.entries(BREAKPOINTS).map(([key, val]) => {
    return [key, val]
  })
)

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports },
  layout: 'fullscreen',
}
