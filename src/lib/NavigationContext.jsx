import React, { createContext, useContext } from 'react'

// Lets any deeply-nested component (e.g. a study-plan task) switch the
// active sidebar tab, without prop-drilling through every page.
const NavigationContext = createContext(null)

export function NavigationProvider({ active, setActive, children }) {
  return <NavigationContext.Provider value={{ active, setActive }}>{children}</NavigationContext.Provider>
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error('useNavigation must be used within a NavigationProvider')
  return ctx
}
