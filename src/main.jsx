import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'

import { BrowserRouter } from 'react-router-dom'
import Routers from './routes'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store'
import { injectStore } from './services/apiServices'
import { PersistGate } from 'redux-persist/integration/react'
import LoadingBar from 'react-redux-loading-bar'

injectStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingBar />} persistor={persistor}>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
