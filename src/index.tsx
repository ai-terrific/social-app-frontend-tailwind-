import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import { persister, store } from './store'

import 'simplebar-react/dist/simplebar.min.css'
import './styles/index.css'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement!)

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
)
