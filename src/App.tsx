
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Messages from './components/Messages'
import CreateMessage from './components/CreateMessage'
import MessageCreated from './components/MessageCreated'


function App() {

  return (
    <>
    <Routes>
        <Route
            path="/"
            element={<Navigate to="/messages" replace />}
        />
      <Route path="/messages" element={<CreateMessage />} />
      <Route path="/messages/:id" element={<Messages />} />
      <Route path="/messages/created" element={<MessageCreated />} />
    </Routes>
    </>
  )
}

export default App
