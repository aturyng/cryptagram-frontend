import ReactDOM from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>,
)
