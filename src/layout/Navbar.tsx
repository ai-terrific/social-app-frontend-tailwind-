import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Dialog, DialogPanel } from '@headlessui/react'

import NavbarItem from '@/components/NavbarItem'
import NavMenu from '@/components/NavMenu'

import { useIsLoggedIn } from '@/hooks/useIsLoggedIn'
import { useUser } from '@/hooks/useUser'
import { useLogout } from '@/hooks/useLogout'

const Links = [
  { to: '/explore', label: 'Explore' },
  { to: '/', label: 'Feed' },
  { to: '/create', label: 'Create Post' }
]

export default function Header() {
  const isLoggedIn = useIsLoggedIn()
  const profile = useUser()
  const logOut = useLogout()

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  return (
    <header className='sticky w-screen inset-x-0 top-0 z-50 backdrop-blur-sm bg-black/50'>
      <nav aria-label='Global' className='container mx-auto flex items-center justify-between p-6 lg:px-8'>
        <div className='flex lg:flex-1'>
          <a href='/' className='-m-1.5 p-1.5'>
            <img alt='Social App Logo' src='/logo.png' className='h-8 w-auto' />
          </a>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            onClick={() => setMobileMenuOpen(true)}
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200'
          >
            <span className='sr-only'>Open main menu</span>
            <Menu aria-hidden='true' className='size-6' />
          </button>
        </div>
        <ul className='hidden lg:flex gap-x-24 cursor-pointer'>
          {Links.map(link => {
            if (isLoggedIn || (!isLoggedIn && link.label !== 'Create Post')) {
              return <NavbarItem link={link} key={link.label} />
            }
          })}
        </ul>
        <div className='hidden lg:flex flex-1 lg:justify-end'>
          {isLoggedIn ? (
            <NavMenu />
          ) : (
            <a href='/login' className='text-lg font-semibold text-white px-3 py-1.5 rounded-lg hover:bg-white/5'>
              Log in <span aria-hidden='true'>&rarr;</span>
            </a>
          )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className='lg:hidden'>
        <div className='fixed inset-0 z-50' />
        <DialogPanel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10'>
          <div className='flex items-center justify-between'>
            <button
              type='button'
              onClick={() => setMobileMenuOpen(false)}
              className='-m-2.5 rounded-md p-2.5 text-gray-200'
            >
              <span className='sr-only'>Close menu</span>
              <X aria-hidden='true' className='size-6' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-white/10'>
              <ul className='space-y-2 py-6 list-none'>
                {Links.map(link => {
                  if (isLoggedIn || (!isLoggedIn && link.label !== 'Create Post')) {
                    return <NavbarItem link={link} key={link.label} />
                  }
                })}
              </ul>
              <div className='py-6'>
                {isLoggedIn && (
                  <a
                    href='/profile'
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5 cursor-pointer'
                  >
                    Profile
                  </a>
                )}
                {isLoggedIn ? (
                  <a
                    onClick={() => {
                      logOut()
                    }}
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5 cursor-pointer'
                  >
                    Log out
                  </a>
                ) : (
                  <a
                    href='/login'
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5'
                  >
                    Log in
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
