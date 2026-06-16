import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useLogout, useUser } from '@/hooks'

export default function NavMenu() {
  const logOut = useLogout()
  const profile = useUser()
  return (
    <Menu as='div' className='relative inline-block transition-all'>
      <MenuButton className='inline-flex w-full justify-center rounded-md text-sm font-semibold text-white'>
        <div className='flex items-center gap-4 rounded-lg hover:bg-white/5 cursor-pointer'>
          <span className='avatar bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold'>
            {profile?.username.charAt(0)}
          </span>
        </div>
      </MenuButton>

      <MenuItems
        transition
        className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-white/10 rounded-md bg-gray-800 outline-1  transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
      >
        <div className='py-1'>
          <MenuItem>
            <a
              href={`/user/${profile?._id}`}
              className='mx-1 block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white hover:outline-hidden'
            >
              Profile
            </a>
          </MenuItem>
        </div>
        <div className='py-1'>
          <MenuItem>
            <span
              className='mx-1 block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white hover:outline-hidden cursor-pointer'
              onClick={() => {
                logOut()
              }}
            >
              Sign Out
            </span>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}
