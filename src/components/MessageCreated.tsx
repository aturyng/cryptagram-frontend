import { useLocation } from "react-router-dom";


function MessageCreated() {
  const location = useLocation();
  const toBase64 = (input: string) => {
    return encodeURIComponent(btoa(input));
  }
  return (
    <div>
        <h2>
            Message successfully created!
            <br />
            The link is: http://localhost:5173/messages/{location.state.messageId}?pw={toBase64(location.state.password)}
        </h2>
    </div>
  )
}

export default MessageCreated