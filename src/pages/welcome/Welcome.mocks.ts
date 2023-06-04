import { IWelcome } from '.'

const base: IWelcome = {
  providers: [
    {
      name: 'sampleName',
      id: 'sampleId',
    },
  ],
}

export const mockWelcomeProps = {
  base,
}
