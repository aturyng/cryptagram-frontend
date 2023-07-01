import { Textarea } from '@mui/joy';
import './TextArea.css'




export default function TextArea() {
  return (
    <Textarea className="text-area"
        minRows={5}
        placeholder="Enter your self-destructing message here..."
        size="lg"
        variant="soft"
    />
  );
}
