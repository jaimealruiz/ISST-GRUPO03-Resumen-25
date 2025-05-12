// src/context/index.tsx

import React, { ReactNode } from 'react'
import { AuthProvider } from './AuthContext'
import { SubscriptionProvider } from './SubscriptionContext'
import { DocumentProvider } from './DocumentContext'
import { HistorialProvider } from './HistorialContext'
import { RatingProvider } from './RatingContext'
import { WriterProvider } from './WriterContext'
import { UIProvider } from './UIContext'

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <DocumentProvider>
          <HistorialProvider>
            <RatingProvider>
              <WriterProvider>
                <UIProvider>
                  {children}
                </UIProvider>
              </WriterProvider>
            </RatingProvider>
          </HistorialProvider>
        </DocumentProvider>
      </SubscriptionProvider>
    </AuthProvider>
  )
}

// En App.tsx (o main.tsx) se usa así:
// <AppContextProvider>
//   <AppRoutes />
// </AppContextProvider>
