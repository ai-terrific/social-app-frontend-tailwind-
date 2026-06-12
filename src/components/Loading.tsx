import { memo } from 'react'

const Triangle = memo(() => (
  <svg width='120' height='107' viewBox='0 0 120 107' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      opacity='0.6'
      d='M70.3923 101C65.7735 109 54.2265 109 49.6077 101L1.9763 18.5C-2.6425 10.5 3.131 0.500003 12.3686 0.500004L107.631 0.500013C116.869 0.500013 122.643 10.5 118.024 18.5L70.3923 101Z'
      fill='#0DB1A0'
    />
  </svg>
))

Triangle.displayName = 'Triangle'

const Logo = memo(() => (
  <svg width='152' height='142' viewBox='0 0 152 142' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g>
      <path
        d='M86.3923 92C81.7735 100 70.2265 100 65.6077 92L30.1007 30.5C25.4818 22.5 31.2553 12.5 40.493 12.5L111.507 12.5C120.745 12.5 126.518 22.5 121.899 30.5L86.3923 92Z'
        fill='white'
      />
      <path
        d='M85.9593 91.75C81.5329 99.4167 70.4671 99.4167 66.0407 91.75L30.5337 30.25C26.1073 22.5833 31.6403 13 40.493 13L111.507 13C120.36 13 125.893 22.5833 121.466 30.25L85.9593 91.75Z'
        stroke='#0DB1A0'
      />
    </g>
    <path
      d='M86.7837 75.5967C86.7837 75.5967 84.3919 78.8976 77.9825 77.7624C71.573 76.6271 71.573 70.1455 71.573 70.1455V36.328L50.0037 36.0648C50.0037 36.0648 49.508 28.0009 60.0349 28.0003C70.5619 27.9996 100.992 28.0003 100.992 28.0003C100.992 28.0003 101.649 36.328 90.9254 36.328C80.202 36.328 73.6957 36.328 73.6957 36.328C73.6957 36.328 80.9043 40.051 80.9043 44.6206C80.9043 49.1902 80.9043 56.1827 80.9043 66.8955C80.9043 77.6083 86.7837 75.5967 86.7837 75.5967Z'
      fill='#0DB1A0'
    />
  </svg>
))

Logo.displayName = 'Triangle'

const TRIANGLE_COUNT = 3

const SkyLoading = () => {
  return (
    <div className='loading'>
      {Array.from({ length: TRIANGLE_COUNT }).map((_, index) => (
        <div key={`triangle-${index}`} className={`triangle triangle-${index + 1}`}>
          <Triangle />
        </div>
      ))}
    </div>
  )
}

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
