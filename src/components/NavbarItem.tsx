import { FC } from 'react'
import { Link } from 'react-router-dom'

interface NavbarItemProps {
  link: {
    label: string
    to: string
  }
}

const NavbarItem: FC<NavbarItemProps> = ({ link }) => {
  return (
    <li>
      <Link
        to={link.to}
        className='lg:text-lg transition
      -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5'
      >
        {link.label}
      </Link>
    </li>
  )
}

export default NavbarItem
