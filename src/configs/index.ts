// Provide minimal typings for `process.env` in browser builds to avoid
// "Cannot find name 'process'" TypeScript errors without adding @types/node.
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			REACT_APP_API_BASE_URL?: string
			REACT_APP_API_STORE_KEY?: string
			[key: string]: string | undefined
		}
	}
}

export const BASE_URL = (process?.env?.REACT_APP_API_BASE_URL as string) || 'http://localhost:8001'
export const STORE_KEY = (process?.env?.REACT_APP_API_STORE_KEY as string) || 'JQhizAKwK8hvvFBWxrfpdk1E'

export * from './endpoints'
export * from './navigation'
