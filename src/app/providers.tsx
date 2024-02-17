'use client'

import { UIProvider } from '@yamada-ui/react'
import { ReactNode } from 'react'

export const Providers = ({ children }: { children: ReactNode }) => {
  return <UIProvider>{children}</UIProvider>
}
