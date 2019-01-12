import { createContext } from 'react'

interface IAppContext {
  showLayout: boolean
  toggleShowLayout: () => void
}

export const AppContext = createContext<IAppContext>({
  showLayout: true,
  toggleShowLayout: () => {},
})
