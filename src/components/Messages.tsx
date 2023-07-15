import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MessageDeleted from './MessageDeleted';
import PasswordForm from './PasswordForm';
import Utils from '../util/Utils';
import { Grid, Typography } from '@mui/material';
import { Textarea } from '@mui/joy';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import './Messages.css';

interface Message {
  destroyLiveAfterSeconds: number;
  body: string;
}

enum DecryptionStatus {
  Initial,
  Decrypting,
  Done,
}

function Messages() {
  const { id } = useParams();
  const [message, setMessage] = useState<Message>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [decipheringText, setDecipheringText] = useState<string | undefined>('');
  const [decryptionStatus, setDecryptionStatus] = useState<DecryptionStatus>(DecryptionStatus.Initial);
 

  const search = useLocation().search;
  const password = new URLSearchParams(search).get('pw');

  const loadMessage = function (_password: string) {
    axios
      .get<Message>(`http://localhost:8000/api/messages/${id}?pw=${_password}`)
      .then(response => {
        console.log(response.data);
        setMessage(response.data);
      })
      .catch(() => setMessage(undefined))
      .finally(() => {
        setLoaded(true);
      });
  }

  useEffect(() => {
    if (password) {
      // Only if password was in the URL
      loadMessage(password);
    }
  }, []);

  useEffect(() => {
    if (message?.destroyLiveAfterSeconds) {
          const timer = setTimeout(() => {
              setMessage(undefined);
              setDecipheringText(undefined);
          }, message?.destroyLiveAfterSeconds * 1000);
          return () => clearTimeout(timer)
      }
  }, [message?.destroyLiveAfterSeconds]);

  useEffect(() => {
    if (message?.body) {
      // Generate unique random indices
      const randomIndices = generateUniqueRandomIndices(message.body.length);

      // Simulate step-by-step message reveal
      const pace = 2000 / message.body.length;
      let currentIndex = 0;

      setDecipheringText('');
      setDecryptionStatus(DecryptionStatus.Decrypting);

      const interval = setInterval(() => {
        setDecipheringText(prevText => {
          const nextCharIndex = randomIndices[currentIndex];
          const nextChar = message.body[nextCharIndex];
          const newText = prevText?.substring(0, nextCharIndex) + nextChar + prevText?.substring(nextCharIndex + 1);
          currentIndex++;

          if (currentIndex === message.body.length) {
            clearInterval(interval);
            setDecryptionStatus(DecryptionStatus.Done);
          }

          return newText;
        });
      }, pace);

      // Clear interval after 2 seconds
      setTimeout(() => {
        clearInterval(interval);
        setDecipheringText(message.body);
        setDecryptionStatus(DecryptionStatus.Done);
      }, 2000);
    }
  }, [message?.body]);

  const generateUniqueRandomIndices = (length: number): number[] => {
    const indices = Array.from({ length }, (_, i) => i);
    const shuffledIndices = shuffleArray(indices);
    return shuffledIndices;
  };

  const shuffleArray = (array: any[]): any[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const onPasswordReceived = function (_password: string) {
    
    loadMessage(Utils.toUrlSafeBase64(_password));
  }


  return (
    <>
      <Grid item className="form-item">
        {!password && <PasswordForm onPasswordEntered={onPasswordReceived} />}
        {loaded && !message && <MessageDeleted />}
        {loaded && message && (
          <Grid item className="form-item">
            <div className="envelope">
              <div className="envelope-content">
                <Typography variant="h6" gutterBottom className="decrypting-header">
                  {decryptionStatus === DecryptionStatus.Done ? (
                    <>
                      <LockOpenIcon className="lock-icon" /> Decrypted Message
                    </>
                  ) : (
                    <>
                      <LockIcon className={`lock-icon ${decryptionStatus === DecryptionStatus.Decrypting ? 'bounce' : ''}`} /> Decrypting...
                    </>
                  )}
                </Typography>
                <Textarea
                  sx={{ mb: 1, mt: 1 }}
                  placeholder="Enter your self-destructing message here..."
                  readOnly
                  size="lg"
                  variant="outlined"
                  value={decipheringText}
                />
              </div>
            </div>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default Messages;
