import { useContext } from 'react'

import { SocketContext, SocketContextType } from '@/contexts/SocketProvider'

// Hook to use the Socket context
export const useSocket = (): SocketContextType => useContext(SocketContext)
