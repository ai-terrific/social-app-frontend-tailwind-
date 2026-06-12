import { toast } from 'react-toastify'

/**
 * Handles errors gracefully
 * @param error - The error thrown by Axios or other sources
 * @param defaultMessage - Default error message if no specific error message is available
 */
export const handleError = (err: unknown, defaultMessage?: string) => {
  const message = err instanceof Error ? err.message : defaultMessage || 'An unknown error occurred'
  const toastOptions = { hideProgressBar: true, toastId: message }

  if (!toast.isActive(message)) {
    toast.error(message, toastOptions)
  } else {
    toast.update(message, { ...toastOptions, render: message })
  }
}
