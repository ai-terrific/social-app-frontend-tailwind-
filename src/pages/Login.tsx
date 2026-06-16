import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { loginUser } from '@/services'
import { dispatch, login } from '@/store'
import { EmailPassword } from '@/types'
import { handleError } from '@/utils'

const Login: FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<EmailPassword>({
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await loginUser(formData)
      if (response.token) dispatch(login(response))
      toast.success(response.message, { hideProgressBar: true })
      navigate('/')
    } catch (err) {
      handleError(err)
    }
  }

  return (
    <div className='flex min-h-full flex-col justify-center'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img alt='Your Company' src='/logo.png' className='mx-auto h-10 w-auto' />
        <h2 className='mt-10 text-center text-3xl/9 font-bold tracking-tight text-white'>Sign in</h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email' className='block text-sm/6 font-medium text-gray-100'>
              Email address
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                placeholder='Email'
                onChange={handleChange}
                required
                autoComplete='email'
                className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
              />
            </div>
          </div>

          <div>
            <label htmlFor='password' className='block text-sm/6 font-medium text-gray-100'>
              Password
            </label>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type='password'
                placeholder='Password'
                onChange={handleChange}
                required
                autoComplete='current-password'
                className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
            >
              Sign in
            </button>
          </div>
        </form>

        <p className='mt-10 text-center text-sm/6 text-gray-400'>
          Not registered?{' '}
          <a href='/register' className='font-semibold text-indigo-400 hover:text-indigo-300'>
            Create an account
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
