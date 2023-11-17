import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Styles/input.css'
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import './Components/Languages/Language.js'

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
)
