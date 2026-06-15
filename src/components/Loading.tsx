import { memo } from 'react'

const LoadingFallback = memo(() => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='relative'>
        <div className='flex-col gap-4 w-full flex items-center justify-center'>
          <div className='w-32 h-32 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full'>
            <div className='w-24 h-24 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full'></div>
          </div>
        </div>
      </div>
    </div>
  )
})
LoadingFallback.displayName = 'LoadingFallback'

export default LoadingFallback
