
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Messages from './components/Messages'
import CreateMessage from './components/CreateMessage'
import MessageCreated from './components/MessageCreated'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import About from './components/About'


function App() {

  return (
    <>

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/messages" replace />}
        />
        <Route path="/messages" element={<ResponsiveAppBar />}>
          <Route index element={<CreateMessage />} />
          <Route path=":id" element={<Messages />} />
          <Route path="created" element={<MessageCreated />} />
          <Route path="about" element={<About />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
