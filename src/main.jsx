import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './Context/AuthContextProvider.jsx'
import { ChatContextProvider } from './Context/ChatContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
