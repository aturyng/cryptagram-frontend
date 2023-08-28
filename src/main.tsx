import ReactDOM from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import './i18n.tsx';
import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Suspense fallback="loading">
      <App />
    </Suspense>
  </BrowserRouter>,
)
