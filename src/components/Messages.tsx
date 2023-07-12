import axios from 'axios';
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import MessageDeleted from './MessageDeleted';
import PasswordForm from './PasswordForm';
import Utils from '../util/Utils';
import { Grid } from '@mui/material'

interface Message {
    destroyLiveAfterSeconds: number,
    body: string,
};

function Messages() {
    const { id } = useParams();
    const [message, setMessage] = useState<Message>();
    const [loaded, setLoaded] = useState<Boolean>(false);

    const search = useLocation().search;
    const password = new URLSearchParams(search).get('pw');

    const loadMessage = function (_password: string) {
        axios.get<Message>(`http://localhost:8000/api/messages/${id}?pw=${_password}`)
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
        if (password) { // Only if password was in the URL
            loadMessage(password)
        }
    }, []);

    useEffect(() => {
        if (message?.destroyLiveAfterSeconds) {
            const timer = setTimeout(() => {
                setMessage(undefined);
            }, message?.destroyLiveAfterSeconds * 1000);
            return () => clearTimeout(timer)
        }
    }, [message?.destroyLiveAfterSeconds]);

    const onPasswordReceived = function (_password: string) {
        loadMessage(Utils.toUrlSafeBase64(_password))
    }
    return (
        <>
            <Grid item className='form-item'>
                {!password &&
                    <PasswordForm onPasswordEntered={onPasswordReceived} />
                }
                {loaded && !message &&
                    <MessageDeleted />
                }
                {loaded && message &&

                    <div>
                        <h2>Message: {message?.body}</h2>
                        <h3>Delete after {message?.destroyLiveAfterSeconds} seconds</h3>
                    </div>


                }
            </Grid>
        </>
    )
}

export default Messages