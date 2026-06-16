import { FC } from 'react'
import { ReactTyped } from 'react-typed'

interface TypingProps {
  titles: string[]
}

const Typing: FC<TypingProps> = ({ titles }) => {
  return (
    <ReactTyped
      className='text-4xl font-bold text-white'
      showCursor={false}
      strings={titles}
      typeSpeed={40}
      backSpeed={60}
    />
  )
}

export default Typing
