import { useLocation } from "react-router-dom";
import Utils from "../util/Utils";



function MessageCreated() {
  const location = useLocation();
  return (
    <div>
        <h2>
            Message successfully created!
            <br />
            The link is: http://localhost:5173/messages/{location.state.messageId}?pw={Utils.toUrlSafeBase64(location.state.password)}
        </h2>
    </div>
  )
}

export default MessageCreated