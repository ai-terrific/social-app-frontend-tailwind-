import { FC } from 'react'

interface NavbarItemProps {
  link: {
    label: string
    to: string
  }
}

const NavbarItem: FC<NavbarItemProps> = ({ link }) => {
  return (
    <li>
      <a
        href={link.to}
        className='lg:text-lg transition
      -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5'
      >
        {link.label}
      </a>
    </li>
  )
}

export default NavbarItem
